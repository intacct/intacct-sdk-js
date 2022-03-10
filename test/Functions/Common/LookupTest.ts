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

import * as chai from "chai";
import Lookup from "../../../src/Functions/Common/Lookup";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("Lookup", () => {
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
    it("should run lookup with object name", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <lookup>
            <object>TEST</object>
        </lookup>
    </function>
</test>`;

        const record = new Lookup("unittest");
        record.objectName = "TEST";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should run lookup with object name and docparid", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <lookup>
            <object>TEST</object>
            <docparid>Sales Invoice</docparid>
        </lookup>
    </function>
</test>`;

        const record = new Lookup("unittest");
        record.objectName = "TEST";
        record.docParId = "Sales Invoice"

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
