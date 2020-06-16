/**
 * @module Intacct/SDK/Functions/Common/NewQuery/QuerySelect
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

import AbstractSelectFunction from "./AbstractSelectFunction";
import Average from "./Average";
import Count from "./Count";
import Maximum from "./Maximum";
import Minimum from "./Minimum";
import Sum from "./Sum";

export default class SelectFunctionFactory {

    /**
     * @type {AbstractSelectFunction}
     */
    private newFunction: AbstractSelectFunction;

    /**
     * Returns an AbstractSelectFunction for given functionName
     *
     * @param functionName
     * @param fieldName
     *
     * @return AbstractSelectFunction
     * @throws Error
     */
    public create(functionName: string, fieldName: string): AbstractSelectFunction {
        if (fieldName === null || fieldName === "") {
            throw new Error("Field name for " + functionName + " cannot be empty or null.  " +
                "Provide a field name for the builder.");
        }

        switch (functionName) {
            case AbstractSelectFunction.AVERAGE:
                this.newFunction = new Average(fieldName);
                break;
            case AbstractSelectFunction.COUNT:
                this.newFunction = new Count(fieldName);
                break;
            case AbstractSelectFunction.MINIMUM:
                this.newFunction = new Minimum(fieldName);
                break;
            case AbstractSelectFunction.MAXIMUM:
                this.newFunction = new Maximum(fieldName);
                break;
            case AbstractSelectFunction.SUM:
                this.newFunction = new Sum(fieldName);
                break;
            default:
                throw new Error(functionName + " function doesn't exist.");
        }

        return this.newFunction;
    }
}
