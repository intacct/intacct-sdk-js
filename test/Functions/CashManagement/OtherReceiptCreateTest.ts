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

import OtherReceiptCreate from "../../../src/Functions/CashManagement/OtherReceiptCreate";
import OtherReceiptLineCreate from "../../../src/Functions/CashManagement/OtherReceiptLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("OtherReceiptCreate", () => {
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
        <record_otherreceipt>
            <paymentdate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </paymentdate>
            <payee>Costco</payee>
            <receiveddate>
                <year>2015</year>
                <month>07</month>
                <day>01</day>
            </receiveddate>
            <paymentmethod>Printed Check</paymentmethod>
            <undepglaccountno>1000</undepglaccountno>
            <receiptitems>
                <lineitem>
                    <glaccountno />
                    <amount>76343.43</amount>
                </lineitem>
            </receiptitems>
        </record_otherreceipt>
    </function>
</test>`;

        const record = new OtherReceiptCreate();
        record.controlId = "unittest";
        record.transactionDate = new Date("6/30/2015");
        record.payer = "Costco";
        record.receiptDate = new Date("7/1/2015");
        record.paymentMethod = "Printed Check";
        record.undepositedFundsGlAccountNo = "1000";

        const line1 = new OtherReceiptLineCreate();
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
        <record_otherreceipt>
            <paymentdate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </paymentdate>
            <payee>Costco</payee>
            <receiveddate>
                <year>2015</year>
                <month>07</month>
                <day>01</day>
            </receiveddate>
            <paymentmethod>Printed Check</paymentmethod>
            <bankaccountid>BA1234</bankaccountid>
            <depositdate>
                <year>2015</year>
                <month>07</month>
                <day>04</day>
            </depositdate>
            <refid>transno</refid>
            <description>my desc</description>
            <supdocid>A1234</supdocid>
            <currency>USD</currency>
            <exchratedate>
                <year>2015</year>
                <month>07</month>
                <day>04</day>
            </exchratedate>
            <exchratetype>Intacct Daily Rate</exchratetype>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <receiptitems>
                <lineitem>
                    <glaccountno />
                    <amount>76343.43</amount>
                </lineitem>
            </receiptitems>
        </record_otherreceipt>
    </function>
</test>`;

        const record = new OtherReceiptCreate();
        record.controlId = "unittest";
        record.transactionDate = new Date("6/30/2015");
        record.payer = "Costco";
        record.receiptDate = new Date("7/1/2015");
        record.paymentMethod = "Printed Check";
        record.bankAccountId = "BA1234";
        record.depositDate = new Date("7/4/2015");
        record.undepositedFundsGlAccountNo = "1000";
        record.transactionNo = "transno";
        record.description = "my desc";
        record.attachmentsId = "A1234";
        record.transactionCurrency = "USD";
        record.exchangeRateDate = new Date("7/4/2015");
        record.exchangeRateType = "Intacct Daily Rate";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const line1 = new OtherReceiptLineCreate();
        line1.transactionAmount = 76343.43;

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
