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

import BillLineUpdate from "../../../src/Functions/AccountsPayable/BillLineUpdate";
import BillUpdate from "../../../src/Functions/AccountsPayable/BillUpdate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("BillUpdate", () => {
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
        <update_bill key="1234" />
    </function>
</test>`;

        const record = new BillUpdate();
        record.controlId = "unittest";
        record.recordNo = 1234;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update_bill key="20394" externalkey="true">
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
            <billno>234</billno>
            <ponumber>234235</ponumber>
            <onhold>true</onhold>
            <description>Some description</description>
            <payto>
                <contactname>28952</contactname>
            </payto>
            <returnto>
                <contactname>289533</contactname>
            </returnto>
            <currency>USD</currency>
            <exchratedate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </exchratedate>
            <exchratetype>Intacct Daily Rate</exchratetype>
            <supdocid>6942</supdocid>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <updatebillitems>
                <updatelineitem line_num="1">
                    <amount>76343.43</amount>
                </updatelineitem>
            </updatebillitems>
        </update_bill>
    </function>
</test>`;

        const record = new BillUpdate();
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

        const line1 = new BillLineUpdate();
        line1.lineNo = 1;
        line1.transactionAmount = 76343.43;

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
