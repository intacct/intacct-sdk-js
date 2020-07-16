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

import TimesheetUpdate from "../../../src/Functions/Projects/TimesheetUpdate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";
import AbstractTimesheetEntry from "../../../src/Functions/Projects/AbstractTimesheetEntry";
import TimesheetEntryCreate from "../../../src/Functions/Projects/TimesheetEntryCreate";

describe("TimesheetUpdate", () => {
  before(done => {
    return done();
  });
  beforeEach(done => {
    return done();
  });
  afterEach(done => {
    return done();
  });
  after(done => {
    return done();
  });
  it("should build TimesheetUpdate object", () => {
    const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <TIMESHEET>
                <EMPLOYEEID>E1234</EMPLOYEEID>
                <BEGINDATE>06/30/2016</BEGINDATE>
                <TIMESHEETENTRIES>
                    <TIMESHEETENTRY>
                        <RECORDNO>1</RECORDNO>
                        <ENTRYDATE>06/30/2016</ENTRYDATE>
                        <QTY>5</QTY>
                    </TIMESHEETENTRY>
                </TIMESHEETENTRIES>
            </TIMESHEET>
        </update>
    </function>
</test>`;

    const record = new TimesheetUpdate();
    record.controlId = "unittest";
    record.employeeId = "E1234";
    record.beginDate = new Date("06/30/2016");
    const entry = new TimesheetEntryCreate(true);
    entry.recordNo = 1;
    entry.quantity = 5;
    entry.entryDate = new Date("06/30/2016");
    record.entries = [entry];
    XmlObjectTestHelper.CompareXml(expected, record);
  });
  it("should build update object for entries", () => {
    const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <TIMESHEETENTRY>
                <RECORDNO>1</RECORDNO>
                <ENTRYDATE>06/30/2016</ENTRYDATE>
                <QTY>5</QTY>
            </TIMESHEETENTRY>
            <TIMESHEETENTRY>
                <RECORDNO>2</RECORDNO>
                <ENTRYDATE>07/30/2016</ENTRYDATE>
                <QTY>6</QTY>
            </TIMESHEETENTRY>
        </update>
    </function>
</test>`;

    const record = new TimesheetUpdate(false);
    record.controlId = "unittest";
    const entry1 = new TimesheetEntryCreate(true);
    entry1.recordNo = 1;
    entry1.quantity = 5;
    entry1.entryDate = new Date("06/30/2016");
    const entry2 = new TimesheetEntryCreate(true);
    entry2.recordNo = 2;
    entry2.quantity = 6;
    entry2.entryDate = new Date("07/30/2016");
    record.entries = [entry1, entry2];
    XmlObjectTestHelper.CompareXml(expected, record);
  });
  it("should build TimesheetUpdate object with all fields", () => {
    const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <TIMESHEET>
                <EMPLOYEEID>E1234</EMPLOYEEID>
                <BEGINDATE>06/30/2016</BEGINDATE>
                <DESCRIPTION>desc</DESCRIPTION>
                <SUPDOCID>A1234</SUPDOCID>
                <STATE>Submitted</STATE>
                <customfield1>customvalue1</customfield1>
            </TIMESHEET>
        </update>
    </function>
</test>`;

    const record = new TimesheetUpdate();
    record.controlId = "unittest";
    record.employeeId = "E1234";
    record.beginDate = new Date("06/30/2016");
    record.description = "desc";
    record.attachmentsId = "A1234";
    record.action = "Submitted";
    record.customFields = [["customfield1", "customvalue1"]];
    XmlObjectTestHelper.CompareXml(expected, record);
  });
});
