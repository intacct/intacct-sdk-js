/**
 * @module Intacct/SDK/Functions/Common
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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractFunction from "../AbstractFunction";
import IQuery from "./Query/IQuery";

export default class ReadByQuery extends AbstractFunction {

    private static readonly MIN_PAGE_SIZE = 1;

    private static readonly MAX_PAGE_SIZE = 1000;

    private static readonly DEFAULT_PAGE_SIZE = 1000;

    public objectName: string;

    public fields: string[];

    public query: IQuery;

    public docParId: string;

    private _pageSize = 1000;
    get pageSize(): number {
        return this._pageSize;
    }
    set pageSize(pageSize: number) {
        if (pageSize < ReadByQuery.MIN_PAGE_SIZE) {
            throw new Error("Page Size cannot be less than " + ReadByQuery.MIN_PAGE_SIZE);
        } else if (pageSize > ReadByQuery.MAX_PAGE_SIZE) {
            throw new Error("Page Size cannot be greater than " + ReadByQuery.MAX_PAGE_SIZE);
        }
        this._pageSize = pageSize;
    }

    constructor(controlId?: string) {
        super(controlId);
        this.fields = [];
        this.pageSize = ReadByQuery.DEFAULT_PAGE_SIZE;
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("readByQuery");

        xml.writeElement("object", this.objectName, true);
        xml.writeElement("query", this.query == null ? "" : this.query.toString(), true);
        xml.writeElement("fields", this.fields.length > 0 ? this.fields.join(",") : "*", true);
        xml.writeElement("pagesize", this.pageSize);
        xml.writeElement("returnFormat", "xml");
        xml.writeElement("docparid", this.docParId);

        xml.writeEndElement(); // readByQuery

        xml.writeEndElement(); // function
    }
}
