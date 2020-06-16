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
import {IOrder} from "./QueryOrderBy";
import ISelect from "./QuerySelect/ISelect";

export default class Query extends AbstractFunction implements IQueryFunction {

    /**
     * @type {ISelect[]}
     */
    public selectFields: ISelect[];

    /**
     * @type {string}
     */
    public fromObject: string;

    /**
     * @type {string}
     */
    public docParId: string;

    /**
     * @type {IOrder[]}
     */
    public orderBy: IOrder[];

    /**
     * @type {boolean}
     */
    public caseInsensitive: boolean;

    /**
     * @type {number}
     */
    public pageSize: number;

    /**
     * @type {number}
     */
    public offset: number;

    /**
     *
     * @param {ISelect[]} selectFields
     *
     * @return IQueryFunction
     */
    public setSelectFields(selectFields: ISelect[]): IQueryFunction {
        this.selectFields = selectFields;

        return this;
    }

    /**
     *
     * @param {string} fromObject
     *
     * @return IQueryFunction
     */
    public setFromObject(fromObject: string): IQueryFunction {
        this.fromObject = fromObject;

        return this;
    }

    /**
     *
     * @param {string} docParId
     *
     * @return IQueryFunction
     */
    public setDocParId(docParId: string): IQueryFunction {
        this.docParId = docParId;

        return this;
    }

    /**
     *
     * @param {IOrder[]} orderBy
     *
     * @return IOrder[]
     */
    public setOrderBy(orderBy: IOrder[]): IQueryFunction {
        this.orderBy = orderBy;

        return this;
    }

    /**
     *
     * @param {boolean} caseInsensitive
     *
     * @return IQueryFunction
     */
    public setCaseInsensitive(caseInsensitive: boolean): IQueryFunction {
        this.caseInsensitive = caseInsensitive;

        return this;
    }

    /**
     *
     * @param {number} pageSize
     *
     * @return IQueryFunction
     */
    public setPageSize(pageSize: number): IQueryFunction {
        this.pageSize = pageSize;

        return this;
    }

    /**
     *
     * @param {number} offset
     *
     * @return IQueryFunction
     */
    public setOffset(offset: number): IQueryFunction {
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

        if (this.orderBy != null && this.orderBy.length > 0) {
            xml.writeStartElement("orderby");
            for (const order of this.orderBy) {
                order.writeXml(xml);
            }
            xml.writeEndElement(); // orderby
        }

        xml.writeStartElement("options");
        xml.writeElement("caseinsensitive", this.caseInsensitive == null ? false : this.caseInsensitive, false);
        xml.writeEndElement(); // options

        xml.writeElement("pagesize", this.pageSize);
        xml.writeElement("offset", this.offset);
        xml.writeEndElement(); // query
        xml.writeEndElement(); // function
    }
}
