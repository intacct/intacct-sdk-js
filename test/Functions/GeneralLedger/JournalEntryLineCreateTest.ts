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

import CustomAllocationSplit from "../../../src/Functions/Company/CustomAllocationSplit";
import JournalEntryLineCreate from "../../../src/Functions/GeneralLedger/JournalEntryLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("JornalEntryLineCreate", () => {
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
    it("should create a JournalEntryLine object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <ACCOUNTNO />
        <TR_TYPE>1</TR_TYPE>
        <TRX_AMOUNT />
    </GLENTRY>
</test>`;

        const record = new JournalEntryLineCreate();

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create a JournalEntryLine object with negative transaction amount as credit", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <ACCOUNTNO />
        <TR_TYPE>-1</TR_TYPE>
        <TRX_AMOUNT>400.23</TRX_AMOUNT>
    </GLENTRY>
</test>`;

        const record = new JournalEntryLineCreate();
        record.transactionAmount = -400.23;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create a JournalEntryLine object with all fields given", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <DOCUMENT>212</DOCUMENT>
        <ACCOUNTNO>1010</ACCOUNTNO>
        <TR_TYPE>1</TR_TYPE>
        <TRX_AMOUNT>1456.54</TRX_AMOUNT>
        <CURRENCY>USD</CURRENCY>
        <EXCH_RATE_DATE>06/30/2016</EXCH_RATE_DATE>
        <EXCH_RATE_TYPE_ID>Intacct Daily Rate</EXCH_RATE_TYPE_ID>
        <LOCATION>100</LOCATION>
        <DEPARTMENT>ADM</DEPARTMENT>
        <PROJECTID>P100</PROJECTID>
        <TASKID>T123</TASKID>
        <CUSTOMERID>C100</CUSTOMERID>
        <VENDORID>V100</VENDORID>
        <EMPLOYEEID>E100</EMPLOYEEID>
        <ITEMID>I100</ITEMID>
        <CLASSID>C200</CLASSID>
        <CONTRACTID>C300</CONTRACTID>
        <WAREHOUSEID>W100</WAREHOUSEID>
        <DESCRIPTION>my memo</DESCRIPTION>
        <CUSTOM01>123</CUSTOM01>
    </GLENTRY>
</test>`;

        const record = new JournalEntryLineCreate();
        record.documentNumber = "212";
        record.glAccountNumber = "1010";
        record.transactionAmount = 1456.54;
        record.transactionCurrencyCode = "USD";
        record.exchangeRateDate = new Date("6/30/2016");
        record.exchangeRateType = "Intacct Daily Rate";
        record.locationId = "100";
        record.departmentId = "ADM";
        record.projectId = "P100";
        record.taskId = "T123";
        record.customerId = "C100";
        record.vendorId = "V100";
        record.employeeId = "E100";
        record.itemId = "I100";
        record.classId = "C200";
        record.contractId = "C300";
        record.warehouseId = "W100";
        record.memo = "my memo";
        record.customFields = [
            ["CUSTOM01", "123"],
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create a JournalEntryLine object with allocation", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <ACCOUNTNO>1010</ACCOUNTNO>
        <TR_TYPE>1</TR_TYPE>
        <TRX_AMOUNT>1456.54</TRX_AMOUNT>
        <ALLOCATION>60-40</ALLOCATION>
    </GLENTRY>
</test>`;

        const record = new JournalEntryLineCreate();
        record.glAccountNumber = "1010";
        record.transactionAmount = 1456.54;
        record.allocationId = "60-40";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create a JournalEntryLine object with custom allocation", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <ACCOUNTNO>1010</ACCOUNTNO>
        <TR_TYPE>1</TR_TYPE>
        <TRX_AMOUNT>1000</TRX_AMOUNT>
        <ALLOCATION>Custom</ALLOCATION>
        <SPLIT>
            <AMOUNT>600</AMOUNT>
        </SPLIT>
        <SPLIT>
            <AMOUNT>400</AMOUNT>
        </SPLIT>
    </GLENTRY>
</test>`;

        const record = new JournalEntryLineCreate();
        record.glAccountNumber = "1010";
        record.transactionAmount = 1000.00;
        record.allocationId = "Custom";

        const split1 = new CustomAllocationSplit();
        split1.amount = 600.00;

        const split2 = new CustomAllocationSplit();
        split2.amount = 400.00;

        record.customAllocationSplits = [
            split1,
            split2,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
