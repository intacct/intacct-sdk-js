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
import AbstractEmployee from "./AbstractEmployee";

export default class EmployeeUpdate extends AbstractEmployee {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update");
        xml.writeStartElement("EMPLOYEE");

        xml.writeElement("EMPLOYEEID", this.employeeId, true);

        if (this.contactName != null) {
            xml.writeStartElement("PERSONALINFO");
            xml.writeElement("CONTACTNAME", this.contactName, true);
            xml.writeEndElement(); // PERSONALINFO
        }

        xml.writeElementDate("STARTDATE", this.startDate, IaXmlWriter.intacctDateFormat);
        xml.writeElement("TITLE", this.title);
        xml.writeElement("SSN", this.ssn);
        xml.writeElement("EMPLOYEETYPE", this.employeeType);

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        xml.writeElementDate("BIRTHDATE", this.birthDate, IaXmlWriter.intacctDateFormat);
        xml.writeElementDate("ENDDATE", this.endDate, IaXmlWriter.intacctDateFormat);

        xml.writeElement("TERMINATIONTYPE", this.terminationType);
        xml.writeElement("SUPERVISORID", this.managerEmployeeId);
        xml.writeElement("GENDER", this.gender);
        xml.writeElement("DEPARTMENTID", this.departmentId);
        xml.writeElement("LOCATIONID", this.locationId);
        xml.writeElement("CLASSID", this.classId);
        xml.writeElement("CURRENCY", this.defaultCurrency);
        xml.writeElement("EARNINGTYPENAME", this.earningTypeName);
        xml.writeElement("POSTACTUALCOST", this.postActualCost);
        xml.writeElement("NAME1099", this.form1099Name);
        xml.writeElement("FORM1099TYPE", this.form1099Type);
        xml.writeElement("FORM1099BOX", this.form1099Box);
        xml.writeElement("SUPDOCFOLDERNAME", this.attachmentFolderName);
        xml.writeElement("PAYMETHODKEY", this.preferredPaymentMethod);
        xml.writeElement("MERGEPAYMENTREQ", this.mergePaymentRequests);
        xml.writeElement("PAYMENTNOTIFY", this.sendAutomaticPaymentNotification);
        xml.writeElement("ACHENABLED", this.achEnabled);
        xml.writeElement("ACHBANKROUTINGNUMBER", this.achBankRoutingNo);
        xml.writeElement("ACHACCOUNTNUMBER", this.achBankAccountNo);
        xml.writeElement("ACHACCOUNTTYPE", this.achBankAccountType);
        xml.writeElement("ACHREMITTANCETYPE", this.achBankAccountClass);

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // EMPLOYEE
        xml.writeEndElement(); // update

        xml.writeEndElement(); // function
    }
}
