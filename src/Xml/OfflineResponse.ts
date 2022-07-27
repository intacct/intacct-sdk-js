/**
 * @module Intacct/SDK/Xml
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

import IntacctException from "../Exceptions/IntacctException";
import AbstractResponse from "./AbstractResponse";

export default class OfflineResponse extends AbstractResponse {

    private _status: string;
    get status(): string {
        return this._status;
    }

    constructor(body: string) {
        super(body);

        if (!this.xml["response"].hasOwnProperty("acknowledgement")) {
            throw new IntacctException("Response block is missing acknowledgement block");
        }
        if (!this.xml["response"]["acknowledgement"].hasOwnProperty("status")) {
            throw new IntacctException("Acknowledgement block is missing status element");
        }
        this._status = this.xml["response"]["acknowledgement"]["status"];
    }
}
