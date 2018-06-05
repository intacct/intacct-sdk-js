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

import ChargeCardTransactionLineCreate from "../../../src/Functions/CashManagement/ChargeCardTransactionLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ChargeCardTransactionLineCreate", () => {
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
    <ccpayitem>
        <glaccountno />
        <paymentamount>76343.43</paymentamount>
    </ccpayitem>
</test>`;

        const record = new ChargeCardTransactionLineCreate();
        record.transactionAmount = 76343.43;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <ccpayitem>
        <accountlabel>TestBill Account1</accountlabel>
        <description>Just another memo</description>
        <paymentamount>76343.43</paymentamount>
        <departmentid>Department1</departmentid>
        <locationid>Location1</locationid>
        <customerid>Customer1</customerid>
        <vendorid>Vendor1</vendorid>
        <employeeid>Employee1</employeeid>
        <projectid>Project1</projectid>
        <itemid>Item1</itemid>
        <classid>Class1</classid>
        <contractid>Contract1</contractid>
        <warehouseid>Warehouse1</warehouseid>
        <customfields>
            <customfield>
                <customfieldname>customfield1</customfieldname>
                <customfieldvalue>customvalue1</customfieldvalue>
            </customfield>
        </customfields>
    </ccpayitem>
</test>`;

        const record = new ChargeCardTransactionLineCreate();
        record.transactionAmount = 76343.43;
        record.accountLabel = "TestBill Account1";
        record.memo = "Just another memo";
        record.locationId = "Location1";
        record.departmentId = "Department1";
        record.projectId = "Project1";
        record.customerId = "Customer1";
        record.vendorId = "Vendor1";
        record.employeeId = "Employee1";
        record.itemId = "Item1";
        record.classId = "Class1";
        record.contractId = "Contract1";
        record.warehouseId = "Warehouse1";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
