/**
 * @module Intacct/SDK
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

import ClientConfig from "./ClientConfig";
import LoginCredentials from "./Credentials/LoginCredentials";
import SenderCredentials from "./Credentials/SenderCredentials";
import SessionCredentials from "./Credentials/SessionCredentials";
import IFunction from "./Functions/IFunction";
import RequestConfig from "./RequestConfig";
import OfflineResponse from "./Xml/OfflineResponse";
import OnlineResponse from "./Xml/OnlineResponse";
import RequestHandler from "./Xml/RequestHandler";

export default abstract class AbstractClient {

    /**
     * @type {string}
     */
    protected static readonly PROFILE_ENV_NAME = "INTACCT_PROFILE";

    protected static readonly SAGE_APP_ID_ENV_NAME = "INTACCT_SAGE_APP_ID";

    /**
     * @return ClientConfig
     */
    public config: ClientConfig;

    /**
     * @param {ClientConfig} config
     */
    constructor(config?: ClientConfig) {
        if (!config) {
            config = new ClientConfig();
        }

        if (config.profileName == null) {
            config.profileName = process.env[AbstractClient.PROFILE_ENV_NAME];
        }

        if (config.sageAppId == null) {
            config.sageAppId = process.env[AbstractClient.SAGE_APP_ID_ENV_NAME];
        }

        if (
            config.credentials instanceof SessionCredentials
            || config.credentials instanceof LoginCredentials
        ) {
            // Do not try and load credentials if they are already set in config
        } else if (config.sessionId != null) {
            // Load the session credentials
            config.credentials = new SessionCredentials(config, new SenderCredentials(config));
        } else {
            // Load the login credentials
            config.credentials = new LoginCredentials(config, new SenderCredentials(config));
        }
        this.config = config;
    }

    /**
     * @param {IFunction[]} functions
     * @param {RequestConfig} requestConfig
     * @returns {Promise<OnlineResponse>}
     */
    protected async executeOnlineRequest(
        functions: IFunction[], requestConfig?: RequestConfig): Promise<OnlineResponse> {
        if (!requestConfig) {
            requestConfig = new RequestConfig();
        }

        const requestHandler = new RequestHandler(this.config, requestConfig);

        return await requestHandler.executeOnline(functions);
    }

    /**
     * @param {IFunction[]} functions
     * @param {RequestConfig} requestConfig
     * @returns {Promise<OfflineResponse>}
     */
    protected async executeOfflineRequest(
        functions: IFunction[], requestConfig?: RequestConfig): Promise<OfflineResponse> {
        if (!requestConfig) {
            requestConfig = new RequestConfig();
        }

        const requestHandler = new RequestHandler(this.config, requestConfig);

        return await requestHandler.executeOffline(functions);
    }
}
