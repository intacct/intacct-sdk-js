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

export default class Read extends AbstractFunction {

    public static readonly MAX_KEY_COUNT = 100;

    public objectName: string;

    public fields: string[];

    public docParId: string;

    private _keys: number[];
    get keys(): number[] {
        return this._keys;
    }
    set keys(keys: number[]) {
        if (keys != null && keys.length > Read.MAX_KEY_COUNT) {
            throw new Error("Keys count cannot exceed " + Read.MAX_KEY_COUNT);
        }

        this._keys = keys;
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("read");

        xml.writeElement("object", this.objectName, true);
        xml.writeElement("keys", this.keys !== undefined && this.keys.length > 0 ? this.keys.join(",") : "", true);
        xml.writeElement("fields",
            this.fields !== undefined && this.fields.length > 0 ? this.fields.join(",") : "*", true);
        xml.writeElement("returnFormat", "xml");
        xml.writeElement("docparid", this.docParId);

        xml.writeEndElement(); // read

        xml.writeEndElement(); // function
    }
}
