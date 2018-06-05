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

export default class ErrorMessage {

    private _errors: string[];
    get errors(): string[] {
        return this._errors;
    }
    set errors(errors: string[]) {
        this._errors = errors;
    }

    constructor(errorMessages: object) {
        const errorContents = [];
        if (errorMessages.hasOwnProperty("error")) {
            const errors = errorMessages["error"];
            if (Array.isArray(errors)) {
                for (const index in errors) {
                    if (errors.hasOwnProperty(index)) {
                        const errorObject = errors[index];
                        const pieces = this.combineErrorMessageElements(errorObject);
                        errorContents.push(pieces.join(" "));
                    }
                }
            } else if (errorMessages instanceof Object) {
                const pieces = this.combineErrorMessageElements(errors);
                errorContents.push(pieces.join(" "));
            }
        }
        this._errors = errorContents;
    }

    private combineErrorMessageElements(errorObject: object) {
        const pieces = [];
        for (const errorField in errorObject) {
            if (errorObject.hasOwnProperty(errorField)) {
                const value = errorObject[errorField];
                const piece = this.cleanse(value);
                pieces.push(piece);
            }
        }
        return pieces;
    }

    private cleanse(message: string): string {
        const noHtml = message.replace(new RegExp(/<[^>]+>|&nbsp;/g), "");
        return noHtml.replace(new RegExp("\s{2,}"), " ");
    }
}
