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

    /**
     * @type {ISelect[]}
     */
    private readonly selects: ISelect[];

    /**
     * @type {SelectFunctionFactory}
     */
    private factory: SelectFunctionFactory;

    constructor() {
        this.selects = [] as ISelect[];
        this.factory = new SelectFunctionFactory();
    }

    /**
     *
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public field(fieldName: string): SelectBuilder {
        const currentSelectField = new Field(fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     *
     * @param {string[]} fieldNames
     *
     * @return SelectBuilder
     */
    public fields(fieldNames: string[]): SelectBuilder {
        if (fieldNames == null || fieldNames.length < 1) {
            throw new Error("Empty list not allowed for fields.  Provide at least 1 field name in list.");
        }
        for (const fieldName of fieldNames) {
            this.field(fieldName);
        }

        return this;
    }

    /**
     *
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public avg(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.AVERAGE, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     *
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public count(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.COUNT, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     *
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public min(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.MINIMUM, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     *
     * @param {string} fieldName
     *
     * @return SelectBuilder
     */
    public max(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.MAXIMUM, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     *
     * @param {string} fieldName
     *
     * SelectBuilder
     */
    public sum(fieldName: string): SelectBuilder {
        const currentSelectField = this.factory.create(AbstractSelectFunction.SUM, fieldName);
        this.selects.push(currentSelectField);

        return this;
    }

    /**
     * @return ISelect[]
     */
    public getFields(): ISelect[] {
        return this.selects;
    }
}
