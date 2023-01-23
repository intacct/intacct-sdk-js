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

import AttachmentsCreate from "../../../src/Functions/Company/AttachmentsCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("AttachmentsCreate", () => {
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
    it("should build AttachmentsCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_supdoc>
            <supdocid />
            <supdocname />
            <supdocfoldername>My Folder</supdocfoldername>
        </create_supdoc>
    </function>
</test>`;

        const record = new AttachmentsCreate();
        record.controlId = "unittest";
        record.attachmentFolderName = "My Folder";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
