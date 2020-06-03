/**
 * @module Intacct/SDK/Functions/AccountsPayable
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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractApPayment from "./AbstractApPayment";

export default class ApPaymentReverse extends AbstractApPayment {

    public reverseDate: Date;
    public memo: string;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("reverse_appayment");

        xml.writeAttribute("key", this.recordNo, true);

        xml.writeStartElement("datereversed");
        xml.writeDateSplitElements(this.reverseDate);
        xml.writeEndElement(); // datereversed

        xml.writeElement("description", this.memo);

        xml.writeEndElement(); // reverse_appayment

        xml.writeEndElement(); // function
    }
}
