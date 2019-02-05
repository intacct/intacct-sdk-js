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

import ProjectDelete from "../../../src/Functions/Projects/ProjectDelete";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ProjectDelete", () => {
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
    it("should build ProjectDelete object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <delete_project key="P1234" />
    </function>
</test>`;

        const record = new ProjectDelete();
        record.controlId = "unittest";
        record.projectId = "P1234";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
