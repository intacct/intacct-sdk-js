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

import * as path from "path";
import AttachmentFile from "../../../src/Functions/Company/AttachmentFile";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("AttachmentFile", () => {
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
    it("should build AttachmentFile object", () => {
        const fileData = "hello,world" + require("os").EOL + "unit,test";

        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <attachment>
        <attachmentname>input</attachmentname>
        <attachmenttype>csv</attachmenttype>
        <attachmentdata>` + Buffer.from(fileData).toString("base64") + `</attachmentdata>
    </attachment>
</test>`;

        const record = new AttachmentFile();
        record.filePath = path.join(__dirname, "File", "input.csv");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
