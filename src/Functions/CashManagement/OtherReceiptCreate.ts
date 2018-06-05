/**
 * @module Intacct/SDK/Functions/CashManagement
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
import AbstractOtherReceipt from "./AbstractOtherReceipt";

export default class OtherReceiptCreate extends AbstractOtherReceipt {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("record_otherreceipt");

        xml.writeStartElement("paymentdate");
        xml.writeDateSplitElements(this.transactionDate);
        xml.writeEndElement(); // paymentdate

        xml.writeElement("payee", this.payer, true);

        xml.writeStartElement("receiveddate");
        xml.writeDateSplitElements(this.receiptDate);
        xml.writeEndElement(); // receiveddate

        xml.writeElement("paymentmethod", this.paymentMethod, true);

        if (this.bankAccountId != null || this.depositDate != null) {
            xml.writeElement("bankaccountid", this.bankAccountId, true);
            if (this.depositDate != null) {
                xml.writeStartElement("depositdate");
                xml.writeDateSplitElements(this.depositDate);
                xml.writeEndElement(); // depositdate
            }
        } else {
            xml.writeElement("undepglaccountno", this.undepositedFundsGlAccountNo, true);
        }

        xml.writeElement("refid", this.transactionNo);
        xml.writeElement("description", this.description);
        xml.writeElement("supdocid", this.attachmentsId);
        xml.writeElement("currency", this.transactionCurrency);

        if (this.exchangeRateValue != null) {
            xml.writeElement("exchrate", this.exchangeRateValue);
        } else if (this.exchangeRateDate != null || this.exchangeRateType != null) {
            if (this.exchangeRateDate != null) {
                xml.writeStartElement("exchratedate");
                xml.writeDateSplitElements(this.exchangeRateDate);
                xml.writeEndElement(); // exchratedate
            }
            xml.writeElement("exchratetype", this.exchangeRateType, true);
        }

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeStartElement("receiptitems");
        if (this.lines != null && this.lines.length > 0) {
            for (const line of this.lines) {
                line.writeXml(xml);
            }
        }

        xml.writeEndElement(); // receiptitems
        xml.writeEndElement(); // record_otherreceipt

        xml.writeEndElement(); // function
    }
}
