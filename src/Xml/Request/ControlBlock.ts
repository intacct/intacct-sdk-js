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
import RequestConfig from "../../RequestConfig";
import IaXmlWriter from "../IaXmlWriter";
import IXmlObject from "../IXmlObject";

export default class ControlBlock implements IXmlObject {

    private _senderId: string;
    get senderId(): string {
        return this._senderId;
    }
    set senderId(senderId: string) {
        if (senderId == null || senderId === "") {
            throw new Error("Sender ID is required and cannot be blank");
        }
        this._senderId = senderId;
    }

    private _password: string;
    get password(): string {
        return this._password;
    }
    set password(password: string) {
        if (password == null || password === "") {
            throw new Error("Sender Password is required and cannot be blank");
        }
        this._password = password;
    }

    private _controlId: string;
    get controlId(): string {
        return this._controlId;
    }
    set controlId(controlId: string) {
        if (controlId == null || controlId === "") {
            controlId = Date.now().toString();
        }
        if (controlId.length < 1 || controlId.length > 256) {
            throw new Error("Request control ID must be between 1 and 256 characters in length.");
        }
        this._controlId = controlId;
    }

    private _uniqueId: boolean;
    get uniqueId(): boolean {
        return this._uniqueId;
    }
    set uniqueId(uniqueId: boolean) {
        this._uniqueId = uniqueId;
    }

    private _dtdVersion: string;
    get dtdVersion(): string {
        return this._dtdVersion;
    }

    private _policyId: string;
    get policyId(): string {
        return this._policyId;
    }
    set policyId(policyId: string) {
        this._policyId = policyId;
    }

    private _includeWhitespace: boolean;
    get includeWhitespace(): boolean {
        return this._includeWhitespace;
    }
    set includeWhitespace(includeWhitespace: boolean) {
        this._includeWhitespace = includeWhitespace;
    }

    constructor(clientConfig: ClientConfig, requestConfig: RequestConfig) {
        this.senderId = clientConfig.senderId;
        this.password = clientConfig.senderPassword;
        this.controlId = requestConfig.controlId;
        this.uniqueId = requestConfig.uniqueId;
        this.policyId = requestConfig.policyId;
        this.includeWhitespace = false;
        this._dtdVersion = "3.0";
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("control");
        xml.writeElement("senderid", this.senderId);
        xml.writeElement("password", this.password);
        xml.writeElement("controlid", this.controlId);
        xml.writeElement("uniqueid", this.uniqueId === true ? "true" : "false");
        xml.writeElement("dtdversion", this.dtdVersion);
        if (this.policyId != null && this.policyId !== "") {
            xml.writeElement("policyid", this.policyId);
        }
        xml.writeElement("includewhitespace", this.includeWhitespace === true ? "true" : "false");
        xml.writeEndElement(); // control
    }
}
