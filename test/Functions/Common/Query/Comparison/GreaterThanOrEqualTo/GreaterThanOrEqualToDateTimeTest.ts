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
import GreaterThanOrEqualToDateTime from "../../../../../../src/Functions/Common/Query/Comparison/GreaterThanOrEqualTo/GreaterThanOrEqualToDateTime";

describe("GreaterThanOrEqualToDateTime", () => {
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
        const condition = new GreaterThanOrEqualToDateTime();
        condition.field = "CUSTOMDATE";
        condition.value = new Date(2016, 11, 31, 23, 59, 59);

        chai.assert.equal(condition.toString(), "CUSTOMDATE >= '12/31/2016 23:59:59'");
    });
    it("output the negate condition to a string", () => {
        const condition = new GreaterThanOrEqualToDateTime();
        condition.negate = true;
        condition.field = "CUSTOMDATE";
        condition.value = new Date(2016, 11, 31, 23, 59, 59);

        chai.assert.equal(condition.toString(), "NOT CUSTOMDATE >= '12/31/2016 23:59:59'");
    });
});
