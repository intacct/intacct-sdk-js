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
import AndOperator from "../../../../../src/Functions/Common/NewQuery/QueryFilter/AndOperator";
import Filter from "../../../../../src/Functions/Common/NewQuery/QueryFilter/Filter";
import IaXmlWriter from "../../../../../src/Xml/IaXmlWriter";
import XmlObjectTestHelper from "../../../../Xml/XmlObjectTestHelper";

describe("AndOperator", () => {
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

    it("should set filter using and for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <filter>
                <and>
                    <greaterthanorequalto>
                        <field>RECORDNO</field>
                        <value>1</value>
                    </greaterthanorequalto>
                    <lessthanorequalto>
                        <field>RECORDNO</field>
                        <value>100</value>
                    </lessthanorequalto>
                </and>
            </filter>
            <options>
                <caseinsensitive>false</caseinsensitive>
                <showprivate>false</showprivate>
            </options>
        </query>
    </function>
</test>`;

        const filter = (new AndOperator(
     [
                (new Filter("RECORDNO")).greaterThanOrEqualTo("1"),
                (new Filter("RECORDNO")).lessThanOrEqualTo("100"),
            ],
        ));

        const query = new Query("unittest");
        query.filter = filter;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should throw error for using and with 1 filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": this.encoding,
                    "standalone": null,
                }));
                const filter = (new AndOperator(
                    [
                        (new Filter("RECORDNO")).lessThanOrEqualTo("100"),
                    ],
                ));
                filter.writeXml(xml);
            },
            Error,
            "Two or more FilterInterface objects required for and",
        );
    });

    it("should throw error for using and without filters", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": this.encoding,
                    "standalone": null,
                }));
                const filter = new AndOperator([]);
                filter.writeXml(xml);
            },
            Error,
            "Two or more FilterInterface objects required for and",
        );
    });

    it("should throw error for using and without filters", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": this.encoding,
                    "standalone": null,
                }));
                const filter = new AndOperator(null);
                filter.writeXml(xml);
            },
            Error,
            "Two or more FilterInterface objects required for and",
        );
    });

    it("should add 2 filters for AndOperator for query", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <query>
            <filter>
                <and>
                    <greaterthanorequalto>
                        <field>RECORDNO</field>
                        <value>1</value>
                    </greaterthanorequalto>
                    <lessthanorequalto>
                        <field>RECORDNO</field>
                        <value>100</value>
                    </lessthanorequalto>
                </and>
            </filter>
            <options>
                <caseinsensitive>false</caseinsensitive>
                <showprivate>false</showprivate>
            </options>
        </query>
    </function>
</test>`;

        const filter = new AndOperator();
        filter.addFilter((new Filter("RECORDNO")).greaterThanOrEqualTo("1"));
        filter.addFilter((new Filter("RECORDNO")).lessThanOrEqualTo("100"));

        const query = new Query("unittest");
        query.filter = filter;

        XmlObjectTestHelper.CompareXml(expected, query);
    });

    it("should error for null filter for AndOperator for query", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": this.encoding,
                    "standalone": null,
                }));
                const filter = new AndOperator();
                filter.addFilter(null);
                filter.writeXml(xml);
            },
            Error,
            "filter cannot be null",
        );
    });
});
