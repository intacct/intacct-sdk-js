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

import TransactionSubtotalCreate from "../../../src/Functions/InventoryControl/TransactionSubtotalCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("TransactionSubtotalCreate", () => {
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
    it("should build default XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <subtotal>
        <description>Subtotal Description</description>
        <total>2340</total>
    </subtotal>
</test>`;

        const record = new TransactionSubtotalCreate();
        record.description = "Subtotal Description";
        record.total = 2340;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build all XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <subtotal>
        <description>Subtotal Description</description>
        <total>4202</total>
        <percentval>9.2</percentval>
        <locationid>2355</locationid>
        <departmentid>RCVNG</departmentid>
        <projectid>FOW</projectid>
        <customerid>CUST5893</customerid>
        <vendorid>VEN53222</vendorid>
        <employeeid>EM5925</employeeid>
        <classid>CLS322</classid>
        <itemid>I5266235</itemid>
        <contractid>C23662</contractid>
        <customfields>
            <customfield>
                <customfieldname>customfield1</customfieldname>
                <customfieldvalue>customvalue1</customfieldvalue>
            </customfield>
        </customfields>
    </subtotal>
</test>`;

        const record = new TransactionSubtotalCreate();
        record.description = "Subtotal Description";
        record.total = 4202;
        record.percentageValue = 9.2;
        record.locationId = "2355";
        record.departmentId = "RCVNG";
        record.projectId = "FOW";
        record.customerId = "CUST5893";
        record.vendorId = "VEN53222";
        record.employeeId = "EM5925";
        record.classId = "CLS322";
        record.itemId = "I5266235";
        record.contractId = "C23662";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
