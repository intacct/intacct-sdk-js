/**
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

import ProjectCreate from "../../../src/Functions/Projects/ProjectCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ProjectCreate", () => {
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
    it("should build ProjectCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <PROJECT>
                <NAME>hello world</NAME>
                <PROJECTCATEGORY>Contract</PROJECTCATEGORY>
            </PROJECT>
        </create>
    </function>
</test>`;

        const record = new ProjectCreate();
        record.controlId = "unittest";
        record.projectName = "hello world";
        record.projectCategory = "Contract";

        XmlObjectTestHelper.CompareXml(expected, record);
    });

    it("should build ProjectCreate object with transaction rules", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <PROJECT>
                <NAME>hello world</NAME>
                <PROJECTCATEGORY>Contract</PROJECTCATEGORY>
                <PROJECT_RULES>
                    <RULENAME>Rule 1</RULENAME>
                </PROJECT_RULES>
                <PROJECT_RULES>
                    <RULENAME>Rule 2</RULENAME>
                </PROJECT_RULES>
            </PROJECT>
        </create>
    </function>
</test>`;

        const record = new ProjectCreate();
        record.controlId = "unittest";
        record.projectName = "hello world";
        record.projectCategory = "Contract";
        record.transactionRules = [
            "Rule 1",
            "Rule 2",
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
