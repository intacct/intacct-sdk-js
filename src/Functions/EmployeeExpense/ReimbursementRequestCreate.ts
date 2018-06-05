/**
 * @module Intacct/SDK/Functions/EmployeeExpense
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
import AbstractReimbursementRequest from "./AbstractReimbursementRequest";

export default class ReimbursementRequestCreate extends AbstractReimbursementRequest {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create_reimbursementrequest");

        xml.writeElement("bankaccountid", this.bankAccountId, true);
        xml.writeElement("employeeid", this.employeeId, true);

        xml.writeElement("memo", this.memo);

        xml.writeElement("paymentmethod", this.paymentMethod, true);

        xml.writeStartElement("paymentdate");
        xml.writeDateSplitElements(this.paymentDate, true);
        xml.writeEndElement(); // paymentdate

        xml.writeElement("paymentoption", this.mergeOption);

        xml.writeStartElement("eppaymentrequestitems");
        if (this.applyToTransactions != null && this.applyToTransactions.length > 0) {
            for (const applyToTransaction of this.applyToTransactions) {
                applyToTransaction.writeXml(xml);
            }
        }
        xml.writeEndElement(); // eppaymentrequestitems

        xml.writeElement("documentnumber", this.documentNo);
        xml.writeElement("paymentdescription", this.memo);
        xml.writeElement("paymentcontact", this.notificationContactName);

        xml.writeEndElement(); // create_reimbursementrequest

        xml.writeEndElement(); // function
    }
}
