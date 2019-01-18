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

import TransactionItemDetail from "../../../src/Functions/InventoryControl/TransactionItemDetail";
import OrderEntryTransactionLineCreate from "../../../src/Functions/OrderEntry/OrderEntryTransactionLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("OrderEntryTransactionLineCreate", () => {
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
    <sotransitem>
        <itemid>26323</itemid>
        <quantity>2340</quantity>
    </sotransitem>
</test>`;

        const record = new OrderEntryTransactionLineCreate();
        record.itemId = "26323";
        record.quantity = 2340;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build all XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <sotransitem>
        <bundlenumber>092304</bundlenumber>
        <itemid>26323</itemid>
        <itemdesc>Item Description</itemdesc>
        <taxable>true</taxable>
        <warehouseid>93294</warehouseid>
        <quantity>2340</quantity>
        <unit>593</unit>
        <discountpercent>10.05</discountpercent>
        <price>32.35</price>
        <discsurchargememo>None</discsurchargememo>
        <locationid>SF</locationid>
        <departmentid>Receiving</departmentid>
        <memo>Memo</memo>
        <itemdetails>
            <itemdetail>
                <quantity>52</quantity>
                <lotno>3243</lotno>
            </itemdetail>
        </itemdetails>
        <customfields>
            <customfield>
                <customfieldname>customfield1</customfieldname>
                <customfieldvalue>customvalue1</customfieldvalue>
            </customfield>
        </customfields>
        <revrectemplate>template</revrectemplate>
        <revrecstartdate>
            <year>2015</year>
            <month>06</month>
            <day>30</day>
        </revrecstartdate>
        <revrecenddate>
            <year>2015</year>
            <month>07</month>
            <day>31</day>
        </revrecenddate>
        <renewalmacro>Quarterly</renewalmacro>
        <projectid>235</projectid>
        <customerid>23423434</customerid>
        <vendorid>797656</vendorid>
        <employeeid>90295</employeeid>
        <classid>243609</classid>
        <contractid>9062</contractid>
        <fulfillmentstatus>Complete</fulfillmentstatus>
        <taskno>9850</taskno>
        <billingtemplate>3525</billingtemplate>
    </sotransitem>
</test>`;

        const record = new OrderEntryTransactionLineCreate();
        record.bundleNumber = "092304";
        record.itemId = "26323";
        record.itemDescription = "Item Description";
        record.taxable = true;
        record.warehouseId = "93294";
        record.quantity = 2340;
        record.unit = "593";
        record.discountPercent = 10.05;
        record.price = 32.35;
        record.discountSurchargeMemo = "None";
        record.memo = "Memo";
        record.revRecTemplate = "template";
        record.revRecStartDate = new Date(2015, 5, 30);
        record.revRecEndDate = new Date(2015, 6, 31);
        record.renewalMacro = "Quarterly";
        record.fulfillmentStatus = "Complete";
        record.taskNumber = "9850";
        record.billingTemplate = "3525";
        record.locationId = "SF";
        record.departmentId = "Receiving";
        record.projectId = "235";
        record.customerId = "23423434";
        record.vendorId = "797656";
        record.employeeId = "90295";
        record.classId = "243609";
        record.contractId = "9062";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const detail1 = new TransactionItemDetail();
        detail1.quantity = 52;
        detail1.lotNumber = "3243";
        record. itemDetails = [
            detail1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
