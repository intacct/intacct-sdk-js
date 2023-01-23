/**
 * @module Intacct/SDK/Credentials
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

import ClientConfig from "../ClientConfig";
import Endpoint from "./Endpoint";
import ProfileCredentialProvider from "./ProfileCredentialProvider";

export default class SenderCredentials {

    public static readonly SENDER_PROFILE_ENV_NAME = "INTACCT_SENDER_PROFILE";

    public static readonly SENDER_ID_ENV_NAME = "INTACCT_SENDER_ID";

    public static readonly SENDER_PASSWORD_ENV_NAME = "INTACCT_SENDER_PASSWORD";

    public static readonly DEFAULT_SENDER_PROFILE = "default";

    public senderId: string;

    public password: string;

    public endpoint: Endpoint;

    constructor(config: ClientConfig) {
        let envProfileName = process.env[SenderCredentials.SENDER_PROFILE_ENV_NAME];
        if (envProfileName == null) {
            envProfileName = SenderCredentials.DEFAULT_SENDER_PROFILE;
        }
        if (config.profileName == null) {
            config.profileName = envProfileName;
        }
        if (config.senderId == null) {
            config.senderId = process.env[SenderCredentials.SENDER_ID_ENV_NAME];
        }
        if (config.senderPassword == null) {
            config.senderPassword = process.env[SenderCredentials.SENDER_PASSWORD_ENV_NAME];
        }
        if (
            config.senderId == null
            && config.senderPassword == null
            && config.profileName != null
        ) {
            const profile = ProfileCredentialProvider.getSenderCredentials(config);

            if (profile.senderId != null) {
                config.senderId = profile.senderId;
            }
            if (profile.senderPassword != null) {
                config.senderPassword = profile.senderPassword;
            }
            if (config.endpointUrl == null) {
                // Only set the endpoint URL if it was never passed in to begin with
                config.endpointUrl = profile.endpointUrl;
            }
        }

        if (config.senderId == null) {
            throw new Error('Required Sender ID not supplied in config or env variable "' +
                SenderCredentials.SENDER_ID_ENV_NAME + '"');
        }
        if (config.senderPassword == null) {
            throw new Error('Required Sender Password not supplied in config or env variable "' +
                SenderCredentials.SENDER_PASSWORD_ENV_NAME + '"');
        }

        this.senderId = config.senderId;
        this.password = config.senderPassword;
        this.endpoint = new Endpoint(config);
    }
}
