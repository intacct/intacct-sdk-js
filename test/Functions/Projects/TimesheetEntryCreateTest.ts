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

import TimesheetEntryCreate from "../../../src/Functions/Projects/TimesheetEntryCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("TimesheetEntryCreate", () => {
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
    it("should build TimesheetEntryCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <TIMESHEETENTRY>
        <ENTRYDATE>06/30/2016</ENTRYDATE>
        <QTY />
    </TIMESHEETENTRY>
</test>`;

        const record = new TimesheetEntryCreate();
        record.entryDate = new Date("06/30/2016");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build TimesheetEntryCreate object with all fields", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <TIMESHEETENTRY>
        <ENTRYDATE>06/30/2016</ENTRYDATE>
        <QTY>1.75</QTY>
        <DESCRIPTION>desc</DESCRIPTION>
        <NOTES>my note</NOTES>
        <TASKKEY>1234</TASKKEY>
        <TASKID>100</TASKID>
        <TIMETYPE>Salary</TIMETYPE>
        <BILLABLE>true</BILLABLE>
        <EXTBILLRATE>200</EXTBILLRATE>
        <EXTCOSTRATE>175</EXTCOSTRATE>
        <DEPARTMENTID>ADM</DEPARTMENTID>
        <LOCATIONID>100</LOCATIONID>
        <PROJECTID>P100</PROJECTID>
        <CUSTOMERID>C100</CUSTOMERID>
        <VENDORID>V100</VENDORID>
        <ITEMID>I100</ITEMID>
        <CLASSID>C200</CLASSID>
        <CONTRACTID>C300</CONTRACTID>
        <WAREHOUSEID>W100</WAREHOUSEID>
        <COSTTYPEID>C101</COSTTYPEID>
        <customfield1>customvalue1</customfield1>
    </TIMESHEETENTRY>
</test>`;

        const record = new TimesheetEntryCreate();
        record.entryDate = new Date("06/30/2016");
        record.quantity = 1.75;
        record.description = "desc";
        record.notes = "my note";
        record.taskId = "100";
        record.taskRecordNo = 1234;
        record.timeTypeName = "Salary";
        record.billable = true;
        record.overrideBillingRate = 200;
        record.overrideLaborCostRate = 175;
        record.departmentId = "ADM";
        record.locationId = "100";
        record.projectId = "P100";
        record.customerId = "C100";
        record.vendorId = "V100";
        record.itemId = "I100";
        record.classId = "C200";
        record.contractId = "C300";
        record.warehouseId = "W100";
        record.costtypeId = "C101";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
