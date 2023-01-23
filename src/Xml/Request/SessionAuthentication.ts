/**
 * @module Intacct/SDK/Xml/Request
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

import IaXmlWriter from "../IaXmlWriter";
import IAuthentication from "./IAuthentication";

export default class SessionAuthentication implements IAuthentication {

    private _sessionId: string;

    get sessionId(): string {
        return this._sessionId;
    }
    set sessionId(sessionId: string) {
        if (sessionId == null || sessionId === "") {
            throw new Error("Session ID is required and cannot be blank");
        }
        this._sessionId = sessionId;
    }

    constructor(sessionId: string) {
        this.sessionId = sessionId;
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("authentication");
        xml.writeElement("sessionid", this.sessionId);
        xml.writeEndElement(); // authentication
    }
}
