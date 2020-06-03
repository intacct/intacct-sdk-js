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

import ReimbursementRequestCreate from "../../../src/Functions/EmployeeExpense/ReimbursementRequestCreate";
import ReimbursementRequestItem from "../../../src/Functions/EmployeeExpense/ReimbursementRequestItem";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ReimbursementRequestCreate", () => {
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
    it("should build ReimbursementRequestCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_reimbursementrequest>
            <bankaccountid>BA1143</bankaccountid>
            <employeeid>E0001</employeeid>
            <paymentmethod>Printed Check</paymentmethod>
            <paymentdate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </paymentdate>
            <eppaymentrequestitems>
                <eppaymentrequestitem>
                    <key>123</key>
                    <paymentamount>100.12</paymentamount>
                </eppaymentrequestitem>
            </eppaymentrequestitems>
        </create_reimbursementrequest>
    </function>
</test>`;

        const record = new ReimbursementRequestCreate();
        record.controlId = "unittest";
        record.bankAccountId = "BA1143";
        record.employeeId = "E0001";
        record.paymentMethod = "Printed Check";
        record.paymentDate = new Date(2015, 5, 30);

        const line1 = new ReimbursementRequestItem();
        line1.applyToRecordId = 123;
        line1.amountToApply = 100.12;

        record.applyToTransactions = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
