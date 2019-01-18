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

import DepositCreate from "../../../src/Functions/CashManagement/DepositCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("DepositCreate", () => {
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
        <record_deposit>
            <bankaccountid>BA1145</bankaccountid>
            <depositdate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </depositdate>
            <depositid>Deposit Slip 2015-06-30</depositid>
            <receiptkeys>
                <receiptkey>1234</receiptkey>
            </receiptkeys>
        </record_deposit>
    </function>
</test>`;

        const record = new DepositCreate();
        record.controlId = "unittest";
        record.bankAccountId = "BA1145";
        record.depositDate = new Date("6/30/2015");
        record.depositSlipId = "Deposit Slip 2015-06-30";
        record.transactionKeysToDeposit = [
            1234,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <record_deposit>
            <bankaccountid>BA1145</bankaccountid>
            <depositdate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </depositdate>
            <depositid>Deposit Slip 2015-06-30</depositid>
            <receiptkeys>
                <receiptkey>1234</receiptkey>
            </receiptkeys>
            <description>Desc</description>
            <supdocid>AT111</supdocid>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
        </record_deposit>
    </function>
</test>`;

        const record = new DepositCreate();
        record.controlId = "unittest";
        record.bankAccountId = "BA1145";
        record.depositDate = new Date("6/30/2015");
        record.depositSlipId = "Deposit Slip 2015-06-30";
        record.description = "Desc";
        record.attachmentsId = "AT111";
        record.transactionKeysToDeposit = [
            1234,
        ];
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
