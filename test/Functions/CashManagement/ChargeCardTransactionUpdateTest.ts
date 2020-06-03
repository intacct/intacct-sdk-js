/*
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

import ChargeCardTransactionLineUpdate from "../../../src/Functions/CashManagement/ChargeCardTransactionLineUpdate";
import ChargeCardTransactionUpdate from "../../../src/Functions/CashManagement/ChargeCardTransactionUpdate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ChargeCardTransactionUpdate", () => {
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
        <update_cctransaction key="1234" />
    </function>
</test>`;

        const record = new ChargeCardTransactionUpdate();
        record.controlId = "unittest";
        record.recordNo = 1234;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update_cctransaction key="1234">
            <paymentdate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </paymentdate>
            <referenceno>321</referenceno>
            <payee>Costco</payee>
            <description>Supplies</description>
            <supdocid>A1234</supdocid>
            <currency>USD</currency>
            <exchratedate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </exchratedate>
            <exchratetype>Intacct Daily Rate</exchratetype>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <updateccpayitems>
                <updateccpayitem line_num="1">
                    <paymentamount>76343.43</paymentamount>
                </updateccpayitem>
            </updateccpayitems>
        </update_cctransaction>
    </function>
</test>`;

        const record = new ChargeCardTransactionUpdate();
        record.controlId = "unittest";
        record.recordNo = 1234;
        record.transactionDate = new Date("6/30/2015");
        record.referenceNumber = "321";
        record.payee = "Costco";
        record.description = "Supplies";
        record.attachmentsId = "A1234";
        record.transactionCurrency = "USD";
        record.exchangeRateDate = new Date("06/30/2015");
        record.exchangeRateType = "Intacct Daily Rate";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const line1 = new ChargeCardTransactionLineUpdate();
        line1.lineNo = 1;
        line1.transactionAmount = 76343.43;

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
