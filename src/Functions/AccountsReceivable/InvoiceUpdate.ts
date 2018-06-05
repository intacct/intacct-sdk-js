/**
 * @module Intacct/SDK/Functions/AccountsReceivable
 */

/*
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

export default class InvoiceUpdate extends AbstractInvoice {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update_invoice");
        if (this.externalId != null) {
            xml.writeAttribute("key", this.externalId);
            xml.writeAttribute("externalkey", "true");
        } else {
            xml.writeAttribute("key", this.recordNo);
        }

        xml.writeElement("customerid", this.customerId);

        if (this.transactionDate != null) {
            xml.writeStartElement("datecreated");
            xml.writeDateSplitElements(this.transactionDate);
            xml.writeEndElement(); // datecreated
        }

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
        } else if (this.paymentTerm != null) {
            xml.writeElement("termname", this.paymentTerm);
        }

        xml.writeElement("action", this.action);
        xml.writeElement("invoiceno", this.invoiceNumber);
        xml.writeElement("ponumber", this.referenceNumber);
        xml.writeElement("description", this.description);

        if (this.billToContactName != null) {
            xml.writeStartElement("payto");
            xml.writeElement("contactname", this.billToContactName);
            xml.writeEndElement(); // payto
        }
        if (this.shipToContactName != null) {
            xml.writeStartElement("returnto");
            xml.writeElement("contactname", this.shipToContactName);
            xml.writeEndElement(); // returnto
        }

        this.writeXmlMultiCurrencySection(xml);

        xml.writeElement("supdocid", this.attachmentsId);

        xml.writeCustomFieldsExplicit(this.customFields);

        if (this.lines != null && this.lines.length > 0) {
            xml.writeStartElement("updateinvoiceitems");
            for (const line of this.lines) {
                line.writeXml(xml);
            }
            xml.writeEndElement(); // updateinvoiceitems
        }

        xml.writeEndElement(); // update_invoice

        xml.writeEndElement(); // function
    }

    protected writeXmlMultiCurrencySection(xml: IaXmlWriter): void {
        xml.writeElement("currency", this.transactionCurrency);

        if (this.exchangeRateDate != null) {
            xml.writeStartElement("exchratedate");
            xml.writeDateSplitElements(this.exchangeRateDate);
            xml.writeEndElement(); // exchratedate
        }
        if (this.exchangeRateType != null) {
            xml.writeElement("exchratetype", this.exchangeRateType);
        } else if (this.exchangeRateValue != null) {
            xml.writeElement("exchrate", this.exchangeRateValue);
        } else if ((this.baseCurrency != null) || (this.transactionCurrency != null)) {
            xml.writeElement("exchratetype", this.exchangeRateType);
        }
    }
}
