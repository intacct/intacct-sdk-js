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

import StatisticalAccountCreate from "../../../src/Functions/GeneralLedger/StatisticalAccountCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("StatisticalAcccountCreate", () => {
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
    it("should create an StatisticalAcccountCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <STATACCOUNT>
                <ACCOUNTNO>9000</ACCOUNTNO>
                <TITLE>hello world</TITLE>
                <ACCOUNTTYPE>forperiod</ACCOUNTTYPE>
            </STATACCOUNT>
        </create>
    </function>
</test>`;

        const record = new StatisticalAccountCreate();
        record.controlId = "unittest";
        record.accountNo = "9000";
        record.title = "hello world";
        record.reportType = "forperiod";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
