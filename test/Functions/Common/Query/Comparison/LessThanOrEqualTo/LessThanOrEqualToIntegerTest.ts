/*
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
import LessThanOrEqualToInteger from "../../../../../../src/Functions/Common/Query/Comparison/LessThanOrEqualTo/LessThanOrEqualToInteger";

describe("LessThanOrEqualToInteger", () => {
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
        const condition = new LessThanOrEqualToInteger();
        condition.field = "RECORDNO";
        condition.value = 1234;

        chai.assert.equal(condition.toString(), "RECORDNO <= 1234");
    });
    it("output the negate condition to a string", () => {
        const condition = new LessThanOrEqualToInteger();
        condition.negate = true;
        condition.field = "RECORDNO";
        condition.value = 1234;

        chai.assert.equal(condition.toString(), "NOT RECORDNO <= 1234");
    });
    it("thrown an exception for non integer", () => {
        chai.assert.throws(
            () => {
                const condition = new LessThanOrEqualToInteger();
                condition.field = "RECORDNO";
                condition.value = 123.45;
                return condition;
            },
            Error,
            "Value is not an integer",
        );
    });
});
