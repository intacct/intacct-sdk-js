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

import CustomerCreate from "../../../src/Functions/AccountsReceivable/CustomerCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("CustomerCreate", () => {
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
    it("should create Customer with minimal parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <CUSTOMER>
                <NAME>SaaS Corp</NAME>
                <DISPLAYCONTACT>
                    <PRINTAS>SaaS Corporation</PRINTAS>
                </DISPLAYCONTACT>
            </CUSTOMER>
        </create>
    </function>
</test>`;

        const record = new CustomerCreate();
        record.controlId = "unittest";
        record.customerName = "SaaS Corp";
        record.printAs = "SaaS Corporation";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create Customer with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <CUSTOMER>
                <CUSTOMERID>C1234</CUSTOMERID>
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
                <CUSTTYPE>SaaS</CUSTTYPE>
                <CUSTREPID>S293</CUSTREPID>
                <PARENTID>C5678</PARENTID>
                <GLGROUP>Group</GLGROUP>
                <TERRITORYID>NE</TERRITORYID>
                <SUPDOCID>A1234</SUPDOCID>
                <TERMNAME>N30</TERMNAME>
                <OFFSETGLACCOUNTNO>1200</OFFSETGLACCOUNTNO>
                <ARACCOUNT>4000</ARACCOUNT>
                <SHIPPINGMETHOD>USPS</SHIPPINGMETHOD>
                <RESALENO>123</RESALENO>
                <TAXID>12-3456789</TAXID>
                <CREDITLIMIT>1234.56</CREDITLIMIT>
                <ONHOLD>false</ONHOLD>
                <DELIVERYOPTIONS>Print</DELIVERYOPTIONS>
                <CUSTMESSAGEID>hello</CUSTMESSAGEID>
                <COMMENTS>my comment</COMMENTS>
                <CURRENCY>USD</CURRENCY>
                <ARINVOICEPRINTTEMPLATEID>temp1</ARINVOICEPRINTTEMPLATEID>
                <OEQUOTEPRINTTEMPLATEID>temp2</OEQUOTEPRINTTEMPLATEID>
                <OEORDERPRINTTEMPLATEID>temp3</OEORDERPRINTTEMPLATEID>
                <OELISTPRINTTEMPLATEID>temp4</OELISTPRINTTEMPLATEID>
                <OEINVOICEPRINTTEMPLATEID>temp5</OEINVOICEPRINTTEMPLATEID>
                <OEADJPRINTTEMPLATEID>temp6</OEADJPRINTTEMPLATEID>
                <OEOTHERPRINTTEMPLATEID>temp7</OEOTHERPRINTTEMPLATEID>
                <CONTACTINFO>
                    <CONTACTNAME>primary</CONTACTNAME>
                </CONTACTINFO>
                <BILLTO>
                    <CONTACTNAME>bill to</CONTACTNAME>
                </BILLTO>
                <SHIPTO>
                    <CONTACTNAME>ship to</CONTACTNAME>
                </SHIPTO>
                <OBJECTRESTRICTION>Restricted</OBJECTRESTRICTION>
                <RESTRICTEDLOCATIONS>100#~#200</RESTRICTEDLOCATIONS>
                <RESTRICTEDDEPARTMENTS>D100#~#D200</RESTRICTEDDEPARTMENTS>
                <CUSTOMFIELD1>Hello</CUSTOMFIELD1>
            </CUSTOMER>
        </create>
    </function>
</test>`;

        const record = new CustomerCreate();
        record.controlId = "unittest";
        record.customerId = "C1234";
        record.customerName = "SaaS Corp";
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
        record.customerTypeId = "SaaS";
        record.salesRepEmployeeId = "S293";
        record.parentCustomerId = "C5678";
        record.glGroupName = "Group";
        record.territoryId = "NE";
        record.attachmentsId = "A1234";
        record.paymentTerm = "N30";
        record.offsetArGlAccountNo = "1200";
        record.defaultRevenueGlAccountNo = "4000";
        record.shippingMethod = "USPS";
        record.resaleNumber = "123";
        record.creditLimit = 1234.56;
        record.onHold = false;
        record.deliveryMethod = "Print";
        record.defaultInvoiceMessage = "hello";
        record.comments = "my comment";
        record.defaultCurrency = "USD";
        record.printOptionArInvoiceTemplateName = "temp1";
        record.printOptionOeQuoteTemplateName = "temp2";
        record.printOptionOeOrderTemplateName = "temp3";
        record.printOptionOeListTemplateName = "temp4";
        record.printOptionOeInvoiceTemplateName = "temp5";
        record.printOptionOeAdjustmentTemplateName = "temp6";
        record.printOptionOeOtherTemplateName = "temp7";
        record.primaryContactName = "primary";
        record.billToContactName = "bill to";
        record.shipToContactName = "ship to";
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
