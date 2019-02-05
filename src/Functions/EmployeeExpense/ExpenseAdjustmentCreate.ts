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
import AbstractExpenseAdjustment from "./AbstractExpenseAdjustment";

export default class ExpenseAdjustmentCreate extends AbstractExpenseAdjustment {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create_expenseadjustmentreport");

        xml.writeElement("employeeid", this.employeeId, true);

        xml.writeStartElement("datecreated");
        xml.writeDateSplitElements(this.transactionDate);
        xml.writeEndElement(); // datecreated

        if (this.glPostingDate != null) {
            xml.writeStartElement("dateposted");
            xml.writeDateSplitElements(this.glPostingDate);
            xml.writeEndElement(); // dateposted
        }

        xml.writeElement("batchkey", this.summaryRecordNo);
        xml.writeElement("adjustmentno", this.expenseAdjustmentNumber);
        xml.writeElement("docnumber", this.expenseReportNumber);
        xml.writeElement("description", this.description);
        xml.writeElement("basecurr", this.baseCurrency);
        xml.writeElement("currency", this.reimbursementCurrency);

        // Current schema does not allow custom fields
        // xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeStartElement("expenseadjustments");
        if (this.lines != null && this.lines.length > 0) {
            for (const line of this.lines) {
                line.writeXml(xml);
            }
        }
        xml.writeEndElement(); // expenseadjustments

        xml.writeElement("supdocid", this.attachmentsId);

        xml.writeEndElement(); // create_expenseadjustmentreport

        xml.writeEndElement(); // function
    }
}
