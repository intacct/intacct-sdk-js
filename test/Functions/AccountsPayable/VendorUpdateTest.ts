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

import VendorUpdate from "../../../src/Functions/AccountsPayable/VendorUpdate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("VendorUpdate", () => {
    before((done) => {
        return done();
    });
    beforeEach((done) => {
        return done();
    });
    afterEach((done) => {
        return done();
    });
    after((done) => {
        return done();
    });
    it("should generate XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <VENDOR>
                <VENDORID>V1234</VENDORID>
                <DISPLAYCONTACT />
            </VENDOR>
        </update>
    </function>
</test>`;

        const record = new VendorUpdate();
        record.controlId = "unittest";
        record.vendorId = "V1234";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <VENDOR>
                <VENDORID>V1234</VENDORID>
                <NAME>SaaS Corp</NAME>
                <DISPLAYCONTACT>
                    <PRINTAS>SaaS Corporation</PRINTAS>
                    <COMPANYNAME>SaaS Corp.</COMPANYNAME>
                    <TAXABLE>true</TAXABLE>
                    <TAXGROUP>CA</TAXGROUP>
                    <PREFIX>Mr</PREFIX>
                    <FIRSTNAME>Bill</FIRSTNAME>
                    <LASTNAME>Smith</LASTNAME>
                    <INITIAL>G</INITIAL>
                    <PHONE1>12</PHONE1>
                    <PHONE2>34</PHONE2>
                    <CELLPHONE>56</CELLPHONE>
                    <PAGER>78</PAGER>
                    <FAX>90</FAX>
                    <EMAIL1>noreply@intacct.com</EMAIL1>
                    <EMAIL2>noreplyagain@intacct.com</EMAIL2>
                    <URL1>www.intacct.com</URL1>
                    <URL2>us.intacct.com</URL2>
                    <MAILADDRESS>
                        <ADDRESS1>300 Park Ave</ADDRESS1>
                        <ADDRESS2>Ste 1400</ADDRESS2>
                        <CITY>San Jose</CITY>
                        <STATE>CA</STATE>
                        <ZIP>95110</ZIP>
                        <COUNTRY>United States</COUNTRY>
                        <COUNTRYCODE>US</COUNTRYCODE>
                    </MAILADDRESS>
                </DISPLAYCONTACT>
                <ONETIME>false</ONETIME>
                <STATUS>active</STATUS>
                <HIDEDISPLAYCONTACT>false</HIDEDISPLAYCONTACT>
                <VENDTYPE>SaaS</VENDTYPE>
                <PARENTID>V5678</PARENTID>
                <GLGROUP>Group</GLGROUP>
                <TAXID>12-3456789</TAXID>
                <NAME1099>SAAS CORP</NAME1099>
                <FORM1099TYPE>MISC</FORM1099TYPE>
                <FORM1099BOX>3</FORM1099BOX>
                <SUPDOCID>A1234</SUPDOCID>
                <APACCOUNT>2000</APACCOUNT>
                <CREDITLIMIT>1234.56</CREDITLIMIT>
                <ONHOLD>false</ONHOLD>
                <DONOTCUTCHECK>false</DONOTCUTCHECK>
                <COMMENTS>my comment</COMMENTS>
                <CURRENCY>USD</CURRENCY>
                <CONTACTINFO>
                    <CONTACTNAME>primary</CONTACTNAME>
                </CONTACTINFO>
                <PAYTO>
                    <CONTACTNAME>pay to</CONTACTNAME>
                </PAYTO>
                <RETURNTO>
                    <CONTACTNAME>return to</CONTACTNAME>
                </RETURNTO>
                <PAYMETHODKEY>Printed Check</PAYMETHODKEY>
                <MERGEPAYMENTREQ>true</MERGEPAYMENTREQ>
                <PAYMENTNOTIFY>true</PAYMENTNOTIFY>
                <BILLINGTYPE>openitem</BILLINGTYPE>
                <PAYMENTPRIORITY>Normal</PAYMENTPRIORITY>
                <TERMNAME>N30</TERMNAME>
                <DISPLAYTERMDISCOUNT>false</DISPLAYTERMDISCOUNT>
                <ACHENABLED>true</ACHENABLED>
                <ACHBANKROUTINGNUMBER>123456789</ACHBANKROUTINGNUMBER>
                <ACHACCOUNTNUMBER>1111222233334444</ACHACCOUNTNUMBER>
                <ACHACCOUNTTYPE>Checking Account</ACHACCOUNTTYPE>
                <ACHREMITTANCETYPE>CTX</ACHREMITTANCETYPE>
                <VENDORACCOUNTNO>9999999</VENDORACCOUNTNO>
                <DISPLAYACCTNOCHECK>false</DISPLAYACCTNOCHECK>
                <OBJECTRESTRICTION>Restricted</OBJECTRESTRICTION>
                <RESTRICTEDLOCATIONS>100#~#200</RESTRICTEDLOCATIONS>
                <RESTRICTEDDEPARTMENTS>D100#~#D200</RESTRICTEDDEPARTMENTS>
                <CUSTOMFIELD1>Hello</CUSTOMFIELD1>
            </VENDOR>
        </update>
    </function>
</test>`;

        const record = new VendorUpdate();
        record.controlId = "unittest";
        record.vendorId = "V1234";
        record.vendorName = "SaaS Corp";
        record.printAs = "SaaS Corporation";
        record.companyName = "SaaS Corp.";
        record.taxable = true;
        record.taxId = "12-3456789";
        record.contactTaxGroupName = "CA";
        record.prefix = "Mr";
        record.firstName = "Bill";
        record.lastName = "Smith";
        record.middleName = "G";
        record.primaryPhoneNo = "12";
        record.secondaryPhoneNo = "34";
        record.cellularPhoneNo = "56";
        record.pagerNo = "78";
        record.faxNo = "90";
        record.primaryEmailAddress = "noreply@intacct.com";
        record.secondaryEmailAddress = "noreplyagain@intacct.com";
        record.primaryUrl = "www.intacct.com";
        record.secondaryUrl = "us.intacct.com";
        record.addressLine1 = "300 Park Ave";
        record.addressLine2 = "Ste 1400";
        record.city = "San Jose";
        record.stateProvince = "CA";
        record.zipPostalCode = "95110";
        record.country = "United States";
        record.isoCountryCode = "US";
        record.oneTime = false;
        record.active = true;
        record.excludedFromContactList = false;
        record.vendorTypeId = "SaaS";
        record.parentVendorId = "V5678";
        record.glGroupName = "Group";
        record.form1099Name = "SAAS CORP";
        record.form1099Type = "MISC";
        record.form1099Box = "3";
        record.attachmentsId = "A1234";
        record.defaultExpenseGlAccountNo = "2000";
        record.creditLimit = 1234.56;
        record.onHold = false;
        record.doNotPay = false;
        record.comments = "my comment";
        record.defaultCurrency = "USD";
        record.primaryContactName = "primary";
        record.payToContactName = "pay to";
        record.returnToContactName = "return to";
        record.preferredPaymentMethod = "Printed Check";
        record.mergePaymentRequests = true;
        record.sendAutomaticPaymentNotification = true;
        record.vendorBillingType = "openitem";
        record.paymentPriority = "Normal";
        record.paymentTerm = "N30";
        record.termDiscountDisplayedOnCheckStub = false;
        record.achEnabled = true;
        record.achBankRoutingNo = "123456789";
        record.achBankAccountNo = "1111222233334444";
        record.achBankAccountType = "Checking Account";
        record.achBankAccountClass = "CTX";
        record.vendorAccountNo = "9999999";
        record.locationAssignedAccountNoDisplayedOnCheckStub = false;
        record.restrictionType = "Restricted";
        record.restrictedLocations = [
            "100",
            "200",
        ];
        record.restrictedDepartments = [
            "D100",
            "D200",
        ];
        record.customFields = [
            [ "CUSTOMFIELD1", "Hello" ],
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
