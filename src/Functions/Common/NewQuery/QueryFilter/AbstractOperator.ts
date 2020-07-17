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

import IaXmlWriter from "../../../../Xml/IaXmlWriter";
import IFilter from "./IFilter";

export default abstract class AbstractOperator implements IFilter {

    public static readonly OR = "or";

    public static readonly AND = "and";

    protected constructor(private readonly filters?: IFilter[]) {
        if (!filters) {
            this.filters = [];
        } else {
            this.filters = filters;
        }
    }

    /**
     * Adds filter to list in this
     *
     * @param filter
     *
     * @return IFilter
     */
    public addFilter(filter: IFilter): IFilter {
        if (filter) {
            this.filters.push(filter);

            return this;
        } else {
            throw new Error("filter cannot be null");
        }
    }

    /**
     * Returns the and/or operator
     *
     * @return {string}
     */
    public abstract getOperator(): string;

    public writeXml(xml: IaXmlWriter): void {
        if (this.filters && this.filters.length >= 2) {
            xml.writeStartElement(this.getOperator());
            for (const filter of this.filters) {
                filter.writeXml(xml);
            }
            xml.writeEndElement();  // filter
        } else {
            throw new Error(`Two or more FilterInterface objects required for ${ this.getOperator() }`);
        }
    }
}
