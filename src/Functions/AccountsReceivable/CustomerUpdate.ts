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
import AbstractCustomer from "./AbstractCustomer";

export default class CustomerUpdate extends AbstractCustomer {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update");
        xml.writeStartElement("CUSTOMER");

        xml.writeElement("CUSTOMERID", this.customerId, true);

        xml.writeElement("NAME", this.customerName);

        xml.writeStartElement("DISPLAYCONTACT");

        // CONTACTNAME is auto created as '[CustomerName](C[CustomerID])'

        xml.writeElement("PRINTAS", this.printAs);
        xml.writeElement("COMPANYNAME", this.companyName);
        xml.writeElement("TAXABLE", this.taxable);
        // TAXID passed in with CUSTOMER element below
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
        xml.writeElement("CUSTTYPE", this.customerTypeId);
        xml.writeElement("CUSTREPID", this.salesRepEmployeeId);
        xml.writeElement("PARENTID", this.parentCustomerId);
        xml.writeElement("GLGROUP", this.glGroupName);
        xml.writeElement("TERRITORYID", this.territoryId);
        xml.writeElement("SUPDOCID", this.attachmentsId);
        xml.writeElement("TERMNAME", this.paymentTerm);
        xml.writeElement("OFFSETGLACCOUNTNO", this.offsetArGlAccountNo);
        xml.writeElement("ARACCOUNT", this.defaultRevenueGlAccountNo);
        xml.writeElement("SHIPPINGMETHOD", this.shippingMethod);
        xml.writeElement("RESALENO", this.resaleNumber);
        xml.writeElement("TAXID", this.taxId);
        xml.writeElement("CREDITLIMIT", this.creditLimit);
        xml.writeElement("ONHOLD", this.onHold);
        xml.writeElement("DELIVERYOPTIONS", this.deliveryMethod);
        xml.writeElement("CUSTMESSAGEID", this.defaultInvoiceMessage);
        xml.writeElement("COMMENTS", this.comments);
        xml.writeElement("CURRENCY", this.defaultCurrency);

        xml.writeElement("ARINVOICEPRINTTEMPLATEID", this.printOptionArInvoiceTemplateName);
        xml.writeElement("OEQUOTEPRINTTEMPLATEID", this.printOptionOeQuoteTemplateName);
        xml.writeElement("OEORDERPRINTTEMPLATEID", this.printOptionOeOrderTemplateName);
        xml.writeElement("OELISTPRINTTEMPLATEID", this.printOptionOeListTemplateName);
        xml.writeElement("OEINVOICEPRINTTEMPLATEID", this.printOptionOeInvoiceTemplateName);
        xml.writeElement("OEADJPRINTTEMPLATEID", this.printOptionOeAdjustmentTemplateName);
        xml.writeElement("OEOTHERPRINTTEMPLATEID", this.printOptionOeOtherTemplateName);

        if (this.primaryContactName != null) {
            xml.writeStartElement("CONTACTINFO");
            xml.writeElement("CONTACTNAME", this.primaryContactName);
            xml.writeEndElement(); // CONTACTINFO
        }
        if (this.billToContactName != null) {
            xml.writeStartElement("BILLTO");
            xml.writeElement("CONTACTNAME", this.billToContactName);
            xml.writeEndElement(); // BILLTO
        }
        if (this.shipToContactName != null) {
            xml.writeStartElement("SHIPTO");
            xml.writeElement("CONTACTNAME", this.shipToContactName);
            xml.writeEndElement(); // SHIPTO
        }

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

        xml.writeEndElement(); // CUSTOMER
        xml.writeEndElement(); // update

        xml.writeEndElement(); // function
    }
}
