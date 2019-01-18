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

import ArAdjustmentLineCreate from "../../../src/Functions/AccountsReceivable/ArAdjustmentLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ArAdjustmentLineCreate", () => {
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
    <lineitem>
        <glaccountno />
        <amount>76343.43</amount>
    </lineitem>
</test>`;

        const record = new ArAdjustmentLineCreate();
        record.transactionAmount = 76343.43;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <lineitem>
        <accountlabel>TestBill Account1</accountlabel>
        <offsetglaccountno>93590253</offsetglaccountno>
        <amount>76343.43</amount>
        <memo>Just another memo</memo>
        <locationid>Location1</locationid>
        <departmentid>Department1</departmentid>
        <key>1234</key>
        <totalpaid>23484.93</totalpaid>
        <totaldue>0</totaldue>
        <customfields>
            <customfield>
                <customfieldname>customfield1</customfieldname>
                <customfieldvalue>customvalue1</customfieldvalue>
            </customfield>
        </customfields>
        <projectid>Project1</projectid>
        <customerid>Customer1</customerid>
        <vendorid>Vendor1</vendorid>
        <employeeid>Employee1</employeeid>
        <itemid>Item1</itemid>
        <classid>Class1</classid>
        <warehouseid>Warehouse1</warehouseid>
    </lineitem>
</test>`;

        const record = new ArAdjustmentLineCreate();
        record.accountLabel = "TestBill Account1";
        record.offsetGlAccountNumber = "93590253";
        record.transactionAmount = 76343.43;
        record.memo = "Just another memo";
        record.key = 1234;
        record.totalPaid = 23484.93;
        record.totalDue = 0.0;
        record.locationId = "Location1";
        record.departmentId = "Department1";
        record.projectId = "Project1";
        record.customerId = "Customer1";
        record.vendorId = "Vendor1";
        record.employeeId = "Employee1";
        record.itemId = "Item1";
        record.classId = "Class1";
        record.warehouseId = "Warehouse1";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
