/*
 * Copyright 2018 Sage Intacct, Inc.
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
import EqualToString from "../../../../../src/Functions/Common/Query/Comparison/EqualTo/EqualToString";
import OrCondition from "../../../../../src/Functions/Common/Query/Logical/OrCondition";

describe("OrCondition", () => {
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
    it("should construct to string", () => {
        const condition1 = new EqualToString();
        condition1.field = "VENDORID";
        condition1.value = "V1234";
        const condition2 = new EqualToString();
        condition2.field = "STATUS";
        condition2.value = "T";

        const and = new OrCondition();
        and.conditions = [
            condition1,
            condition2,
        ];

        chai.assert.equal(and.toString(), "(VENDORID = 'V1234' OR STATUS = 'T')");
    });
    it("should allow setter to string", () => {
        const condition1 = new EqualToString();
        condition1.field = "VENDORID";
        condition1.value = "V1234";
        const condition2 = new EqualToString();
        condition2.field = "STATUS";
        condition2.value = "T";

        const and = new OrCondition();
        and.negate = true;
        and.conditions = [
            condition1,
            condition2,
        ];

        chai.assert.equal(and.toString(), "NOT (VENDORID = 'V1234' OR STATUS = 'T')");
    });
    it("should construct to string of nested conditions", () => {
        const condition1 = new EqualToString();
        condition1.field = "VENDORTYPE";
        condition1.value = "Software";
        const condition2 = new EqualToString();
        condition2.field = "VENDORID";
        condition2.value = "V1234";
        const condition3 = new EqualToString();
        condition3.field = "VENDORID";
        condition3.value = "V5678";

        const nested = new OrCondition();
        nested.conditions = [
            condition2,
            condition3,
        ];

        const or = new OrCondition();
        or.conditions = [
            condition1,
            nested,
        ];

        chai.assert.equal(or.toString(), "(VENDORTYPE = 'Software' OR (VENDORID = 'V1234' OR VENDORID = 'V5678'))");
    });
});
