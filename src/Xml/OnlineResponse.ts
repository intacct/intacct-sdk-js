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

import {isArray, isNullOrUndefined} from "util";
import IntacctException from "../Exceptions/IntacctException";
import ResponseException from "../Exceptions/ResponseException";
import AbstractResponse from "./AbstractResponse";
import Authentication from "./Response/Authentication";
import ErrorMessage from "./Response/ErrorMessage";
import Result from "./Response/Result";

export default class OnlineResponse extends AbstractResponse {

    private _authentication: Authentication;
    get authentication(): Authentication {
        return this._authentication;
    }
    private _results: Result[];
    get results(): Result[] {
        return this._results;
    }
    constructor(body: string) {
        super(body);

        this._results = [];
        if (!isNullOrUndefined(this.xml) && !this.xml["response"].hasOwnProperty("operation")) {
            throw new IntacctException("Response block is missing operation block");
        }

        if (!this.xml["response"]["operation"].hasOwnProperty("authentication")) {
            throw new IntacctException("Authentication block is missing from operation element");
        }
        this._authentication = new Authentication(this._xml["response"]["operation"]["authentication"]);
        if (this._authentication.status !== "success") {
            const errorMessage = new ErrorMessage(this._xml["response"]["operation"]["errormessage"]);

            throw new ResponseException("Response authentication status failure", errorMessage.errors);
        }
        if (!this.xml["response"]["operation"].hasOwnProperty("result")) {
            throw new IntacctException("Result block is missing from operation element");
        }

        if (this.xml["response"]["operation"].hasOwnProperty("result")) {
            if (isArray(this.xml["response"]["operation"]["result"])) {
                for (const index in this.xml["response"]["operation"]["result"]) {
                    if (this.xml["response"]["operation"]["result"].hasOwnProperty(index)) {
                        this._results.push(new Result(this.xml["response"]["operation"]["result"][index]));
                    }
                }
            } else {
                this._results.push(new Result(this.xml["response"]["operation"]["result"]));
            }
        }
    }
    public getResult(key = 0): Result {
        return this._results[key];
    }
}
