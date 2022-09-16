/**
 * @module Intacct/SDK/Functions/Common/Get
 */

/**
 * Copyright 2021 Sage Intacct, Inc.
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

export default class Get extends AbstractFunction {
    public object: string;
    public key: string;
    public fields: string[];

    public writeXml(xml: IaXmlWriter): void {
        if (this.object === undefined) {
            throw new Error("required parameter 'object' undefined");
        }
        if (this.key === undefined) {
            throw new Error("required parameter 'key' undefined");
        }

        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("get");
        xml.writeAttribute("object", this.object);
        xml.writeAttribute("key", this.key);

        // optionally add fields to include in list
        if (this.fields !== undefined) {
            xml.writeStartElement("fields");
            this.fields.forEach((field) => {
                xml.writeElement("field", field);
            });
            xml.writeEndElement(); // fields
        }

        xml.writeEndElement(); // get_list

        xml.writeEndElement(); // function
    }
}
