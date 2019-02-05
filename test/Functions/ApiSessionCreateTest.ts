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

import ApiSessionCreate from "../../src/Functions/ApiSessionCreate";
import XmlObjectTestHelper from "../Xml/XmlObjectTestHelper";

describe("ApiSessionCreate", () => {
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
    it("should create empty object for ApiSessionCreate", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <getAPISession />
    </function>
</test>`;

        const record = new ApiSessionCreate();
        record.controlId = "unittest";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create an object for ApiSessionCreate with a locationid", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <getAPISession>
            <locationid>100</locationid>
        </getAPISession>
    </function>
</test>`;

        const record = new ApiSessionCreate();
        record.controlId = "unittest";
        record.entityId = "100";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should create an object for ApiSessionCreate with an empty locationid", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <getAPISession>
            <locationid />
        </getAPISession>
    </function>
</test>`;

        const record = new ApiSessionCreate();
        record.controlId = "unittest";
        record.entityId = "";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
