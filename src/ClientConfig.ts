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

import {Logger} from "winston";
import ICredentials from "./Credentials/ICredentials";
import MessageFormatter from "./Logging/MessageFormatter";

export default class ClientConfig {

    public profileFile: string;

    public profileName: string;

    public endpointUrl: string;

    public allowNonIntacctEndpointUrl: boolean;

    public senderId: string;

    public senderPassword: string;

    public sessionId: string;

    public sessionTimestamp: string;

    public sessionTimeout: string;

    public companyId: string;

    public entityId: string;

    public userId: string;

    public userPassword: string;

    public credentials: ICredentials;

    public logger: Logger;

    public logLevel: string;

    public logMessageFormatter: MessageFormatter;

    public sageAppId: string;

    constructor() {
        this.logLevel = "debug";
        this.logMessageFormatter = new MessageFormatter();
    }
}
