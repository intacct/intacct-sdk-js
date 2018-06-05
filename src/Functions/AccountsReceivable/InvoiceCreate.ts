/**
 * @module Intacct/SDK/Functions/AccountsReceivable
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
import AbstractInvoice from "./AbstractInvoice";

export default class InvoiceCreate extends AbstractInvoice {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create_invoice");

        xml.writeElement("customerid", this.customerId, true);

        xml.writeStartElement("datecreated");
        xml.writeDateSplitElements(this.transactionDate);
        xml.writeEndElement(); // datecreated

        if (this.glPostingDate) {
            xml.writeStartElement("dateposted");
            xml.writeDateSplitElements(this.glPostingDate);
            xml.writeEndElement(); // dateposted
        }

        if (this.dueDate) {
            xml.writeStartElement("datedue");
            xml.writeDateSplitElements(this.dueDate);
            xml.writeEndElement(); // datedue

            xml.writeElement("termname", this.paymentTerm);
        } else {
            xml.writeElement("termname", this.paymentTerm, true);
        }

        xml.writeElement("action", this.action);
        xml.writeElement("batchkey", this.summaryRecordNo);
        xml.writeElement("invoiceno", this.invoiceNumber);
        xml.writeElement("ponumber", this.referenceNumber);
        xml.writeElement("onhold", this.onHold);
        xml.writeElement("description", this.description);
        xml.writeElement("externalid", this.externalId);

        if (this.billToContactName != null) {
            xml.writeStartElement("billto");
            xml.writeElement("contactname", this.billToContactName);
            xml.writeEndElement(); // billto
        }
        if (this.shipToContactName != null) {
            xml.writeStartElement("shipto");
            xml.writeElement("contactname", this.shipToContactName);
            xml.writeEndElement(); // shipto
        }

        this.writeXmlMultiCurrencySection(xml);

        xml.writeElement("nogl", this.doNotPostToGl);
        xml.writeElement("supdocid", this.attachmentsId);

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeStartElement("invoiceitems");
        if (this.lines != null && this.lines.length > 0) {
            for (const line of this.lines) {
                line.writeXml(xml);
            }
        }
        xml.writeEndElement(); // invoiceitems

        xml.writeEndElement(); // create_invoice

        xml.writeEndElement(); // function
    }
}
