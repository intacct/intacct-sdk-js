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
import AbstractFunction from "../AbstractFunction";

export default abstract class AbstractVendor extends AbstractFunction {

    public vendorId: string;

    public vendorName: string;

    public oneTime: boolean;

    public active: boolean;

    public lastName: string;

    public firstName: string;

    public middleName: string;

    public prefix: string;

    public companyName: string;

    public printAs: string;

    public primaryPhoneNo: string;

    public secondaryPhoneNo: string;

    public cellularPhoneNo: string;

    public pagerNo: string;

    public faxNo: string;

    public primaryEmailAddress: string;

    public secondaryEmailAddress: string;

    public primaryUrl: string;

    public secondaryUrl: string;

    public addressLine1: string;

    public addressLine2: string;

    public city: string;

    public stateProvince: string;

    public zipPostalCode: string;

    public country: string;

    public isoCountryCode: string;

    public excludedFromContactList: boolean;

    public vendorTypeId: string;

    public parentVendorId: string;

    public glGroupName: string;

    public taxId: string;

    public form1099Name: string;

    public form1099Type: string;

    public form1099Box: string;

    public attachmentsId: string;

    public defaultExpenseGlAccountNo: string;

    public taxable: boolean;

    public contactTaxGroupName: string;

    public creditLimit: number;

    public onHold: boolean;

    public doNotPay: boolean;

    public comments: string;

    public defaultCurrency: string;

    public primaryContactName: string;

    public payToContactName: string;

    public returnToContactName: string;

    // TODO contact list

    public preferredPaymentMethod: string;

    public sendAutomaticPaymentNotification: boolean;

    public mergePaymentRequests: boolean;

    public vendorBillingType: string;

    // TODO default bill payment date

    public paymentPriority: string;

    public paymentTerm: string;

    public termDiscountDisplayedOnCheckStub: boolean;

    public achEnabled: boolean;

    public achBankRoutingNo: string;

    public achBankAccountNo: string;

    public achBankAccountType: string;

    public achBankAccountClass: string;

    // TODO check delivery and ACH payment services

    public vendorAccountNo: string;

    public locationAssignedAccountNoDisplayedOnCheckStub: boolean;

    // TODO location assigned vendor account no's

    public restrictionType: string;

    public restrictedLocations: string[];

    public restrictedDepartments: string[];

    public customFields: Array<[string, any]> = [];

    protected writeXmlMailAddress(xml: IaXmlWriter) {
        if (this.addressLine1 != null
            || this.addressLine2 != null
            || this.city != null
            || this.stateProvince != null
            || this.zipPostalCode != null
            || this.country != null
            || this.isoCountryCode != null
        ) {
            xml.writeStartElement("MAILADDRESS");

            xml.writeElement("ADDRESS1", this.addressLine1);
            xml.writeElement("ADDRESS2", this.addressLine2);
            xml.writeElement("CITY", this.city);
            xml.writeElement("STATE", this.stateProvince);
            xml.writeElement("ZIP", this.zipPostalCode);
            xml.writeElement("COUNTRY", this.country);
            xml.writeElement("COUNTRYCODE", this.isoCountryCode);

            xml.writeEndElement(); // MAILADDRESS
        }
    }
}
