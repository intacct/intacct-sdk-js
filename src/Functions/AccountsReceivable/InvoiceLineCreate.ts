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
import AbstractInvoiceLine from "./AbstractInvoiceLine";

export default class InvoiceLineCreate extends AbstractInvoiceLine {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("lineitem");

        if (this.accountLabel != null) {
            xml.writeElement("accountlabel", this.accountLabel, true);
        } else {
            xml.writeElement("glaccountno", this.glAccountNumber, true);
        }

        xml.writeElement("offsetglaccountno", this.offsetGlAccountNumber);
        xml.writeElement("amount", this.transactionAmount);
        xml.writeElement("allocationid", this.allocationId);
        xml.writeElement("memo", this.memo);
        xml.writeElement("locationid", this.locationId);
        xml.writeElement("departmentid", this.departmentId);
        xml.writeElement("key", this.key);
        xml.writeElement("totalpaid", this.totalPaid);
        xml.writeElement("totaldue", this.totalDue);

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeElement("revrectemplate", this.revRecTemplateId);
        xml.writeElement("defrevaccount", this.deferredRevGlAccountNo);
        if (this.revRecStartDate != null) {
            xml.writeStartElement("revrecstartdate");
            xml.writeDateSplitElements(this.revRecStartDate);
            xml.writeEndElement(); // revrecstartdate
        }
        if (this.revRecEndDate != null) {
            xml.writeStartElement("revrecenddate");
            xml.writeDateSplitElements(this.revRecEndDate);
            xml.writeEndElement(); // revrecenddate
        }

        xml.writeElement("projectid", this.projectId);
        xml.writeElement("customerid", this.customerId);
        xml.writeElement("vendorid", this.vendorId);
        xml.writeElement("employeeid", this.employeeId);
        xml.writeElement("itemid", this.itemId);
        xml.writeElement("classid", this.classId);
        xml.writeElement("contractid", this.contractId);
        xml.writeElement("warehouseid", this.warehouseId);

        xml.writeEndElement(); // lineitem
    }
}
