/**
 * @module Intacct/SDK/Functions/ContractsRevMgmt
 */

/**
 * Copyright 2020 Sage Intacct, Inc.
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
import AbstractFunction from "../AbstractFunction";

export default class ContractLineResume extends AbstractFunction {

    public recordNo: number;
    public asOfDate: Date;
    public resumeBilling: boolean;
    public resumeRevenue: boolean;
    public resumeExpense: boolean;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("resume");
        xml.writeStartElement("CONTRACTDETAIL");

        xml.writeElement("RECORDNO", this.recordNo, true);
        xml.writeElementDate("ASOFDATE", this.asOfDate, IaXmlWriter.intacctDateFormat, true);

        xml.writeElement("BILLING", this.resumeBilling);
        xml.writeElement("REVENUE", this.resumeRevenue);
        xml.writeElement("EXPENSE", this.resumeExpense);

        xml.writeEndElement(); // CONTRACTDETAIL
        xml.writeEndElement(); // resume

        xml.writeEndElement(); // function
    }
}
