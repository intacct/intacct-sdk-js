/**
 * @module Intacct/SDK/Xml/Response
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

import IntacctException from "../../Exceptions/IntacctException";

export default class Authentication {

    private _status: string;
    get status(): string {
        return this._status;
    }

    private _userId: string;
    get userId(): string {
        return this._userId;
    }

    private _companyId: string;
    get companyId(): string {
        return this._companyId;
    }

    private _entityId: string;
    get entityId(): string {
        return this._entityId;
    }

    constructor(authentication: object) {
        if (!authentication.hasOwnProperty("status")) {
            throw new IntacctException("Authentication block is missing status element");
        }
        if (!authentication.hasOwnProperty("userid")) {
            throw new IntacctException("Authentication block is missing userid element");
        }
        if (!authentication.hasOwnProperty("companyid")) {
            throw new IntacctException("Authentication block is missing companyid element");
        }

        this._status = authentication["status"];
        this._userId = authentication["userid"];
        this._companyId = authentication["companyid"];
        this._entityId = authentication["locationid"];

        // TODO add getter/setter for elements: clientstatus, clientid, sessiontimestamp
    }
}
