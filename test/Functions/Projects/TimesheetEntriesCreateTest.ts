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

import TimesheetEntriesCreate from "../../../src/Functions/Projects/TimesheetEntriesCreate";
import TimesheetEntryCreate from "../../../src/Functions/Projects/TimesheetEntryCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("TimesheetEntriesCreate", () => {
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
  it("should build TimesheetEntriesCreate object", () => {
    const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <TIMESHEETENTRY>
                <ENTRYDATE>06/29/2016</ENTRYDATE>
                <QTY />
            </TIMESHEETENTRY>
            <TIMESHEETENTRY>
                <ENTRYDATE>06/30/2016</ENTRYDATE>
                <QTY />
            </TIMESHEETENTRY>
        </create>
    </function>
</test>`;

    const record = new TimesheetEntriesCreate();
    record.controlId = "unittest";
    const entry1 = new TimesheetEntryCreate();
    const entry2 = new TimesheetEntryCreate();
    entry1.entryDate = new Date("06/29/2016");
    entry2.entryDate = new Date("06/30/2016");
    record.entries = [entry1, entry2];

    XmlObjectTestHelper.CompareXml(expected, record);
  });
});
