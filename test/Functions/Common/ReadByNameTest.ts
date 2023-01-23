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
import ReadByName from "../../../src/Functions/Common/ReadByName";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ReadByName", () => {
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
    it("should read object by name defaults", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <readByName>
            <object>GLENTRY</object>
            <keys />
            <fields>*</fields>
            <returnFormat>xml</returnFormat>
        </readByName>
    </function>
</test>`;

        const record = new ReadByName("unittest");
        record.objectName = "GLENTRY";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should read object by name with overrides", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <readByName>
            <object>GLENTRY</object>
            <keys>987</keys>
            <fields>TRX_AMOUNT,RECORDNO,BATCHNO</fields>
            <returnFormat>xml</returnFormat>
            <docparid>Sales Invoice</docparid>
        </readByName>
    </function>
</test>`;

        const record = new ReadByName("unittest");
        record.objectName = "GLENTRY";
        record.fields = [
            "TRX_AMOUNT",
            "RECORDNO",
            "BATCHNO",
        ];
        record.names = [
            "987",
        ];
        record.docParId = "Sales Invoice";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should throw exception for too many keys included", () => {
        chai.assert.throws(
            () => {
                const names = [];
                for (let i = 0; i < 101; i++) {
                    names.push(i.toString());
                }
                const record = new ReadByName();
                record.names = names;
            },
            Error,
            "Names count cannot exceed 100",
        );
    });
});
