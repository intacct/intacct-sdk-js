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
import * as xmlbuilder from "xmlbuilder";
import Filter from "../../../../../src/Functions/Common/NewQuery/QueryFilter/Filter";
import IaXmlWriter from "../../../../../src/Xml/IaXmlWriter";
import XmlObjectTestHelper from "../../../../Xml/XmlObjectTestHelper";

describe("Filter", () => {
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

    it("should set fieldName for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <equalto>
        <field>CUSTOMERID</field>
        <value>1</value>
    </equalto>
</test>`;

        const filter = new Filter("CUSTOMERID").equalTo("1");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for missing fieldName for filter", () => {
        chai.assert.throws(
            () => {
                (new Filter("")).equalTo("9");
            },
            Error,
            "fieldName is required for Filter.",
        );
    });

    it("should throw error for not calling method in filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = (new Filter("CLASSID"));
                filter.writeXml(xml);
            },
            Error,
            "Filter requires 1 method be called before calling writeXml",
        );
    });

    it("should set equalto for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <equalto>
        <field>CUSTOMERID</field>
        <value>10</value>
    </equalto>
</test>`;

        const filter = new Filter("CUSTOMERID").equalTo("10");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty value using equal to for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <equalto>
        <field>VENDORNAME</field>
        <value />
    </equalto>
</test>`;

        const filter = new Filter("VENDORNAME").equalTo("");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for null value using equal to for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("VENDORNAME").equalTo(null);
                filter.writeXml(xml);
            },
            Error,
            "null not allowed. Provide string value for equalTo function.",
        );
    });

    it("should set notequalto for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <notequalto>
        <field>CUSTOMERID</field>
        <value>10</value>
    </notequalto>
</test>`;

        const filter = new Filter("CUSTOMERID").notEqualTo("10");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty value using not equal for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <notequalto>
        <field>CUSTOMERID</field>
        <value />
    </notequalto>
</test>`;

        const filter = new Filter("CUSTOMERID").notEqualTo("");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for null value using not equal to for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("VENDORNAME").notEqualTo(null);
                filter.writeXml(xml);
            },
            Error,
            "null not allowed. Provide string value for notEqualTo function.",
        );
    });

    it("should set less than for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <lessthan>
        <field>CUSTOMERID</field>
        <value>10</value>
    </lessthan>
</test>`;

        const filter = new Filter("CUSTOMERID").lessThan("10");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty value using less than for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <lessthan>
        <field>CUSTOMERID</field>
        <value />
    </lessthan>
</test>`;

        const filter = new Filter("CUSTOMERID").lessThan("");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for null value using less than for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("VENDORNAME").lessThan(null);
                filter.writeXml(xml);
            },
            Error,
            "null not allowed. Provide string value for lessThan function.",
        );
    });

    it("should set less than or equal to for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <lessthanorequalto>
        <field>CUSTOMERID</field>
        <value>10</value>
    </lessthanorequalto>
</test>`;

        const filter = new Filter("CUSTOMERID").lessThanOrEqualTo("10");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty value using less than or equal to for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <lessthanorequalto>
        <field>CUSTOMERID</field>
        <value />
    </lessthanorequalto>
</test>`;

        const filter = new Filter("CUSTOMERID").lessThanOrEqualTo("");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for null value using less than or equal to for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("VENDORNAME").lessThanOrEqualTo(null);
                filter.writeXml(xml);
            },
            Error,
            "null not allowed. Provide string value for lessThanOrEqualTo function.",
        );
    });

    it("should set greater than for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <greaterthan>
        <field>CUSTOMERID</field>
        <value>10</value>
    </greaterthan>
</test>`;

        const filter = new Filter("CUSTOMERID").greaterThan("10");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty string using greater than for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <greaterthan>
        <field>CUSTOMERID</field>
        <value />
    </greaterthan>
</test>`;

        const filter = new Filter("CUSTOMERID").greaterThan("");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for null value using greater than for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("VENDORNAME").greaterThan(null);
                filter.writeXml(xml);
            },
            Error,
            "null not allowed. Provide string value for greaterThan function.",
        );
    });

    it("should set greater than or equal to for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <greaterthanorequalto>
        <field>CUSTOMERID</field>
        <value>10</value>
    </greaterthanorequalto>
</test>`;

        const filter = new Filter("CUSTOMERID").greaterThanOrEqualTo("10");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty string using greater than or equal to for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <greaterthanorequalto>
        <field>CUSTOMERID</field>
        <value />
    </greaterthanorequalto>
</test>`;

        const filter = new Filter("CUSTOMERID").greaterThanOrEqualTo("");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for null value using greater than or equal to for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("VENDORNAME").greaterThanOrEqualTo(null);
                filter.writeXml(xml);
            },
            Error,
            "null not allowed. Provide string value for greaterThanOrEqualTo function.",
        );
    });

    it("should set between for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <between>
        <field>WHENDUE</field>
        <value>10/01/2019</value>
        <value>12/31/2019</value>
    </between>
</test>`;

        const filter = new Filter("WHENDUE").between("10/01/2019", "12/31/2019");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for first null in between for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("WHENDUE").between(null, "10/01/2019");
                filter.writeXml(xml);
            },
            Error,
            "Two strings expected for between filter",
        );
    });

    it("should throw error for second null in between for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("WHENDUE").between("10/01/2019", null);
                filter.writeXml(xml);
            },
            Error,
            "Two strings expected for between filter",
        );
    });

    it("should set empty elements for empty string using between for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <between>
        <field>WHENDUE</field>
        <value />
        <value />
    </between>
</test>`;

        const filter = new Filter("WHENDUE").between("", "");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set in for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <in>
        <field>DEPARTMENTID</field>
        <value>04</value>
        <value>05</value>
        <value>06</value>
        <value>07</value>
    </in>
</test>`;

        const filter = new Filter("DEPARTMENTID").in(["04", "05", "06", "07"]);

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty string in array using in for filter", () => {
        chai.assert.throws(
            () => {
                new Filter("DEPARTMENTID").in([]);
            },
            Error,
            "At least 1 string in array expected for in for filter",
        );
    });

    it("should set empty string in array using in for filter", () => {
        chai.assert.throws(
            () => {
                new Filter("DEPARTMENTID").in(null);
            },
            Error,
            "At least 1 string in array expected for in for filter",
        );
    });

    it("should set in for empty filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <in>
        <field>DEPARTMENTID</field>
        <value />
    </in>
</test>`;

        const filter = new Filter("DEPARTMENTID").in([""]);

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set not in for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <notin>
        <field>DEPARTMENTID</field>
        <value>04</value>
        <value>05</value>
        <value>06</value>
        <value>07</value>
    </notin>
</test>`;

        const filter = new Filter("DEPARTMENTID").notIn(["04", "05", "06", "07"]);

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty string in array using not in for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <notin>
        <field>DEPARTMENTID</field>
        <value />
    </notin>
</test>`;

        const filter = new Filter("DEPARTMENTID").notIn([""]);

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty string in array using not in for filter", () => {
        chai.assert.throws(
            () => {
                new Filter("DEPARTMENTID").notIn([]);
            },
            Error,
            "At least 1 string in array expected for notIn for filter",
        );
    });

    it("should set empty string in array using not in for filter", () => {
        chai.assert.throws(
            () => {
                new Filter("DEPARTMENTID").notIn(null);
            },
            Error,
            "At least 1 string in array expected for notIn for filter",
        );
    });

    it("should set like for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <like>
        <field>VENDORNAME</field>
        <value>B%</value>
    </like>
</test>`;

        const filter = new Filter("VENDORNAME").like("B%");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty value using like for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <like>
        <field>VENDORNAME</field>
        <value />
    </like>
</test>`;

        const filter = new Filter("VENDORNAME").like("");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for null value using like for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("VENDORNAME").like(null);
                filter.writeXml(xml);
            },
            Error,
            "null not allowed. Provide string value for like function.",
        );
    });

    it("should set notlike for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <notlike>
        <field>VENDORNAME</field>
        <value>ACME%</value>
    </notlike>
</test>`;

        const filter = new Filter("VENDORNAME").notLike("ACME%");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set empty value using not like for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <notlike>
        <field>VENDORNAME</field>
        <value />
    </notlike>
</test>`;

        const filter = new Filter("VENDORNAME").notLike("");

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should throw error for null value using not like for filter", () => {
        chai.assert.throws(
            () => {
                const xml = new IaXmlWriter(xmlbuilder.create("request", {
                    "version": "1.0",
                    "encoding": "utf-8",
                    "standalone": null,
                }));
                const filter = new Filter("VENDORNAME").notLike(null);
                filter.writeXml(xml);
            },
            Error,
            "null not allowed. Provide string value for notLike function.",
        );
    });

    it("should set is null for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <isnull>
        <field>DESCRIPTION</field>
    </isnull>
</test>`;

        const filter = new Filter("DESCRIPTION").isNull();

        XmlObjectTestHelper.CompareXml(expected, filter);
    });

    it("should set is not null for filter", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <isnotnull>
        <field>DESCRIPTION</field>
    </isnotnull>
</test>`;

        const filter = new Filter("DESCRIPTION").isNotNull();

        XmlObjectTestHelper.CompareXml(expected, filter);
    });
});
