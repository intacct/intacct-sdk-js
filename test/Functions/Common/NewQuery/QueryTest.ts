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

import Query from "../../../../src/Functions/Common/NewQuery/Query";
import {OrderBuilder} from "../../../../src/Functions/Common/NewQuery/QueryOrderBy";
import Field from "../../../../src/Functions/Common/NewQuery/QuerySelect/Field";
import XmlObjectTestHelper from "../../../Xml/XmlObjectTestHelper";

describe("Query", () => {
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

    it("should set object name for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <object>CLASS</object>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const query = new Query("unittest");
        query.fromObject = "CLASS";

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should set select field name for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <field>CLASSID</field>
            </select>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = [
            new Field("CLASSID"),
        ];

        const query = new Query("unittest");
        query.selectFields = fields;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should set pagesize for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
            <pagesize>1</pagesize>
        </query>
    </function>
</test>`;

        const query = new Query("unittest");
        query.pageSize = 1;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should set offset for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
            <offset>1</offset>
        </query>
    </function>
</test>`;

        const query = new Query("unittest");
        query.offset = 1;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should set case insensitive for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <options>
                <caseinsensitive>true</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const query = new Query("unittest");
        query.caseInsensitive = true;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should set all parameters for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <field>CLASSID</field>
            </select>
            <object>CLASS</object>
            <docparid>255252235</docparid>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
            <pagesize>-1</pagesize>
            <offset>-1</offset>
        </query>
    </function>
</test>`;

        const fields = [
            new Field("CLASSID"),
        ];

        const query = new Query("unittest");
        query.fromObject = "CLASS";
        query.docParId = "255252235";
        query.selectFields = fields;
        query.pageSize = -1;
        query.offset = -1;
        query.caseInsensitive = false;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should set order of fields for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <field>CUSTOMERID</field>
                <field>RECORDNO</field>
            </select>
            <object>ARINVOICE</object>
            <orderby>
                <order>
                    <field>TOTALDUE</field>
                    <ascending />
                </order>
                <order>
                    <field>RECORDNO</field>
                    <descending />
                </order>
            </orderby>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
        </query>
    </function>
</test>`;

        const fields = [
            new Field("CUSTOMERID"),
            new Field("RECORDNO"),
        ];

        const orderBy = (new OrderBuilder()).ascending("TOTALDUE")
            .descending("RECORDNO")
            .getOrders();

        const query = new Query("unittest");
        query.fromObject = "ARINVOICE";
        query.selectFields = fields;
        query.orderBy = orderBy;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should set all through method chaining for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <select>
                <field>CUSTOMERID</field>
                <field>RECORDNO</field>
            </select>
            <object>ARINVOICE</object>
            <docparid>123456</docparid>
            <orderby>
                <order>
                    <field>TOTALDUE</field>
                    <ascending />
                </order>
                <order>
                    <field>RECORDNO</field>
                    <descending />
                </order>
            </orderby>
            <options>
                <caseinsensitive>false</caseinsensitive>
            </options>
            <pagesize>100</pagesize>
            <offset>0</offset>
        </query>
    </function>
</test>`;

        const fields = [
            new Field("CUSTOMERID"),
            new Field("RECORDNO"),
        ];

        const orderBy = (new OrderBuilder()).ascending("TOTALDUE")
            .descending("RECORDNO")
            .getOrders();

        const query = (new Query("unittest"))
            .setFromObject("ARINVOICE")
            .setCaseInsensitive(false)
            .setDocParId("123456")
            .setOrderBy(orderBy)
            .setSelectFields(fields)
            .setPageSize(100)
            .setOffset(0);

        XmlObjectTestHelper.CompareXml(expected, query);
    });
});
