/**
 * @module Intacct/SDK/Functions/GeneralLedger
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
import AbstractAccount from "./AbstractAccount";

export default class AccountCreate extends AbstractAccount {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create");
        xml.writeStartElement("GLACCOUNT");

        xml.writeElement("ACCOUNTNO", this.accountNo, true);
        xml.writeElement("TITLE", this.title, true);
        xml.writeElement("ACCOUNTTYPE", this.accountType, true);
        xml.writeElement("NORMALBALANCE", this.normalBalance, true);
        xml.writeElement("CLOSINGTYPE", this.closingType, true);

        xml.writeElement("CLOSINGACCOUNTNO", this.closeIntoGlAccountNo);
        xml.writeElement("CATEGORY", this.systemCategory);
        xml.writeElement("TAXCODE", this.taxReturnCode);
        xml.writeElement("MRCCODE", this.m3ReturnCode);

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        xml.writeElement("TAXABLE", this.taxable);
        xml.writeElement("REQUIREDEPT", this.requireDepartment);
        xml.writeElement("REQUIRELOC", this.requireLocation);
        xml.writeElement("REQUIREPROJECT", this.requireProject);
        xml.writeElement("REQUIRECUSTOMER", this.requireCustomer);
        xml.writeElement("REQUIREVENDOR", this.requireVendor);
        xml.writeElement("REQUIREEMPLOYEE", this.requireEmployee);
        xml.writeElement("REQUIREITEM", this.requireItem);
        xml.writeElement("REQUIRECLASS", this.requireClass);
        xml.writeElement("REQUIRECONTRACT", this.requireContract);
        xml.writeElement("REQUIREWAREHOUSE", this.requireWarehouse);

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // GLACCOUNT
        xml.writeEndElement(); // create

        xml.writeEndElement(); // function
    }
}
