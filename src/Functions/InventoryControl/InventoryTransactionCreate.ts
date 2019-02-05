/**
 * @module Intacct/SDK/Functions/InventoryControl
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
import AbstractInventoryTransaction from "./AbstractInventoryTransaction";

export default class InventoryTransactionCreate extends AbstractInventoryTransaction {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create_ictransaction");

        xml.writeElement("transactiontype", this.transactionDefinition, true);

        xml.writeStartElement("datecreated");
        xml.writeDateSplitElements(this.transactionDate, true);
        xml.writeEndElement(); // datecreated

        xml.writeElement("createdfrom", this.createdFrom);
        xml.writeElement("documentno", this.documentNumber);
        xml.writeElement("referenceno", this.referenceNumber);
        xml.writeElement("message", this.message);
        xml.writeElement("externalid", this.externalId);
        xml.writeElement("basecurr", this.baseCurrency);

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeElement("state", this.state);

        xml.writeStartElement("ictransitems");
        if (this.lines != null && this.lines.length > 0) {
            for (const line of this.lines) {
                line.writeXml(xml);
            }
        }
        xml.writeEndElement(); // ictransitems

        if (this.subtotals != null && this.subtotals.length > 0) {
            xml.writeStartElement("subtotals");
            for (const subtotal of this.subtotals) {
                subtotal.writeXml(xml);
            }
            xml.writeEndElement(); // subtotals
        }

        xml.writeEndElement(); // create_ictransaction

        xml.writeEndElement(); // function
    }
}
