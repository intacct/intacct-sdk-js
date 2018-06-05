/*
 * Copyright 2018 Sage Intacct, Inc.
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

import ExpenseReportCreate from "../../../src/Functions/EmployeeExpense/ExpenseReportCreate";
import ExpenseReportLineCreate from "../../../src/Functions/EmployeeExpense/ExpenseReportLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ExpenseReportCreate", () => {
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
    it("should build ExpenseReportCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_expensereport>
            <employeeid>E0001</employeeid>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <expenses>
                <expense>
                    <glaccountno />
                </expense>
            </expenses>
        </create_expensereport>
    </function>
</test>`;

        const record = new ExpenseReportCreate();
        record.controlId = "unittest";
        record.employeeId = "E0001";
        record.transactionDate = new Date("06/30/2015");

        const line1 = new ExpenseReportLineCreate();

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build ExpenseReportCreate object with all fields", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_expensereport>
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
            <expensereportno>ER001</expensereportno>
            <state>Submitted</state>
            <description>For hotel</description>
            <memo>Memo</memo>
            <externalid>122</externalid>
            <basecurr>USD</basecurr>
            <currency>USD</currency>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <supdocid>AT122</supdocid>
            <expenses>
                <expense>
                    <glaccountno />
                </expense>
            </expenses>
        </create_expensereport>
    </function>
</test>`;

        const record = new ExpenseReportCreate();
        record.controlId = "unittest";
        record.employeeId = "E0001";
        record.transactionDate = new Date("06/30/2015");
        record.glPostingDate = new Date(2015, 5, 30);
        record.summaryRecordNo = 123;
        record.expenseReportNumber = "ER001";
        record.action = "Submitted";
        record.reasonForExpense = "For hotel";
        record.memo = "Memo";
        record.externalId = "122";
        record.baseCurrency = "USD";
        record.reimbursementCurrency = "USD";
        record.attachmentsId = "AT122";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const line1 = new ExpenseReportLineCreate();

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
