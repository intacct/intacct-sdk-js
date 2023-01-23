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

import TimesheetCreate from "../../../src/Functions/Projects/TimesheetCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";
import TimesheetEntryCreate from "../../../src/Functions/Projects/TimesheetEntryCreate";

describe("TimesheetCreate", () => {
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
    it("should build TimesheetCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <TIMESHEET>
                <EMPLOYEEID>E1234</EMPLOYEEID>
                <BEGINDATE>06/30/2016</BEGINDATE>
                <TIMESHEETENTRIES>
                    <TIMESHEETENTRY>
                        <ENTRYDATE>06/30/2016</ENTRYDATE>
                        <QTY>1.75</QTY>
                    </TIMESHEETENTRY>
                </TIMESHEETENTRIES>
            </TIMESHEET>
        </create>
    </function>
</test>`;

        const record = new TimesheetCreate();
        record.controlId = "unittest";
        record.employeeId = "E1234";
        record.beginDate = new Date("06/30/2016");

        const entry1 = new TimesheetEntryCreate();
        entry1.entryDate = new Date("06/30/2016");
        entry1.quantity = 1.75;

        record.entries = [
            entry1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build TimesheetCreate object with all fields", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <TIMESHEET>
                <EMPLOYEEID>E1234</EMPLOYEEID>
                <BEGINDATE>06/30/2016</BEGINDATE>
                <DESCRIPTION>desc</DESCRIPTION>
                <SUPDOCID>A1234</SUPDOCID>
                <STATE>Submitted</STATE>
                <TIMESHEETENTRIES>
                    <TIMESHEETENTRY>
                        <ENTRYDATE>06/30/2016</ENTRYDATE>
                        <QTY>1.75</QTY>
                    </TIMESHEETENTRY>
                </TIMESHEETENTRIES>
                <customfield1>customvalue1</customfield1>
            </TIMESHEET>
        </create>
    </function>
</test>`;

        const record = new TimesheetCreate();
        record.controlId = "unittest";
        record.employeeId = "E1234";
        record.beginDate = new Date("06/30/2016");
        record.description = "desc";
        record.attachmentsId = "A1234";
        record.action = "Submitted"
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const entry1 = new TimesheetEntryCreate();
        entry1.entryDate = new Date("06/30/2016");
        entry1.quantity = 1.75;

        record.entries = [
            entry1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
