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
import AbstractExpenseReport from "./AbstractExpenseReport";

export default class ExpenseReportReverse extends AbstractExpenseReport {

    public reverseDate: Date;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("reverse_expensereport");

        xml.writeAttribute("key", this.recordNo);

        xml.writeStartElement("datereversed");
        xml.writeDateSplitElements(this.reverseDate);
        xml.writeEndElement(); // datereversed

        xml.writeElement("description", this.memo);

        xml.writeEndElement(); // reverse_expensereport

        xml.writeEndElement(); // function
    }
}
