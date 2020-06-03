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

import ArAdjustmentCreate from "../../../src/Functions/AccountsReceivable/ArAdjustmentCreate";
import ArAdjustmentLineCreate from "../../../src/Functions/AccountsReceivable/ArAdjustmentLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ArAdjustmentCreate", () => {
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
        <create_aradjustment>
            <customerid>CUSTOMER1</customerid>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <aradjustmentitems>
                <lineitem>
                    <glaccountno />
                    <amount>76343.43</amount>
                </lineitem>
            </aradjustmentitems>
        </create_aradjustment>
    </function>
</test>`;

        const record = new ArAdjustmentCreate();
        record.controlId = "unittest";
        record.customerId = "CUSTOMER1";
        record.transactionDate = new Date("6/30/2015");

        const line1 = new ArAdjustmentLineCreate();
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
        <create_aradjustment>
            <customerid>CUSTOMER1</customerid>
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
            <batchkey>20323</batchkey>
            <adjustmentno>234</adjustmentno>
            <action>Submit</action>
            <invoiceno>234235</invoiceno>
            <description>Some description</description>
            <externalid>20394</externalid>
            <basecurr>USD</basecurr>
            <currency>USD</currency>
            <exchratedate>
                <year>2016</year>
                <month>06</month>
                <day>30</day>
            </exchratedate>
            <exchratetype>Intacct Daily Rate</exchratetype>
            <nogl>false</nogl>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <aradjustmentitems>
                <lineitem>
                    <glaccountno />
                    <amount>76343.43</amount>
                </lineitem>
            </aradjustmentitems>
        </create_aradjustment>
    </function>
</test>`;

        const record = new ArAdjustmentCreate();
        record.controlId = "unittest";
        record.customerId = "CUSTOMER1";
        record.transactionDate = new Date("6/30/2015");
        record.glPostingDate = new Date("6/30/2015");
        record.summaryRecordNo = 20323;
        record.adjustmentNumber = "234";
        record.action = "Submit";
        record.invoiceNumber = "234235";
        record.description = "Some description";
        record.externalId = "20394";
        record.baseCurrency = "USD";
        record.transactionCurrency = "USD";
        record.exchangeRateDate = new Date("06/30/2016");
        record.exchangeRateType = "Intacct Daily Rate";
        record.doNotPostToGl = false;
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const line1 = new ArAdjustmentLineCreate();
        line1.transactionAmount = 76343.43;

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
