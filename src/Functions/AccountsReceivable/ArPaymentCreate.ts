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
import AbstractArPayment from "./AbstractArPayment";

export default class ArPaymentCreate extends AbstractArPayment {

    public summaryRecordNo: number;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create_arpayment");

        xml.writeElement("customerid", this.customerId, true);
        xml.writeElement("paymentamount", this.transactionPaymentAmount, true);
        xml.writeElement("translatedamount", this.basePaymentAmount);

        if (this.undepositedFundsGlAccountNo != null) {
            xml.writeElement("undepfundsacct", this.undepositedFundsGlAccountNo);
        } else {
            xml.writeElement("bankaccountid", this.bankAccountId);
        }

        xml.writeElement("refid", this.refId);

        xml.writeStartElement("datereceived");
        xml.writeDateSplitElements(this.receivedDate, true);
        xml.writeEndElement(); // datereceived

        xml.writeElement("paymentmethod", this.paymentMethod, true);

        xml.writeElement("basecurr", this.baseCurrency);
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
        } else if (this.baseCurrency != null || this.transactionCurrency != null) {
            xml.writeElement("exchratetype", this.exchangeRateType, true);
        }

        xml.writeElement("cctype", this.creditCardType);
        xml.writeElement("authcode", this.authorizationCode);

        if (this.applyToTransactions != null && this.applyToTransactions.length > 0) {
            for (const applyToTransaction of this.applyToTransactions) {
                applyToTransaction.writeXml(xml);
            }
        }

        // TODO online payment methods

        xml.writeEndElement(); // create_arpayment

        xml.writeEndElement(); // function
    }
}
