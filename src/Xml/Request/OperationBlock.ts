/**
 * @module Intacct/SDK/Xml/Request
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

import ClientConfig from "../../ClientConfig";
import LoginCredentials from "../../Credentials/LoginCredentials";
import SessionCredentials from "../../Credentials/SessionCredentials";
import IFunction from "../../Functions/IFunction";
import RequestConfig from "../../RequestConfig";
import IaXmlWriter from "../IaXmlWriter";
import IXmlObject from "../IXmlObject";
import IAuthentication from "./IAuthentication";
import LoginAuthentication from "./LoginAuthentication";
import SessionAuthentication from "./SessionAuthentication";

export default class OperationBlock implements IXmlObject {

    public transaction: boolean;

    public authentication: IAuthentication;

    public content: IFunction[];

    constructor(clientConfig: ClientConfig, requestConfig: RequestConfig, content: IFunction[]) {
        this.transaction = requestConfig.transaction;

        const credentials = clientConfig.credentials;
        if (credentials != null && credentials instanceof SessionCredentials) {
            this.authentication = new SessionAuthentication(credentials.sessionId);
        } else if (credentials != null && credentials instanceof LoginCredentials) {
            this.authentication = new LoginAuthentication(
                credentials.userId, credentials.companyId, credentials.password);
        } else if (clientConfig.sessionId != null) {
            this.authentication = new SessionAuthentication(clientConfig.sessionId);
        } else if (
            clientConfig.companyId != null
            && clientConfig.userId != null
            && clientConfig.userPassword != null
        ) {
            this.authentication = new LoginAuthentication(
                clientConfig.userId, clientConfig.companyId, clientConfig.userPassword);
        } else {
            throw new Error("Authentication credentials [Company ID, User ID, and User Password] or [Session ID] " +
                "are required and cannot be blank.");
        }

        this.content = content;
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("operation");
        xml.writeAttribute("transaction", this.transaction === true ? "true" : "false");

        this.authentication.writeXml(xml);

        xml.writeStartElement("content");
        for (const apiFunction of this.content) {
            apiFunction.writeXml(xml);
        }
        xml.writeEndElement(); // content

        xml.writeEndElement(); // operation
    }
}
