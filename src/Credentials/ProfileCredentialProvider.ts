/**
 * @module Intacct/SDK/Credentials
 */

/**
 * Copyright 2019 Sage Intacct, Inc.
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

import * as fs from "fs";
import * as ini from "ini";
import ClientConfig from "../ClientConfig";

export default class ProfileCredentialProvider {

    public static readonly DEFAULT_PROFILE_FILE = "/.intacct/credentials.ini";

    public static readonly DEFAULT_PROFILE_NAME = "default";

    public static getLoginCredentials(config: ClientConfig): ClientConfig {
        const creds = new ClientConfig();
        const data = ProfileCredentialProvider.getIniProfileData(config);

        if (data["company_id"]) {
            creds.companyId = data["company_id"];
        }
        if (data["entity_id"]) {
            creds.entityId = data["entity_id"];
        }
        if (data["user_id"]) {
            creds.userId = data["user_id"];
        }
        if (data["user_password"]) {
            creds.userPassword = data["user_password"];
        }

        return creds;
    }

    public static getSenderCredentials(config: ClientConfig): ClientConfig {
        const creds = new ClientConfig();
        const data = ProfileCredentialProvider.getIniProfileData(config);

        if (data["sender_id"]) {
            creds.senderId = data["sender_id"];
        }
        if (data["sender_password"]) {
            creds.senderPassword = data["sender_password"];
        }
        if (data["endpoint_url"]) {
            creds.endpointUrl = data["endpoint_url"];
        }

        return creds;
    }

    public static getHomeDirProfile(): string {
        let profile = "";
        const homeDir = process.env["HOME"];

        if (homeDir) {
            // Linux/Unix
            profile = homeDir + ProfileCredentialProvider.DEFAULT_PROFILE_FILE;
        } else {
            // Windows
            const homeDrive = process.env["HOMEDRIVE"];
            const homePath = process.env["HOMEPATH"];
            if (homeDrive && homePath) {
                profile = homeDrive + homePath + ProfileCredentialProvider.DEFAULT_PROFILE_FILE;
            }
        }

        return profile;
    }

    private static getIniProfileData(config: ClientConfig) {
        if (config.profileName == null) {
            config.profileName = ProfileCredentialProvider.DEFAULT_PROFILE_NAME;
        }
        if (config.profileFile == null) {
            config.profileFile = ProfileCredentialProvider.getHomeDirProfile();
        }

        const data = ini.parse(fs.readFileSync(config.profileFile).toString());
        if (!data[config.profileName]) {
            throw new Error("Profile Name \"" + config.profileName + "\" not found in credentials file");
        }

        return data[config.profileName];
    }
}
