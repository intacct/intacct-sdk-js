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
import ICredentials from "./ICredentials";
import ProfileCredentialProvider from "./ProfileCredentialProvider";
import SenderCredentials from "./SenderCredentials";

export default class LoginCredentials implements ICredentials {

    public static readonly COMPANY_PROFILE_ENV_NAME = "INTACCT_COMPANY_PROFILE";

    public static readonly COMPANY_ID_ENV_NAME = "INTACCT_COMPANY_ID";

    public static readonly ENTITY_ID_ENV_NAME = "INTACCT_ENTITY_ID";

    public static readonly USER_ID_ENV_NAME = "INTACCT_USER_ID";

    public static readonly USER_PASSWORD_ENV_NAME = "INTACCT_USER_PASSWORD";

    public static readonly DEFAULT_COMPANY_PROFILE = "default";

    public companyId: string;

    public entityId: string;

    public userId: string;

    public password: string;

    public senderCreds: SenderCredentials;

    get endpoint(): Endpoint {
        return this.senderCreds.endpoint;
    }

    constructor(config: ClientConfig, senderCreds: SenderCredentials) {
        let envProfileName = process.env[LoginCredentials.COMPANY_PROFILE_ENV_NAME];
        if (envProfileName == null) {
            envProfileName = LoginCredentials.DEFAULT_COMPANY_PROFILE;
        }
        if (config.profileName == null) {
            config.profileName = envProfileName;
        }
        if (config.companyId == null) {
            config.companyId = process.env[LoginCredentials.COMPANY_ID_ENV_NAME];
        }
        if (config.entityId == null) {
            config.entityId = process.env[LoginCredentials.ENTITY_ID_ENV_NAME];
        }
        if (config.userId == null) {
            config.userId = process.env[LoginCredentials.USER_ID_ENV_NAME];
        }
        if (config.userPassword == null) {
            config.userPassword = process.env[LoginCredentials.USER_PASSWORD_ENV_NAME];
        }
        if (
            config.companyId == null
            && config.userId == null
            && config.userPassword == null
            && config.profileName != null
        ) {
            const profile = ProfileCredentialProvider.getLoginCredentials(config);

            if (profile.companyId != null) {
                config.companyId = profile.companyId;
            }
            if (profile.entityId != null) {
                config.entityId = profile.entityId;
            }
            if (profile.userId != null) {
                config.userId = profile.userId;
            }
            if (profile.userPassword != null) {
                config.userPassword = profile.userPassword;
            }
        }

        if (config.companyId == null) {
            throw new Error("Required Company ID not supplied in config or env variable \"" +
                LoginCredentials.COMPANY_ID_ENV_NAME + "\"");
        }
        // Entity ID is not required, no Error
        if (config.userId == null) {
            throw new Error("Required User ID not supplied in config or env variable \"" +
                LoginCredentials.USER_ID_ENV_NAME + "\"");
        }
        if (config.userPassword == null) {
            throw new Error("Required User Password not supplied in config or env variable \"" +
                LoginCredentials.USER_PASSWORD_ENV_NAME + "\"");
        }

        this.companyId = config.companyId;
        this.entityId = config.entityId;
        this.userId = config.userId;
        this.password = config.userPassword;
        this.senderCreds = senderCreds;
    }
}
