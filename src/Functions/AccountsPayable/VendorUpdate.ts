/**
 * @module Intacct/SDK/Functions/AccountsPayable
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
import AbstractVendor from "./AbstractVendor";

export default class VendorUpdate extends AbstractVendor {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update");
        xml.writeStartElement("VENDOR");

        xml.writeElement("VENDORID", this.vendorId, true);

        xml.writeElement("NAME", this.vendorName);

        xml.writeStartElement("DISPLAYCONTACT");

        xml.writeElement("PRINTAS", this.printAs);
        xml.writeElement("COMPANYNAME", this.companyName);
        xml.writeElement("TAXABLE", this.taxable);
        // TAXID passed in with VENDOR element below
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

        this.writeXmlMailAddress(xml);

        xml.writeEndElement(); // DISPLAYCONTACT

        xml.writeElement("ONETIME", this.oneTime);

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        xml.writeElement("HIDEDISPLAYCONTACT", this.excludedFromContactList);
        xml.writeElement("VENDTYPE", this.vendorTypeId);
        xml.writeElement("PARENTID", this.parentVendorId);
        xml.writeElement("GLGROUP", this.glGroupName);
        xml.writeElement("TAXID", this.taxId);
        xml.writeElement("NAME1099", this.form1099Name);
        xml.writeElement("FORM1099TYPE", this.form1099Type);
        xml.writeElement("FORM1099BOX", this.form1099Box);
        xml.writeElement("SUPDOCID", this.attachmentsId);
        xml.writeElement("APACCOUNT", this.defaultExpenseGlAccountNo);
        xml.writeElement("CREDITLIMIT", this.creditLimit);
        xml.writeElement("ONHOLD", this.onHold);
        xml.writeElement("DONOTCUTCHECK", this.doNotPay);
        xml.writeElement("COMMENTS", this.comments);
        xml.writeElement("CURRENCY", this.defaultCurrency);

        if (this.primaryContactName != null) {
            xml.writeStartElement("CONTACTINFO");
            xml.writeElement("CONTACTNAME", this.primaryContactName);
            xml.writeEndElement(); // CONTACTINFO
        }
        if (this.payToContactName != null) {
            xml.writeStartElement("PAYTO");
            xml.writeElement("CONTACTNAME", this.payToContactName);
            xml.writeEndElement(); // PAYTO
        }
        if (this.returnToContactName != null) {
            xml.writeStartElement("RETURNTO");
            xml.writeElement("CONTACTNAME", this.returnToContactName);
            xml.writeEndElement(); // RETURNTO
        }

        xml.writeElement("PAYMETHODKEY", this.preferredPaymentMethod);
        xml.writeElement("MERGEPAYMENTREQ", this.mergePaymentRequests);
        xml.writeElement("PAYMENTNOTIFY", this.sendAutomaticPaymentNotification);
        xml.writeElement("BILLINGTYPE", this.vendorBillingType);
        // TODO: Default bill payment date

        xml.writeElement("PAYMENTPRIORITY", this.paymentPriority);
        xml.writeElement("TERMNAME", this.paymentTerm);
        xml.writeElement("DISPLAYTERMDISCOUNT", this.termDiscountDisplayedOnCheckStub);
        xml.writeElement("ACHENABLED", this.achEnabled);
        xml.writeElement("ACHBANKROUTINGNUMBER", this.achBankRoutingNo);
        xml.writeElement("ACHACCOUNTNUMBER", this.achBankAccountNo);
        xml.writeElement("ACHACCOUNTTYPE", this.achBankAccountType);
        xml.writeElement("ACHREMITTANCETYPE", this.achBankAccountClass);

        // TODO: Check delivery and ACH payment services fields

        xml.writeElement("VENDORACCOUNTNO", this.vendorAccountNo);
        xml.writeElement("DISPLAYACCTNOCHECK", this.locationAssignedAccountNoDisplayedOnCheckStub);

        // TODO: Location assigned account numbers

        xml.writeElement("OBJECTRESTRICTION", this.restrictionType);
        if (this.restrictedLocations != null) {
            xml.writeElement(
                "RESTRICTEDLOCATIONS", this.restrictedLocations.join(IaXmlWriter.intacctMultiSelectGlue));
        }
        if (this.restrictedDepartments != null) {
            xml.writeElement(
                "RESTRICTEDDEPARTMENTS", this.restrictedDepartments.join(IaXmlWriter.intacctMultiSelectGlue));
        }

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // VENDOR
        xml.writeEndElement(); // update

        xml.writeEndElement(); // function
    }
}
