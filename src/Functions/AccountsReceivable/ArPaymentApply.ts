/**
 * @module Intacct/SDK/Functions/AccountsReceivable
 */

/**
 * Copyright 2022 Sage Intacct, Inc.
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

export default class ArPaymentApply extends AbstractArPayment {

    public memo: string;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("apply_arpayment");

        xml.writeElement("arpaymentkey", this.recordNo, true);

        xml.writeStartElement("paymentdate");
        xml.writeDateSplitElements(this.receivedDate, true);
        xml.writeEndElement(); // paymentdate

        xml.writeElement("batchkey", this.summaryRecordNo);
        xml.writeElement("memo", this.memo);
        xml.writeElement("overpaylocid", this.overpaymentLocationId);
        xml.writeElement("overpaydeptid", this.overpaymentDepartmentId);

        if (this.applyToTransactions != null && this.applyToTransactions.length > 0) {
            xml.writeStartElement("arpaymentitems");
            for (const applyToTransaction of this.applyToTransactions) {
                applyToTransaction.writeXml(xml);
            }
            xml.writeEndElement(); // arpaymentitems
        }

        xml.writeEndElement(); // apply_arpayment

        xml.writeEndElement(); // function
    }
}
