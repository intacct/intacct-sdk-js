/**
 * @module Intacct/SDK/Functions/Common/NewQuery/QueryFilter
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

import {isArray} from "util";
import IaXmlWriter from "../../../../Xml/IaXmlWriter";
import IFilter from "./IFilter";

export default class Filter implements IFilter {

    public static readonly EQUAL_TO = "equalto";

    public static readonly NOT_EQUAL_TO = "notequalto";

    public static readonly LESS_THAN = "lessthan";

    public static readonly LESS_THAN_OR_EQUAL_TO = "lessthanorequalto";

    public static readonly GREATER_THAN = "greaterthan";

    public static readonly GREATER_THAN_OR_EQUAL_TO = "greaterthanorequalto";

    public static readonly BETWEEN = "between";

    public static readonly IN = "in";

    public static readonly NOT_IN = "notin";

    public static readonly LIKE = "like";

    public static readonly NOT_LIKE = "notlike";

    public static readonly IS_NULL = "isnull";

    public static readonly IS_NOT_NULL = "isnotnull";

    private readonly fieldName: string;

    private value: string|string[];

    private operation: string;

    constructor(fieldName: string) {
        if (!fieldName) {
            throw new Error("fieldName is required for Filter.");
        }
        this.fieldName = fieldName;
        this.value = null;
        this.operation = null;
    }

    /**
     * Sets given value and operation to equal to for this filter
     * @param value
     * @return IFilter
     */
    public equalTo(value: string): IFilter {
        if (value == null) {
            throw new Error("null not allowed. Provide string value for equalTo function.");
        }

        this.value = value;
        this.operation = Filter.EQUAL_TO;

        return this;
    }

    /**
     * Sets given value and operation to not equal to for this filter
     * @param value
     * @return IFilter
     */
    public notEqualTo(value: string): IFilter {
        if (value == null) {
            throw new Error("null not allowed. Provide string value for notEqualTo function.");
        }

        this.value = value;
        this.operation = Filter.NOT_EQUAL_TO;

        return this;
    }

    /**
     * Sets given value and operation to less than for this filter
     * @param value
     * @return IFilter
     */
    public lessThan(value: string): IFilter {
        if (value == null) {
            throw new Error("null not allowed. Provide string value for lessThan function.");
        }

        this.value = value;
        this.operation = Filter.LESS_THAN;

        return this;
    }

    /**
     * Sets given value and operation to less than or equal to for this filter
     * @param value
     * @return IFilter
     */
    public lessThanOrEqualTo(value: string): IFilter {
        if (value == null) {
            throw new Error("null not allowed. Provide string value for lessThanOrEqualTo function.");
        }

        this.value = value;
        this.operation = Filter.LESS_THAN_OR_EQUAL_TO;

        return this;
    }

    /**
     * Sets given value and operation to greater than for this filter
     * @param value
     * @return IFilter
     */
    public greaterThan(value: string): IFilter {
        if (value == null) {
            throw new Error("null not allowed. Provide string value for greaterThan function.");
        }

        this.value = value;
        this.operation = Filter.GREATER_THAN;

        return this;
    }

    /**
     * Sets given value and operation to greater than or equal to for this filter
     * @param value
     * @return IFilter
     */
    public greaterThanOrEqualTo(value: string): IFilter {
        if (value == null) {
            // tslint:disable-next-line:max-line-length
            throw new Error("null not allowed. Provide string value for greaterThanOrEqualTo function.");
        }

        this.value = value;
        this.operation = Filter.GREATER_THAN_OR_EQUAL_TO;

        return this;
    }

    /**
     * Sets given value and operation to between for this filter.  Only 2 values allowed.
     * @param min
     * @param max
     * @return IFilter
     */
    public between(min: string, max: string): IFilter {
        if (min == null || max == null) {
            throw new Error("Two strings expected for between filter");
        }

        this.value = [min, max];
        this.operation = Filter.BETWEEN;

        return this;
    }

    /**
     * Sets given values and operation to in for this filter.
     * @param values
     * @return IFilter
     */
    public in(values: string[]): IFilter {
        if (values == null || values.length === 0) {
            throw new Error("At least 1 string in array expected for in for filter");
        }

        this.value = values;
        this.operation = Filter.IN;

        return this;
    }

    /**
     * Sets given values and operation to not in for this filter.
     * @param values
     * @return IFilter
     */
    public notIn(values: string[]): IFilter {
        if (values == null || values.length === 0) {
            throw new Error("At least 1 string in array expected for notIn for filter");
        }

        this.value = values;
        this.operation = Filter.NOT_IN;

        return this;
    }

    /**
     * Sets given values and operation to like for this filter.
     * @param value
     * @return IFilter
     */
    public like(value: string): IFilter {
        if (value == null) {
            throw new Error("null not allowed. Provide string value for " + Filter.LIKE + " function.");
        }

        this.value = value;
        this.operation = Filter.LIKE;

        return this;
    }

    /**
     * Sets given values and operation to not like for this filter.
     * @param value
     * @return IFilter
     */
    public notLike(value: string): IFilter {
        if (value == null) {
            throw new Error("null not allowed. Provide string value for notLike function.");
        }

        this.value = value;
        this.operation = Filter.NOT_LIKE;

        return this;
    }

    /**
     * Sets given values and operation to is null for this filter.
     * @return IFilter
     */
    public isNull(): IFilter {
        this.operation = Filter.IS_NULL;

        return this;
    }

    /**
     * Sets given values and operation to is not null for this filter.
     * @return IFilter
     */
    public isNotNull(): IFilter {
        this.operation = Filter.IS_NOT_NULL;

        return this;
    }

    public writeXml(xml: IaXmlWriter): void {
        if (this.operation) {
            xml.writeStartElement(this.operation);
        } else {
            throw new Error("Filter requires 1 method be called before calling writeXml");
        }
        xml.writeElement("field", this.fieldName, false);
        if (this.value !== null) {
            if (isArray(this.value)) {
                for (const arrayValue of this.value) {
                    xml.writeElement("value", arrayValue, true);
                }
            } else {
                xml.writeElement("value", this.value, true);
            }
        }
        xml.writeEndElement(); // close tag from this.operation
    }
}
