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
import {Query} from "../../../../../src/Functions/Common/NewQuery";
import {SelectFunctionFactory} from "../../../../../src/Functions/Common/NewQuery/QuerySelect";
import SelectBuilder from "../../../../../src/Functions/Common/NewQuery/QuerySelect/SelectBuilder";
import XmlObjectTestHelper from "../../../../Xml/XmlObjectTestHelper";

describe("SelectFunctionFactory", () => {
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

    it("should set field name for field", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <field>CUSTOMERID</field>
            </select>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = (new SelectBuilder()).field("CUSTOMERID").getFields();

        const query = new Query("unittest");
        query.selectFields = fields;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw exception when field name is empty", () => {
        chai.assert.throws(
            () => {
                (new SelectBuilder()).field("").getFields();
            },
            Error,
            "Field name cannot be empty or null. Provide a field name for the builder.",
        );
    });

    it("should set field names for field", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <field>CUSTOMERID</field>
                <field>RECORDNO</field>
                <field>NAME</field>
            </select>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = (new SelectBuilder()).fields(["CUSTOMERID", "RECORDNO", "NAME"])
            .getFields();

        const query = new Query("unittest");
        query.selectFields = fields;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw exception when field names are empty", () => {
        chai.assert.throws(
            () => {
                (new SelectBuilder()).fields([]).getFields();
            },
            Error,
            "Empty list not allowed for fields.  Provide at least 1 field name in list.",
        );
    });

    it("should set avg name for field", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <avg>TOTALDUE</avg>
            </select>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = (new SelectBuilder()).avg("TOTALDUE").getFields();

        const query = new Query("unittest");
        query.selectFields = fields;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw exception when field name for avg is empty", () => {
        chai.assert.throws(
            () => {
                (new SelectBuilder()).avg("").getFields();
            },
            Error,
            "Field name for avg cannot be empty or null.  Provide a field name for the builder.",
        );
    });

    it("should set count name for field", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <count>RECORDNO</count>
            </select>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = (new SelectBuilder()).count("RECORDNO").getFields();

        const query = new Query("unittest");
        query.selectFields = fields;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw exception when field name for count is empty", () => {
        chai.assert.throws(
            () => {
                (new SelectBuilder()).count("").getFields();
            },
            Error,
            "Field name for count cannot be empty or null.  Provide a field name for the builder.",
        );
    });

    it("should set min name for field", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <min>TOTALDUE</min>
            </select>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = (new SelectBuilder()).min("TOTALDUE").getFields();

        const query = new Query("unittest");
        query.selectFields = fields;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw exception when field name for min is empty", () => {
        chai.assert.throws(
            () => {
                (new SelectBuilder()).min("").getFields();
            },
            Error,
            "Field name for min cannot be empty or null.  Provide a field name for the builder.",
        );
    });

    it("should set max name for field", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <max>TOTALDUE</max>
            </select>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = (new SelectBuilder()).max("TOTALDUE").getFields();

        const query = new Query("unittest");
        query.selectFields = fields;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw exception when field name for max is empty", () => {
        chai.assert.throws(
            () => {
                (new SelectBuilder()).max("").getFields();
            },
            Error,
            "Field name for max cannot be empty or null.  Provide a field name for the builder.",
        );
    });

    it("should set sum name for field", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <sum>TOTALDUE</sum>
            </select>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = (new SelectBuilder()).sum("TOTALDUE").getFields();

        const query = new Query("unittest");
        query.selectFields = fields;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw exception when field name for sum is empty", () => {
        chai.assert.throws(
            () => {
                (new SelectBuilder()).sum("").getFields();
            },
            Error,
            "Field name for sum cannot be empty or null.  Provide a field name for the builder.",
        );
    });

    it("should throw exception when for invalid function name", () => {
        chai.assert.throws(
            () => {
                (new SelectFunctionFactory()).create("foo", "bar");
            },
            Error,
            "foo function doesn't exist.",
        );
    });
});
