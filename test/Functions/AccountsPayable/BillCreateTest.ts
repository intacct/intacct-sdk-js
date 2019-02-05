/*
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

import BillCreate from "../../../src/Functions/AccountsPayable/BillCreate";
import BillLineCreate from "../../../src/Functions/AccountsPayable/BillLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("BillCreate", () => {
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
        <create_bill>
            <vendorid>VENDOR1</vendorid>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <termname>N30</termname>
            <billitems>
                <lineitem>
                    <glaccountno />
                    <amount>76343.43</amount>
                </lineitem>
            </billitems>
        </create_bill>
    </function>
</test>`;

        const record = new BillCreate();
        record.controlId = "unittest";
        record.vendorId = "VENDOR1";
        record.transactionDate = new Date("6/30/2015");
        record.paymentTerm = "N30";

        const line1 = new BillLineCreate();
        line1.transactionAmount = 76343.43;

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_bill>
            <vendorid>VENDOR1</vendorid>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <dateposted>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </dateposted>
            <datedue>
                <year>2020</year>
                <month>09</month>
                <day>24</day>
            </datedue>
            <termname>N30</termname>
            <action>Submit</action>
            <batchkey>20323</batchkey>
            <billno>234</billno>
            <ponumber>234235</ponumber>
            <onhold>true</onhold>
            <description>Some description</description>
            <externalid>20394</externalid>
            <payto>
                <contactname>28952</contactname>
            </payto>
            <returnto>
                <contactname>289533</contactname>
            </returnto>
            <basecurr>USD</basecurr>
            <currency>USD</currency>
            <exchratedate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </exchratedate>
            <exchratetype>Intacct Daily Rate</exchratetype>
            <nogl>false</nogl>
            <supdocid>6942</supdocid>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <billitems>
                <lineitem>
                    <glaccountno />
                    <amount>76343.43</amount>
                </lineitem>
            </billitems>
        </create_bill>
    </function>
</test>`;

        const record = new BillCreate();
        record.controlId = "unittest";
        record.vendorId = "VENDOR1";
        record.transactionDate = new Date("6/30/2015");
        record.glPostingDate = new Date("6/30/2015");
        record.dueDate = new Date("9/24/2020");
        record.paymentTerm = "N30";
        record.action = "Submit";
        record.summaryRecordNo = 20323;
        record.billNumber = "234";
        record.referenceNumber = "234235";
        record.onHold = true;
        record.description = "Some description";
        record.externalId = "20394";
        record.payToContactName = "28952";
        record.returnToContactName = "289533";
        record.baseCurrency = "USD";
        record.transactionCurrency = "USD";
        record.exchangeRateDate = new Date("06/30/2015");
        record.exchangeRateType = "Intacct Daily Rate";
        record.doNotPostToGl = false;
        record.attachmentsId = "6942";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const line1 = new BillLineCreate();
        line1.transactionAmount = 76343.43;

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
