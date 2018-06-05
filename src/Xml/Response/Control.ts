/**
 * @module Intacct/SDK/Xml/Response
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

import IntacctException from "../../Exceptions/IntacctException";

export default class Control {

    private _status: string;
    get status(): string {
        return this._status;
    }

    private _senderId: string;
    get senderId(): string {
        return this._senderId;
    }

    private _controlId: string;
    get controlId(): string {
        return this._controlId;
    }

    private _uniqueId: string;
    get uniqueId(): string {
        return this._uniqueId;
    }

    private _dtdVersion: string;
    get dtdVersion(): string {
        return this._dtdVersion;
    }

    constructor(control: object) {
        if (!control.hasOwnProperty("status")) {
            throw new IntacctException("Control block is missing status element");
        }
        if (!control.hasOwnProperty("senderid")) {
            throw new IntacctException("Control block is missing senderid element");
        }
        if (!control.hasOwnProperty("controlid")) {
            throw new IntacctException("Control block is missing controlid element");
        }
        if (!control.hasOwnProperty("uniqueid")) {
            throw new IntacctException("Control block is missing uniqueid element");
        }
        if (!control.hasOwnProperty("dtdversion")) {
            throw new IntacctException("Control block is missing dtdversion element");
        }

        this._status = control["status"];
        this._senderId = control["senderid"];
        this._controlId = control["controlid"];
        this._uniqueId = control["uniqueid"];
        this._dtdVersion = control["dtdversion"];
    }
}
