/**
 * @module Intacct/SDK/Xml
 */

/**
 * Copyright 2018 Sage Intacct, Inc.
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

import {RequestResponse} from "request";
import {StatusCodeError} from "request-promise-native/errors";
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

    constructor(clientConfig: ClientConfig, requestConfig: RequestConfig) {
        const packageInfo = require("../../package.json");
        this.version = packageInfo.version;

        if (clientConfig.endpointUrl != null && clientConfig.endpointUrl !== "") {
            this.endpointUrl = clientConfig.endpointUrl;
        } else {
            const endpoint = new Endpoint(clientConfig);
            this.endpointUrl = endpoint.url;
        }
        this.clientConfig = clientConfig;

        this.requestConfig = requestConfig;
    }

    public async executeOnline(content: IFunction[]): Promise<OnlineResponse> {
        if (this.requestConfig.policyId != null && this.requestConfig.policyId !== "") {
            this.requestConfig.policyId = "";
        }

        const request = new RequestBlock(this.clientConfig, this.requestConfig, content);
        const response = await this.execute(request.writeXml());

        return new OnlineResponse(response.body);
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
        const response = await this.execute(request.writeXml());

        return new OfflineResponse(response.body);
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

    private async execute(xml: string): Promise<RequestResponse> {
        const httpClient = this.getHttpClient({
            url: this.endpointUrl,
            method: "POST",
            timeout: this.requestConfig.maxTimeout,
            simple: true,
            resolveWithFullResponse: true,
            body: xml,
            gzip: true,
            headers: {
                "Content-Type": "application/xml",
                "Accept-Encoding": "gzip",
                "User-Agent": "intacct-sdk-js-client/" + this.version,
            },
        });

        for (let attempt = 0; attempt <= this.requestConfig.maxRetries; attempt++) {
            if (attempt > 0) {
                // Delay this retry based on exponential delay
                await this.exponentialDelay(attempt);
            }
            try {
                return await httpClient.postAsync();
            } catch (error) {
                if (error instanceof StatusCodeError) {
                    if (error.statusCode >= 500 && error.statusCode <= 599) {
                        if (this.requestConfig.noRetryServerErrorCodes.indexOf(error.statusCode) !== -1) {
                            throw error; // Do not retry this server error status code
                        } else if (attempt < this.requestConfig.maxRetries) {
                            attempt++;
                        } else {
                            throw error;
                        }
                    } else {
                        throw error;
                    }
                } else {
                    throw error;
                }
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
