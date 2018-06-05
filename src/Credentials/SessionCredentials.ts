/**
 * @module Intacct/SDK/Credentials
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

import ClientConfig from "../ClientConfig";
import Endpoint from "./Endpoint";
import ICredentials from "./ICredentials";
import SenderCredentials from "./SenderCredentials";

export default class SessionCredentials implements ICredentials {

    public sessionId: string;

    public endpoint: Endpoint;

    public senderCreds: SenderCredentials;

    constructor(config: ClientConfig, senderCreds: SenderCredentials) {
        if (config.sessionId == null || config.sessionId === "") {
            throw new Error("Required Session ID not supplied in config");
        }
        this.sessionId = config.sessionId;

        if (config.endpointUrl != null) {
            this.endpoint = new Endpoint(config);
        } else {
            this.endpoint = senderCreds.endpoint;
        }
        this.senderCreds = senderCreds;
    }
}
