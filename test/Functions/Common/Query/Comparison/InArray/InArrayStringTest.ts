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
import InArrayString from "../../../../../../src/Functions/Common/Query/Comparison/InArray/InArrayString";

describe("InArrayString", () => {
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
    it("output the condition to a string", () => {
        const condition = new InArrayString();
        condition.field = "VENDORID";
        condition.valuesList = [
            "V0001",
            "V0002",
            "V0003",
        ];

        chai.assert.equal(condition.toString(), "VENDORID IN ('V0001','V0002','V0003')");
    });
    it("output the negate condition to a string", () => {
        const condition = new InArrayString();
        condition.negate = true;
        condition.field = "VENDORID";
        condition.valuesList = [
            "V0001",
            "V0002",
            "V0003",
        ];

        chai.assert.equal(condition.toString(), "NOT VENDORID IN ('V0001','V0002','V0003')");
    });
    it("output the condition to an escaped string", () => {
        const condition = new InArrayString();
        condition.field = "VENDORNAME";
        condition.valuesList = [
            "bob's pizza",
            "bill's pizza",
            "sally's pizza",
        ];

        chai.assert.equal(condition.toString(), "VENDORNAME IN ('bob\\'s pizza','bill\\'s pizza','sally\\'s pizza')");
    });
    it("output the singular condition to a string", () => {
        const condition = new InArrayString();
        condition.field = "VENDORID";
        condition.valuesList = [
            "V0001",
        ];

        chai.assert.equal(condition.toString(), "VENDORID IN ('V0001')");
    });
});
