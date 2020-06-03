/**
 * @module Intacct/SDK/Xml/Request
 */

/**
 * Copyright 2020 Sage Intacct, Inc.
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

export default class LoginAuthentication implements IAuthentication {

    private _companyId: string;

    private _entityId: string;

    private _userId: string;

    private _password: string;

    get companyId(): string {
        return this._companyId;
    }
    set companyId(companyId: string) {
        if (companyId == null || companyId === "") {
            throw new Error("Company ID is required and cannot be blank");
        }
        this._companyId = companyId;
    }

    get entityId(): string {
        return this._entityId;
    }
    set entityId(entityId: string) {
        this._entityId = entityId;
    }

    get userId(): string {
        return this._userId;
    }
    set userId(userId: string) {
        if (userId == null || userId === "") {
            throw new Error("User ID is required and cannot be blank");
        }
        this._userId = userId;
    }

    get password(): string {
        return this._password;
    }
    set password(password: string) {
        if (password == null || password === "") {
            throw new Error("User Password is required and cannot be blank");
        }
        this._password = password;
    }

    constructor(userId: string, companyId: string, userPassword: string, entityId?: string) {
        this.companyId = companyId;
        this.userId = userId;
        this.password = userPassword;
        this.entityId = entityId !== undefined ? entityId : null;
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("authentication");
        xml.writeStartElement("login");
        xml.writeElement("userid", this.userId);
        xml.writeElement("companyid", this.companyId);
        xml.writeElement("password", this.password);
        if (this.entityId != null) {
            xml.writeElement("locationid", this.entityId);
        }
        xml.writeEndElement(); // login
        xml.writeEndElement(); // authentication
    }
}
