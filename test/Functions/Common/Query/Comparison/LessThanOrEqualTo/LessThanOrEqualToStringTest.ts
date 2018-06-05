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
import LessThanOrEqualToString from "../../../../../../src/Functions/Common/Query/Comparison/LessThanOrEqualTo/LessThanOrEqualToString";

describe("LessThanOrEqualToString", () => {
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
        const condition = new LessThanOrEqualToString();
        condition.field = "VENDORID";
        condition.value = "V1234";

        chai.assert.equal(condition.toString(), "VENDORID <= 'V1234'");
    });
    it("output the negate condition to a string", () => {
        const condition = new LessThanOrEqualToString();
        condition.negate = true;
        condition.field = "VENDORID";
        condition.value = "V1234";

        chai.assert.equal(condition.toString(), "NOT VENDORID <= 'V1234'");
    });
    it("output the condition to an escaped string", () => {
        const condition = new LessThanOrEqualToString();
        condition.field = "VENDORNAME";
        condition.value = "Bob's Pizza, Inc.";

        chai.assert.equal(condition.toString(), "VENDORNAME <= 'Bob\\'s Pizza, Inc.'");
    });
});
