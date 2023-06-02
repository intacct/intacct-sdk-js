/**
 * @module Intacct/SDK/Xml
 */

/**
 * Copyright 2022 Sage Intacct, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "LICENSE" file accompanying this file. This file is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import contentType = require("content-type");
import {FetchError} from "node-fetch";
import ClientConfig from "../ClientConfig";
import Endpoint from "../Credentials/Endpoint";
import SessionCredentials from "../Credentials/SessionCredentials";
import IFunction from "../Functions/IFunction";
import RequestConfig from "../RequestConfig";
import HttpClientHandler from "./HttpClientHandler";
import LoggingHandler from "./LoggingHandler";
import OfflineResponse from "./OfflineResponse";
import OnlineResponse from "./OnlineResponse";
import RequestBlock from "./RequestBlock";

export default class RequestHandler {

    public readonly version: string;

    public clientConfig: ClientConfig;

    public requestConfig: RequestConfig;

    public endpointUrl: string;
    public sageAppId: string;

    constructor(clientConfig: ClientConfig, requestConfig: RequestConfig) {
        const packageInfo = require("../../package.json");
        this.version = packageInfo.version;

        if (clientConfig.endpointUrl != null && clientConfig.endpointUrl !== "") {
            this.endpointUrl = clientConfig.endpointUrl;
        } else {
            const endpoint = new Endpoint(clientConfig);
            this.endpointUrl = endpoint.url;
        }
        this.sageAppId = clientConfig.sageAppId != null ? clientConfig.sageAppId : "";
        this.clientConfig = clientConfig;

        this.requestConfig = requestConfig;
    }

    public async executeOnline(content: IFunction[]): Promise<OnlineResponse> {
        if (this.requestConfig.policyId != null && this.requestConfig.policyId !== "") {
            this.requestConfig.policyId = "";
        }

        const request = new RequestBlock(this.clientConfig, this.requestConfig, content);

        return await this.execute(request.writeXml()).then((body) => {
            return new OnlineResponse(body);
        });
    }

    public async executeOffline(content: IFunction[]): Promise<OfflineResponse> {
        if (this.requestConfig.policyId == null || this.requestConfig.policyId === "") {
            throw new Error("Required Policy ID not supplied in config for offline request");
        }

        if (
            this.clientConfig.logger != null
            && (
                this.clientConfig.sessionId != null && this.clientConfig.sessionId !== ""
                || this.clientConfig.credentials instanceof SessionCredentials
            )
        ) {
            this.clientConfig.logger.warn("Offline execution sent to Intacct using Session-based credentials. "
                + "Use Login-based credentials instead to avoid session timeouts.");
        }

        const request = new RequestBlock(this.clientConfig, this.requestConfig, content);
        return await this.execute(request.writeXml()).then((body) => {
            return new OfflineResponse(body);
        });
    }

    private getHttpClient(options: object): HttpClientHandler {
        if (this.clientConfig.logger != null) {
            return new LoggingHandler(
                options,
                this.clientConfig.logger,
                this.clientConfig.logMessageFormatter,
                this.clientConfig.logLevel,
            );
        } else {
            return new HttpClientHandler(options);
        }
    }

    private async execute(xml: string): Promise<string> {
        const additionalHeaders =
            this.sageAppId != null && this.sageAppId !== ""
                ? {
                    "x-sage-app-id": this.sageAppId,
                    }
                : {};
        const httpClient = this.getHttpClient({
            url: this.endpointUrl,
            method: "POST",
            timeout: this.requestConfig.maxTimeout,
            simple: false,
            resolveWithFullResponse: true,
            body: xml,
            gzip: true,
            headers: {
                "Content-Type": "application/xml",
                "Accept-Encoding": "gzip",
                "User-Agent": "intacct-sdk-js-client/" + this.version,
                ...additionalHeaders,
            },
            size: 0,
        });

        for (let attempt = 0; attempt <= this.requestConfig.maxRetries; attempt++) {
            if (attempt > 0) {
                // Delay this retry based on exponential delay
                await this.exponentialDelay(attempt);
            }

            const result = await httpClient.postAsync();
            const response = result[0];
            const body = result[1];

            let ok = true;
            if (response.status >= 400 && response.status < 600) {
                ok = false;
            }
            if (ok === true) {
                return body;
            } else if (this.requestConfig.noRetryServerErrorCodes.indexOf(response.status) !== -1) {
                // Do not retry this explicitly set 500 level server error
                const error = {code: response.status};
                throw new FetchError(body, httpClient.options, error);
            } else if (response.status >= 500 && response.status <= 599) {
                // Retry 500 level server errors
                continue;
            } else {
                const contentTypeObj = contentType.parse(response.headers.get("content-type"));
                const mimeType = contentTypeObj.type;
                if (mimeType === "text/xml" || mimeType === "application/xml") {
                    return body;
                }
                const status = response.status;
                const resp: Record<string, unknown> = {status: response};
                throw new FetchError(body, httpClient.options, resp);
            }
        }
        throw new Error("Request retry count exceeded max retry count: " + this.requestConfig.maxRetries.toString());
    }

    private delay(ms: number): Promise<void> {
        return new Promise<void>((resolve) => setTimeout(resolve, ms));
    }

    private async exponentialDelay(retries: number) {
        const delay = Math.pow(2, retries - 1) * 1000;
        await this.delay(delay);
    }
}
