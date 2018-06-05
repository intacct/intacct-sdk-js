/**
 * @module Intacct/SDK/Functions
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

import * as uuid from "uuid/v4";
import IaXmlWriter from "../Xml/IaXmlWriter";
import IFunction from "./IFunction";

export default abstract class AbstractFunction implements IFunction {

    protected _controlId: string;

    get controlId(): string {
        return this._controlId;
    }
    set controlId(controlId: string) {
        if (controlId == null || controlId === "") {
            controlId = uuid();
        }
        if (controlId.length < 1 || controlId.length > 256) {
            throw new Error("Function control ID must be between 1 and 256 characters in length.");
        }
        this._controlId = controlId;
    }

    constructor(controlId?: string) {
        this.controlId = controlId;
    }

    public abstract writeXml(xml: IaXmlWriter): void;
}
