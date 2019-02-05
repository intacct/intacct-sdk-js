/*
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

import ContractLineResume from "../../../src/Functions/ContractsRevMgmt/ContractLineResume";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ContractLineResume", () => {
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
    it("should build ContractLineResume object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <resume>
            <CONTRACTDETAIL>
                <RECORDNO>123</RECORDNO>
                <ASOFDATE>07/31/2017</ASOFDATE>
                <BILLING>true</BILLING>
                <REVENUE>true</REVENUE>
                <EXPENSE>true</EXPENSE>
            </CONTRACTDETAIL>
        </resume>
    </function>
</test>`;

        const record = new ContractLineResume();
        record.controlId = "unittest";
        record.recordNo = 123;
        record.asOfDate = new Date("07/31/2017");
        record.resumeBilling = true;
        record.resumeRevenue = true;
        record.resumeExpense = true;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
