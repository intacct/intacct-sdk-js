/**
 * @module Intacct/SDK/Functions/AccountsPayable
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
import AbstractApPaymentRequest from "./AbstractApPaymentRequest";

export default class ApPaymentRequestCreate extends AbstractApPaymentRequest {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create_paymentrequest");

        if (this.chargeCardId != null) {
            xml.writeElement("chargecardid", this.chargeCardId);
        } else {
            xml.writeElement("bankaccountid", this.bankAccountId);
        }

        xml.writeElement("vendorid", this.vendorId, true);

        xml.writeElement("memo", this.memo);

        xml.writeElement("paymentmethod", this.paymentMethod, true);

        xml.writeElement("grouppayments", this.groupPayments);

        xml.writeStartElement("paymentdate");
        xml.writeDateSplitElements(this.paymentDate, true);
        xml.writeEndElement(); // paymentdate

        xml.writeElement("paymentoption", this.mergeOption);

        if (this.applyToTransactions != null && this.applyToTransactions.length > 0) {
            xml.writeStartElement("paymentrequestitems");
            for (const applyToTransaction of this.applyToTransactions) {
                applyToTransaction.writeXml(xml);
            }
            xml.writeEndElement(); // paymentrequestitems
        }

        xml.writeElement("documentnumber", this.documentNo);

        // TODO: review paymentdescription vs memo
        xml.writeElement("paymentdescription", this.memo);

        xml.writeElement("paymentcontact", this.notificationContactName);

        xml.writeEndElement(); // create_paymentrequest

        xml.writeEndElement(); // function
    }
}
