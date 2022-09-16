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

import * as chai from "chai";
import Read from "../../../src/Functions/Common/Read";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("Read", () => {
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
    it("should read with defaults", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <read>
            <object>CLASS</object>
            <keys />
            <fields>*</fields>
            <returnFormat>xml</returnFormat>
        </read>
    </function>
</test>`;

        const record = new Read("unittest");
        record.objectName = "CLASS";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should read without defaults", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <read>
            <object>CLASS</object>
            <keys>1,2</keys>
            <fields>Field1,Field2</fields>
            <returnFormat>xml</returnFormat>
            <docparid>Sales Invoice</docparid>
        </read>
    </function>
</test>`;

        const record = new Read("unittest");
        record.objectName = "CLASS";
        record.fields = [
            "Field1",
            "Field2",
        ];
        record.keys = [
            1,
            2,
        ];
        record.docParId = "Sales Invoice";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should throw exception for too many keys included", () => {
        chai.assert.throws(
            () => {
                const keys = [];
                for (let i = 0; i < 101; i++) {
                    keys.push(i);
                }
                const read = new Read();
                read.keys = keys;
            },
            Error,
            "Keys count cannot exceed 100",
        );
    });
});
