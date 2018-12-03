/**
 * @module Intacct/SDK
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

import ClientConfig from "./ClientConfig";
import SenderCredentials from "./Credentials/SenderCredentials";
import SessionCredentials from "./Credentials/SessionCredentials";
import ApiSessionCreate from "./Functions/ApiSessionCreate";
import OnlineClient from "./OnlineClient";
import RequestConfig from "./RequestConfig";

export default class SessionProvider {

    /**
     * @param {ClientConfig} config
     * @return {Promise<ClientConfig>}
     */
    public static async factory(config?: ClientConfig): Promise<ClientConfig> {
        if (!config) {
            config = new ClientConfig();
        }

        const requestConfig = new RequestConfig();
        requestConfig.controlId = "sessionProvider";
        requestConfig.noRetryServerErrorCodes = []; // Retry all 500 level errors

        const apiFunction = new ApiSessionCreate();

        if (config.sessionId != null && config.entityId != null) {
            apiFunction.entityId = config.entityId;
        }

        const client = new OnlineClient(config);
        const response = await client.execute(apiFunction, requestConfig);

        const authentication = response.authentication;
        const result = response.results[0];

        result.ensureStatusSuccess(); // Throw any result errors

        const data = result.data;
        const api = data[0];

        config.sessionId = api["sessionid"].toString();
        config.endpointUrl = api["endpoint"].toString();
        config.entityId = api["locationid"].toString();

        config.companyId = authentication.companyId;
        config.userId = authentication.userId;

        config.credentials = new SessionCredentials(config, new SenderCredentials(config));

        return config;
    }
}
