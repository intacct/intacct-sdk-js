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
import QueryString from "../../../src/Functions/Common/Query/QueryString";
import ReadByQuery from "../../../src/Functions/Common/ReadByQuery";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ReadByQuery", () => {
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
    it("should use readByQuery defaults", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <readByQuery>
            <object>CLASS</object>
            <query>RECORDNO &lt; 2</query>
            <fields>*</fields>
            <pagesize>1000</pagesize>
            <returnFormat>xml</returnFormat>
        </readByQuery>
    </function>
</test>`;

        const record = new ReadByQuery("unittest");
        record.objectName = "CLASS";
        record.query = new QueryString("RECORDNO < 2");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should allow overriding readByQuery defaults", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <readByQuery>
            <object>CLASS</object>
            <query />
            <fields>RECORDNO</fields>
            <pagesize>100</pagesize>
            <returnFormat>xml</returnFormat>
            <docparid>255252235</docparid>
        </readByQuery>
    </function>
</test>`;

        const record = new ReadByQuery("unittest");
        record.objectName = "CLASS";
        record.pageSize = 100;
        record.fields = [
            "RECORDNO",
        ];
        record.docParId = "255252235";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should throw exception for invalid min page size", () => {
        chai.assert.throws(
            () => {
                const readByQuery = new ReadByQuery();
                readByQuery.pageSize = 0;
            },
            Error,
            "Page Size cannot be less than 1",
        );
    });
    it("should throw exception for for invalid max page size", () => {
        chai.assert.throws(
            () => {
                const readByQuery = new ReadByQuery();
                readByQuery.pageSize = 1001;
            },
            Error,
            "Page Size cannot be greater than 1000",
        );
    });
});
