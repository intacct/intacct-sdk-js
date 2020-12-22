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
import * as xmlbuilder from "xmlbuilder";
import Query from "../../../../../src/Functions/Common/NewQuery/Query";
import Filter from "../../../../../src/Functions/Common/NewQuery/QueryFilter/Filter";
import OrOperator from "../../../../../src/Functions/Common/NewQuery/QueryFilter/OrOperator";
import IaXmlWriter from "../../../../../src/Xml/IaXmlWriter";
import XmlObjectTestHelper from "../../../../Xml/XmlObjectTestHelper";

describe("OrOperator", () => {
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

    it("should set filter using or for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <filter>
                <or>
                    <greaterthanorequalto>
                        <field>RECORDNO</field>
                        <value>1</value>
                    </greaterthanorequalto>
                    <lessthanorequalto>
                        <field>RECORDNO</field>
                        <value>100</value>
                    </lessthanorequalto>
                </or>
            </filter>
            <options>
                <caseinsensitive>false</caseinsensitive>
                <showprivate>false</showprivate>
            </options>
        </query>
    </function>
</test>`;

        const filter = (new OrOperator(
            [
                (new Filter("RECORDNO")).greaterThanOrEqualTo("1"),
                (new Filter("RECORDNO")).lessThanOrEqualTo("100"),
            ],
        ));

        const query = new Query("unittest");
        query.filter = filter;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw error for using or with 1 filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = (new OrOperator(
                    [
                        (new Filter("RECORDNO")).lessThanOrEqualTo("100"),
                    ],
                ));
                filter.writeXml(xml);
            },
            Error,
            "Two or more FilterInterface objects required for or",
        );
    });

    it("should throw error for using or without filters", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new OrOperator([]);
                filter.writeXml(xml);
            },
            Error,
            "Two or more FilterInterface objects required for or",
        );
    });

    it("should throw error for using or without filters", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new OrOperator(null);
                filter.writeXml(xml);
            },
            Error,
            "Two or more FilterInterface objects required for or",
        );
    });

    it("should add 2 filters for OrOperator for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <filter>
                <or>
                    <greaterthanorequalto>
                        <field>RECORDNO</field>
                        <value>1</value>
                    </greaterthanorequalto>
                    <lessthanorequalto>
                        <field>RECORDNO</field>
                        <value>100</value>
                    </lessthanorequalto>
                </or>
            </filter>
            <options>
                <caseinsensitive>false</caseinsensitive>
                <showprivate>false</showprivate>
            </options>
        </query>
    </function>
</test>`;

        const filter = new OrOperator();
        filter.addFilter((new Filter("RECORDNO")).greaterThanOrEqualTo("1"));
        filter.addFilter((new Filter("RECORDNO")).lessThanOrEqualTo("100"));

        const query = new Query("unittest");
        query.filter = filter;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should error for null filter for OrOperator for query", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new OrOperator();
                filter.addFilter(null);
                filter.writeXml(xml);
            },
            Error,
            "filter cannot be null",
        );
    });
});
