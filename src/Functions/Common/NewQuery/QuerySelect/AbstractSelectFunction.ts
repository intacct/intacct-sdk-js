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

import IaXmlWriter from "../../../../Xml/IaXmlWriter";
import ISelect from "./ISelect";

export default abstract class AbstractSelectFunction implements ISelect {

    public static readonly AVERAGE = "avg";

    public static readonly MINIMUM = "min";

    public static readonly MAXIMUM = "max";

    public static readonly COUNT = "count";

    public static readonly SUM = "sum";

    /**
     * @type {string}
     */
    public fieldName: string;

    /**
     *
     * @param {string} fieldName
     */
    constructor(fieldName?: string) {
        if (fieldName !== null) {
            this.fieldName = fieldName;
        }
    }

    /**
     * Returns aggregate function name
     *
     * @return {string}
     */
    public abstract getFunctionName(): string;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeElement(this.getFunctionName(), this.fieldName, false);
    }
}
