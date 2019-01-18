/**
 * @module Intacct/SDK/Functions/Common
 */

/**
 * Copyright 2019 Sage Intacct, Inc.
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

export default class ReadByName extends AbstractFunction {

    public static readonly MAX_KEY_COUNT = 100;

    public objectName: string;

    public fields: string[];

    public docParId: string;

    private _names: string[];
    get names(): string[] {
        return this._names;
    }
    set names(names: string[]) {
        if (names != null && names.length > ReadByName.MAX_KEY_COUNT) {
            throw new Error("Names count cannot exceed " + ReadByName.MAX_KEY_COUNT);
        }

        this._names = names;
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("readByName");

        xml.writeElement("object", this.objectName, true);
        xml.writeElement("keys", this.names !== undefined && this.names.length > 0 ? this.names.join(",") : "", true);
        xml.writeElement("fields",
            this.fields !== undefined && this.fields.length > 0 ? this.fields.join(",") : "*", true);
        xml.writeElement("returnFormat", "xml");
        xml.writeElement("docparid", this.docParId);

        xml.writeEndElement(); // readByName

        xml.writeEndElement(); // function
    }
}
