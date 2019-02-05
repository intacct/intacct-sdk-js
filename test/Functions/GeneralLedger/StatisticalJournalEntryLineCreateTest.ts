/**
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

import CustomAllocationSplit from "../../../src/Functions/Company/CustomAllocationSplit";
import StatisticalJournalEntryLineCreate from "../../../src/Functions/GeneralLedger/StatisticalJournalEntryLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("StatisticalJournalEntryLineCreate", () => {
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
    it("should create a StatisticalJournalEntryLineCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <ACCOUNTNO />
        <TR_TYPE>1</TR_TYPE>
        <TRX_AMOUNT />
    </GLENTRY>
</test>`;

        const record = new StatisticalJournalEntryLineCreate();

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create a StatisticalJournalEntryLineCreate object with negative transaction amount as credit", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <ACCOUNTNO />
        <TR_TYPE>-1</TR_TYPE>
        <TRX_AMOUNT>100.01</TRX_AMOUNT>
    </GLENTRY>
</test>`;

        const record = new StatisticalJournalEntryLineCreate();
        record.amount = -100.01;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create a StatisticalJournalEntryLineCreate object with all fields given", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <DOCUMENT>212</DOCUMENT>
        <ACCOUNTNO>9000</ACCOUNTNO>
        <TR_TYPE>1</TR_TYPE>
        <TRX_AMOUNT>1456.54</TRX_AMOUNT>
        <LOCATION>100</LOCATION>
        <DEPARTMENT>ADM</DEPARTMENT>
        <PROJECTID>P100</PROJECTID>
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

        const record = new StatisticalJournalEntryLineCreate();
        record.documentNumber = "212";
        record.statAccountNumber = "9000";
        record.amount = 1456.54;
        record.locationId = "100";
        record.departmentId = "ADM";
        record.projectId = "P100";
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
    it("should create a StatisticalJournalEntryLineCreate object with allocation", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <ACCOUNTNO>9000</ACCOUNTNO>
        <TR_TYPE>1</TR_TYPE>
        <TRX_AMOUNT>1456.54</TRX_AMOUNT>
        <ALLOCATION>60-40</ALLOCATION>
    </GLENTRY>
</test>`;

        const record = new StatisticalJournalEntryLineCreate();
        record.statAccountNumber = "9000";
        record.amount = 1456.54;
        record.allocationId = "60-40";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create a StatisticalJournalEntryLineCreate object with custom allocation", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <GLENTRY>
        <ACCOUNTNO>9000</ACCOUNTNO>
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

        const record = new StatisticalJournalEntryLineCreate();
        record.statAccountNumber = "9000";
        record.amount = 1000.00;
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
