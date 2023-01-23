/**
 * @module Intacct/SDK/Functions/Company
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
import AbstractContact from "./AbstractContact";

export default class ContactCreate extends AbstractContact {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create");
        xml.writeStartElement("CONTACT");

        xml.writeElement("CONTACTNAME", this.contactName, true);
        xml.writeElement("PRINTAS", this.printAs, true);

        xml.writeElement("COMPANYNAME", this.companyName);
        xml.writeElement("TAXABLE", this.taxable);
        xml.writeElement("TAXID", this.taxId);
        xml.writeElement("TAXGROUP", this.contactTaxGroupName);
        xml.writeElement("PREFIX", this.prefix);
        xml.writeElement("FIRSTNAME", this.firstName);
        xml.writeElement("LASTNAME", this.lastName);
        xml.writeElement("INITIAL", this.middleName);
        xml.writeElement("PHONE1", this.primaryPhoneNo);
        xml.writeElement("PHONE2", this.secondaryPhoneNo);
        xml.writeElement("CELLPHONE", this.cellularPhoneNo);
        xml.writeElement("PAGER", this.pagerNo);
        xml.writeElement("FAX", this.faxNo);
        xml.writeElement("EMAIL1", this.primaryEmailAddress);
        xml.writeElement("EMAIL2", this.secondaryEmailAddress);
        xml.writeElement("URL1", this.primaryUrl);
        xml.writeElement("URL2", this.secondaryUrl);

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        this.writeXmlMailAddress(xml);

        xml.writeEndElement(); // CONTACT
        xml.writeEndElement(); // create

        xml.writeEndElement(); // function
    }
}
