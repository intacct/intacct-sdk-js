/**
 * @module Intacct/SDK/Functions/EmployeeExpense
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
import AbstractExpenseReportLine from "./AbstractExpenseReportLine";

export default class ExpenseReportLineCreate extends AbstractExpenseReportLine {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("expense");

        if (this.expenseType != null) {
            xml.writeElement("expensetype", this.expenseType, true);
        } else {
            xml.writeElement("glaccountno", this.glAccountNumber, true);
        }

        xml.writeElement("amount", this.reimbursementAmount);
        xml.writeElement("currency", this.transactionCurrency);
        xml.writeElement("trx_amount", this.transactionAmount);

        if (this.exchangeRateDate != null) {
            xml.writeStartElement("exchratedate");
            xml.writeDateSplitElements(this.exchangeRateDate);
            xml.writeEndElement(); // exchratedate
        }
        if (this.exchangeRateType != null) {
            xml.writeElement("exchratetype", this.exchangeRateType);
        } else if (this.exchangeRateValue != null) {
            xml.writeElement("exchrate", this.exchangeRateValue);
        } else if (this.transactionCurrency != null || this.transactionAmount != null) {
            xml.writeElement("exchratetype", this.exchangeRateType, true);
        }

        if (this.expenseDate != null) {
            xml.writeStartElement("expensedate");
            xml.writeDateSplitElements(this.expenseDate, true);
            xml.writeEndElement();  // expensedate
        }

        xml.writeElement("memo", this.paidTo);
        xml.writeElement("form1099", this.form1099);
        xml.writeElement("paidfor", this.paidFor);
        xml.writeElement("locationid", this.locationId);
        xml.writeElement("departmentid", this.departmentId);

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeElement("projectid", this.projectId);
        xml.writeElement("customerid", this.customerId);
        xml.writeElement("vendorid", this.vendorId);
        xml.writeElement("employeeid", this.employeeId);
        xml.writeElement("itemid", this.itemId);
        xml.writeElement("classid", this.classId);
        xml.writeElement("contractid", this.contractId);
        xml.writeElement("warehouseid", this.warehouseId);
        xml.writeElement("billable", this.billable);
        xml.writeElement("exppmttype", this.paymentTypeName);
        xml.writeElement("quantity", this.quantity);
        xml.writeElement("rate", this.unitRate);

        xml.writeEndElement(); // expense
    }
}
