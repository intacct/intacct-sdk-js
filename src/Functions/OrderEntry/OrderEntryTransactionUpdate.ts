/**
 * @module Intacct/SDK/Functions/OrderEntry
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
import AbstractOrderEntryTransaction from "./AbstractOrderEntryTransaction";

export default class OrderEntryTransactionUpdate extends AbstractOrderEntryTransaction {

    public transactionId: string;
    public disableValidation: boolean;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update_sotransaction");

        if (this.externalId != null) {
            xml.writeAttribute("key", this.externalId);
            xml.writeAttribute("externalkey", true);
        } else {
            xml.writeAttribute("key", this.transactionId);
        }

        if (this.disableValidation === true) {
            xml.writeAttribute("disablevalidation", true);
        }

        if (this.transactionDate != null) {
            xml.writeStartElement("datecreated");
            xml.writeDateSplitElements(this.transactionDate, true);
            xml.writeEndElement(); // datecreated
        }

        if (this.glPostingDate != null) {
            xml.writeStartElement("dateposted");
            xml.writeDateSplitElements(this.glPostingDate);
            xml.writeEndElement(); // dateposted
        }

        xml.writeElement("referenceno", this.referenceNumber);
        xml.writeElement("termname", this.paymentTerm);

        if (this.dueDate != null) {
            xml.writeStartElement("datedue");
            xml.writeDateSplitElements(this.dueDate, true);
            xml.writeEndElement(); // datedue
        }

        if (this.originalDocumentDate != null) {
            xml.writeStartElement("origdocdate");
            xml.writeDateSplitElements(this.originalDocumentDate);
            xml.writeEndElement(); // origdocdate
        }

        xml.writeElement("message", this.message);
        xml.writeElement("shippingmethod", this.shippingMethod);

        if (this.shipToContactName != null) {
            xml.writeStartElement("shipto");
            xml.writeElement("contactname", this.shipToContactName, true);
            xml.writeEndElement(); // shipto
        }

        if (this.billToContactName != null) {
            xml.writeStartElement("billto");
            xml.writeElement("contactname", this.billToContactName, true);
            xml.writeEndElement(); // billto
        }

        xml.writeElement("supdocid", this.attachmentsId);
        xml.writeElement("externalid", this.externalId);

        this.writeXmlMultiCurrencySection(xml);

        xml.writeElement("vsoepricelist", this.vsoePriceList);

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeElement("state", this.state);
        xml.writeElement("projectid", this.projectId);

        if (this.lines != null && this.lines.length > 0) {
            xml.writeStartElement("updatesotransitems");
            for (const line of this.lines) {
                line.writeXml(xml);
            }
            xml.writeEndElement(); // updatesotransitems
        }

        if (this.subtotals != null && this.subtotals.length > 0) {
            xml.writeStartElement("updatesubtotals");
            for (const subtotal of this.subtotals) {
                subtotal.writeXml(xml);
            }
            xml.writeEndElement(); // updatesubtotals
        }

        xml.writeEndElement(); // update_sotransaction

        xml.writeEndElement(); // function
    }
}
