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

import ExpenseAdjustmentCreate from "../../../src/Functions/EmployeeExpense/ExpenseAdjustmentCreate";
import ExpenseAdjustmentLineCreate from "../../../src/Functions/EmployeeExpense/ExpenseAdjustmentLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ExpenseAdjustmentCreate", () => {
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
    it("should build ExpenseAdjustmentCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_expenseadjustmentreport>
            <employeeid>E0001</employeeid>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <expenseadjustments>
                <expenseadjustment>
                    <glaccountno />
                    <amount />
                </expenseadjustment>
            </expenseadjustments>
        </create_expenseadjustmentreport>
    </function>
</test>`;

        const record = new ExpenseAdjustmentCreate();
        record.controlId = "unittest";
        record.employeeId = "E0001";
        record.transactionDate = new Date("06/30/2015");

        const line1 = new ExpenseAdjustmentLineCreate();

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build ExpenseAdjustmentCreate object with all fields", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_expenseadjustmentreport>
            <employeeid>E0001</employeeid>
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
            <batchkey>123</batchkey>
            <adjustmentno>ADJ001</adjustmentno>
            <docnumber>EXP001</docnumber>
            <description>For hotel</description>
            <basecurr>USD</basecurr>
            <currency>USD</currency>
            <expenseadjustments>
                <expenseadjustment>
                    <glaccountno />
                    <amount />
                </expenseadjustment>
            </expenseadjustments>
            <supdocid>AT122</supdocid>
        </create_expenseadjustmentreport>
    </function>
</test>`;

        const record = new ExpenseAdjustmentCreate();
        record.controlId = "unittest";
        record.employeeId = "E0001";
        record.transactionDate = new Date("06/30/2015");
        record.glPostingDate = new Date(2015, 5, 30);
        record.summaryRecordNo = 123;
        record.expenseAdjustmentNumber = "ADJ001";
        record.expenseReportNumber = "EXP001";
        record.description = "For hotel";
        record.baseCurrency = "USD";
        record.reimbursementCurrency = "USD";
        record.attachmentsId = "AT122";

        const line1 = new ExpenseAdjustmentLineCreate();

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
