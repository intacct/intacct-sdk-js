/**
 * @module Intacct/SDK/Xml
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

import * as xml2js from "xml2js";
import IntacctException from "../Exceptions/IntacctException";
import ResponseException from "../Exceptions/ResponseException";
import Control from "./Response/Control";
import ErrorMessage from "./Response/ErrorMessage";

export default abstract class AbstractResponse {

    protected _xml: object;
    get xml(): object {
        return this._xml;
    }

    private _control: Control;
    get control(): Control {
        return this._control;
    }

    constructor(body: string) {
        const options = {
            explicitArray: false,
        };
        xml2js.parseString(body, options, (err, xmlObject) => {
            if (err) {
                throw err;
            }
            this._xml = xmlObject;

            if (!this.xml.hasOwnProperty("response")) {
                throw new IntacctException("Response XML is missing root response element");
            }

            if (!this.xml["response"].hasOwnProperty("control")) {
                throw new IntacctException("Response block is missing control element");
            }
            this._control = new Control(this.xml["response"]["control"]);

            if (this.control.status !== "success") {
                let errors = [];
                if (this.xml["response"].hasOwnProperty("errormessage")) {
                    const errorMessage = new ErrorMessage(this.xml["response"]["errormessage"]);
                    errors = errorMessage.errors;
                }

                throw new ResponseException("Response control status failure", errors);
            }
        });
    }
}
