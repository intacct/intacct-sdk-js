/*
 * Copyright 2019 Sage Intacct, Inc.
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
import InArrayInteger from "../../../../../../src/Functions/Common/Query/Comparison/InArray/InArrayInteger";

describe("InArrayInteger", () => {
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
        const condition = new InArrayInteger();
        condition.field = "RECORDNO";
        condition.valuesList = [
            1234,
            5678,
            9012,
        ];

        chai.assert.equal(condition.toString(), "RECORDNO IN (1234,5678,9012)");
    });
    it("output the negate condition to a string", () => {
        const condition = new InArrayInteger();
        condition.negate = true;
        condition.field = "RECORDNO";
        condition.valuesList = [
            1234,
            5678,
            9012,
        ];

        chai.assert.equal(condition.toString(), "NOT RECORDNO IN (1234,5678,9012)");
    });
    it("output the singular condition to a string", () => {
        const condition = new InArrayInteger();
        condition.field = "RECORDNO";
        condition.valuesList = [
            1234,
        ];

        chai.assert.equal(condition.toString(), "RECORDNO IN (1234)");
    });
});
