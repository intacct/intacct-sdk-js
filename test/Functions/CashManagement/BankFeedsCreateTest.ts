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

import BankAccountTransactionRecord from "../../../src/Functions/CashManagement/BankAccountTransactionRecord";
import BankFeedsCreate from "../../../src/Functions/CashManagement/BankFeedsCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("BankFeedsCreate", () => {
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
        <create>
            <BANKACCTTXNFEED>
                <FINANCIALENTITY>BA1145</FINANCIALENTITY>
                <FEEDDATE>
                    <year>2015</year>
                    <month>06</month>
                    <day>30</day>
                </FEEDDATE>
                <FEEDTYPE>onl</FEEDTYPE>
            </BANKACCTTXNFEED>
        </create>
    </function>
</test>`;

        const record = new BankFeedsCreate();
        record.controlId = "unittest";
        record.financialEntity = "BA1145";
        record.feedDate = new Date("6/30/2015");
        record.feedType = "onl";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <BANKACCTTXNFEED>
                <FINANCIALENTITY>BA1145</FINANCIALENTITY>
                <FEEDDATE>
                    <year>2015</year>
                    <month>06</month>
                    <day>30</day>
                </FEEDDATE>
                <FEEDTYPE>xml</FEEDTYPE>
                <BANKACCTTXNRECORDS>
                    <BANKACCTTXNRECORD>
                        <TRANSACTIONID>6728</TRANSACTIONID>
                        <POSTINGDATE>
                            <year>2015</year>
                            <month>06</month>
                            <day>30</day>
                        </POSTINGDATE>
                        <TRANSACTIONTYPE>charge</TRANSACTIONTYPE>
                        <DOCTYPE>Invoice</DOCTYPE>
                        <DOCNO>504</DOCNO>
                        <PAYEE>Jeff</PAYEE>
                        <AMOUNT>3.55</AMOUNT>
                        <DESCRIPTION>memo</DESCRIPTION>
                        <CURRENCY>USD</CURRENCY>
                    </BANKACCTTXNRECORD>
                </BANKACCTTXNRECORDS>
            </BANKACCTTXNFEED>
        </create>
    </function>
</test>`;

        const record = new BankFeedsCreate();
        record.controlId = "unittest";
        record.financialEntity = "BA1145";
        record.feedDate = new Date("6/30/2015");
        record.feedType = "xml";

        const txnRecords = new BankAccountTransactionRecord();
        txnRecords.transactionId = 6728;
        txnRecords.postingDate = new Date("6/30/2015");
        txnRecords.transactionType = "charge";
        txnRecords.docType = "Invoice";
        txnRecords.docNo = "504";
        txnRecords.payee = "Jeff";
        txnRecords.amount = 3.55;
        txnRecords.description = "memo";
        txnRecords.currency = "USD";

        record.bankAccountTxnRecords = [
            txnRecords,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
