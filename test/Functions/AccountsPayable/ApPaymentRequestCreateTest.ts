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

import ApPaymentRequestCreate from "../../../src/Functions/AccountsPayable/ApPaymentRequestCreate";
import ApPaymentRequestItem from "../../../src/Functions/AccountsPayable/ApPaymentRequestItem";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ApPaymentRequestCreate", () => {
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
        <create_paymentrequest>
            <bankaccountid>BA1143</bankaccountid>
            <vendorid>V0001</vendorid>
            <paymentmethod>Printed Check</paymentmethod>
            <paymentdate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </paymentdate>
            <paymentrequestitems>
                <paymentrequestitem>
                    <key>123</key>
                    <paymentamount>100.12</paymentamount>
                </paymentrequestitem>
            </paymentrequestitems>
        </create_paymentrequest>
    </function>
</test>`;

        const record = new ApPaymentRequestCreate();
        record.controlId = "unittest";
        record.bankAccountId = "BA1143";
        record.vendorId = "V0001";
        record.paymentMethod = "Printed Check";
        record.paymentDate = new Date("06/30/2015");

        const line1 = new ApPaymentRequestItem();
        line1.applyToRecordId = 123;
        line1.amountToApply = 100.12;

        record.applyToTransactions = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_paymentrequest>
            <bankaccountid>BA1143</bankaccountid>
            <vendorid>V0001</vendorid>
            <memo>Memo</memo>
            <paymentmethod>Printed Check</paymentmethod>
            <grouppayments>true</grouppayments>
            <paymentdate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </paymentdate>
            <paymentoption>vendorpref</paymentoption>
            <paymentrequestitems>
                <paymentrequestitem>
                    <key>123</key>
                    <paymentamount>100.12</paymentamount>
                    <credittoapply>8.12</credittoapply>
                    <discounttoapply>1.21</discounttoapply>
                </paymentrequestitem>
            </paymentrequestitems>
            <documentnumber>10000</documentnumber>
            <paymentdescription>Memo</paymentdescription>
            <paymentcontact>Jim Smith</paymentcontact>
        </create_paymentrequest>
    </function>
</test>`;

        const record = new ApPaymentRequestCreate();
        record.controlId = "unittest";
        record.bankAccountId = "BA1143";
        record.vendorId = "V0001";
        record.memo = "Memo";
        record.paymentMethod = "Printed Check";
        record.groupPayments = true;
        record.paymentDate = new Date("06/30/2015");
        record.mergeOption = "vendorpref";
        record.documentNo = "10000";
        record.notificationContactName = "Jim Smith";

        const line1 = new ApPaymentRequestItem();
        line1.applyToRecordId = 123;
        line1.amountToApply = 100.12;
        line1.creditToApply = 8.12;
        line1.discountToApply = 1.21;

        record.applyToTransactions = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
