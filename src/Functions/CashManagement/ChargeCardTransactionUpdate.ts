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
import AbstractChargeCardTransaction from "./AbstractChargeCardTransaction";

export default class ChargeCardTransactionUpdate extends AbstractChargeCardTransaction {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update_cctransaction");

        xml.writeAttribute("key", this.recordNo, true);

        if (this.transactionDate != null) {
            xml.writeStartElement("paymentdate");
            xml.writeDateSplitElements(this.transactionDate);
            xml.writeEndElement(); // paymentdate
        }

        xml.writeElement("referenceno", this.referenceNumber);
        xml.writeElement("payee", this.payee);
        xml.writeElement("description", this.description);
        xml.writeElement("supdocid", this.attachmentsId);
        xml.writeElement("currency", this.transactionCurrency);

        if (this.exchangeRateValue != null) {
            xml.writeElement("exchrate", this.exchangeRateValue);
        } else if (this.exchangeRateDate != null || this.exchangeRateType != null) {
            if (this.exchangeRateDate != null) {
                xml.writeStartElement("exchratedate");
                xml.writeDateSplitElements(this.exchangeRateDate);
                xml.writeEndElement();
            }
            xml.writeElement("exchratetype", this.exchangeRateType, true);
        }

        xml.writeCustomFieldsExplicit(this.customFields);

        if (this.lines != null && this.lines.length > 0) {
            xml.writeStartElement("updateccpayitems");
            for (const line of this.lines) {
                line.writeXml(xml);
            }
            xml.writeEndElement(); // updateccpayitems
        }

        xml.writeEndElement(); // update_cctransaction

        xml.writeEndElement(); // function
    }
}
