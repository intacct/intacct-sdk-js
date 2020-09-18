/**
 * @module Intacct/SDK/Functions/Common/NewQuery
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

import IaXmlWriter from "../../../Xml/IaXmlWriter";
import AbstractFunction from "../../AbstractFunction";
import IQueryFunction from "./IQueryFunction";
import IFilter from "./QueryFilter/IFilter";
import IOrder from "./QueryOrderBy/IOrder";
import ISelect from "./QuerySelect/ISelect";

export default class Query extends AbstractFunction implements IQueryFunction {

    public selectFields: ISelect[];

    public fromObject: string;

    public filter: IFilter;

    public docParId: string;

    public orderBy: IOrder[];

    public caseInsensitive: boolean;

    public showPrivate: boolean;

    public pageSize: number;

    public offset: number;

    /**
     * Add Field list for this query
     * @param {ISelect[]} selectFields
     *
     * @return IQueryFunction
     */
    public assignSelectFields(selectFields: ISelect[]): IQueryFunction {
        this.selectFields = selectFields;

        return this;
    }

    /**
     * Add object name for given fromObject for this query
     * @param {string} fromObject
     *
     * @return IQueryFunction
     */
    public assignFromObject(fromObject: string): IQueryFunction {
        this.fromObject = fromObject;

        return this;
    }

    /**
     * Add docParId for this query
     * @param {string} docParId
     *
     * @return IQueryFunction
     */
    public assignDocParId(docParId: string): IQueryFunction {
        this.docParId = docParId;

        return this;
    }

    /**
     * Add Filter for this query
     * @param filter
     */
    public assignFilter(filter: IFilter): IQueryFunction {
        this.filter = filter;

        return this;
    }

    /**
     * Add Order by list for this query
     * @param {IOrder[]} orderBy
     *
     * @return IOrder[]
     */
    public assignOrderBy(orderBy: IOrder[]): IQueryFunction {
        this.orderBy = orderBy;

        return this;
    }

    /**
     * Add case insensitive for this query
     * @param {boolean} caseInsensitive
     *
     * @return IQueryFunction
     */
    public assignCaseInsensitive(caseInsensitive: boolean): IQueryFunction {
        this.caseInsensitive = caseInsensitive;

        return this;
    }

    /**
     * Add show private for this query
     * @param showPrivate
     *
     * @return IQueryFunction
     */
    public assignShowPrivate(showPrivate: boolean): IQueryFunction {
        this.showPrivate = showPrivate;

        return this;
    }

    /**
     * Add page size for this query
     * @param {number} pageSize
     *
     * @return IQueryFunction
     */
    public assignPageSize(pageSize: number): IQueryFunction {
        this.pageSize = pageSize;

        return this;
    }

    /**
     * Add offset for this query
     * @param {number} offset
     *
     * @return IQueryFunction
     */
    public assignOffset(offset: number): IQueryFunction {
        this.offset = offset;

        return this;
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("query");

        if (this.selectFields != null && this.selectFields.length > 0) {
            xml.writeStartElement("select");
            for (const select of this.selectFields) {
                select.writeXml(xml);
            }
            xml.writeEndElement(); // select
        }

        xml.writeElement("object", this.fromObject, false);
        xml.writeElement("docparid", this.docParId);

        if (this.filter) {
            xml.writeStartElement("filter");
            this.filter.writeXml(xml);
            xml.writeEndElement(); // filter
        }

        if (this.orderBy != null && this.orderBy.length > 0) {
            xml.writeStartElement("orderby");
            for (const order of this.orderBy) {
                order.writeXml(xml);
            }
            xml.writeEndElement(); // orderby
        }

        xml.writeStartElement("options");
        xml.writeElement("caseinsensitive", this.caseInsensitive == null ? false : this.caseInsensitive, false);
        xml.writeElement("showprivate", this.showPrivate == null ? false : this.showPrivate, false);
        xml.writeEndElement(); // options

        xml.writeElement("pagesize", this.pageSize);
        xml.writeElement("offset", this.offset);
        xml.writeEndElement(); // query
        xml.writeEndElement(); // function
    }
}
