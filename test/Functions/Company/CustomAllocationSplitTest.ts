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
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("CustomAllocationSplit", () => {
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
    it("should build an CustomAllocationSplit object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <SPLIT>
        <AMOUNT>1000</AMOUNT>
    </SPLIT>
</test>`;

        const record = new CustomAllocationSplit();
        record.amount = 1000.00;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build CustomAllocationSplit object with all fields", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <SPLIT>
        <AMOUNT>1000</AMOUNT>
        <LOCATIONID>L100</LOCATIONID>
        <DEPARTMENTID>D120</DEPARTMENTID>
        <PROJECTID>P100</PROJECTID>
        <CUSTOMERID>C100</CUSTOMERID>
        <VENDORID>V100</VENDORID>
        <EMPLOYEEID>E100</EMPLOYEEID>
        <ITEMID>I100</ITEMID>
        <CLASSID>C200</CLASSID>
        <CONTRACTID>C302</CONTRACTID>
        <WAREHOUSEID>W100</WAREHOUSEID>
    </SPLIT>
</test>`;

        const record = new CustomAllocationSplit();
        record.amount = 1000.00;
        record.departmentId = "D120";
        record.locationId = "L100";
        record.projectId = "P100";
        record.customerId = "C100";
        record.vendorId = "V100";
        record.employeeId = "E100";
        record.itemId = "I100";
        record.classId = "C200";
        record.warehouseId = "W100";
        record.contractId = "C302";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
