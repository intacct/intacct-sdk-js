/*
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

import AttachmentsUpdate from "../../../src/Functions/Company/AttachmentsUpdate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("AttachmentsUpdate", () => {
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
    it("should build AttachmentsUpdate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update_supdoc>
            <supdocid>A1234</supdocid>
        </update_supdoc>
    </function>
</test>`;

        const record = new AttachmentsUpdate();
        record.controlId = "unittest";
        record.attachmentsId = "A1234";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
