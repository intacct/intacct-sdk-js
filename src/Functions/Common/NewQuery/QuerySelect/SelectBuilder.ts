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
import Field from "./Field";
import ISelect from "./ISelect";
import SelectFunctionFactory from "./SelectFunctionFactory";

export default class SelectBuilder {

    public selects: ISelect[];

    private factory: SelectFunctionFactory;

    constructor() {
        this.selects = [] as ISelect[];
        this.factory = new SelectFunctionFactory();
    }

    /**
     * Add Field for given fieldName to list for select
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public addField(fieldName: string): SelectBuilder {
        const currentSelectField = new Field(fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     * Add Fields for given list of fieldNames to list for select
     * @param {string[]} fieldNames
     *
     * @return SelectBuilder
     */
    public addFields(fieldNames: string[]): SelectBuilder {
        if (fieldNames == null || fieldNames.length < 1) {
            throw new Error("Empty list not allowed for fields.  Provide at least 1 field name in list.");
        }
        for (const fieldName of fieldNames) {
            this.addField(fieldName);
        }

        return this;
    }

    /**
     * Add Average for given fieldName to list for select
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public addAverage(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.AVERAGE, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     * Add Count for given fieldName to list for select
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public addCount(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.COUNT, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     * Add Minimum for given fieldName to list for select
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public addMinimum(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.MINIMUM, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     * Add Maximum for given fieldName to list for select
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public addMaximum(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.MAXIMUM, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     * Add Sum for given fieldName to list for select
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public addSum(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.SUM, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }
}
