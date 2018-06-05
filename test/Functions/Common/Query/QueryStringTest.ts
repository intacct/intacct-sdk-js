/**
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
import QueryString from "../../../../src/Functions/Common/Query/QueryString";

describe("QueryString", () => {
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
        const expected = "VENDORID = 'V1234'";
        const condition = new QueryString(expected);

        chai.assert.equal(condition.toString(), expected);
    });
    it("should allow setter to string", () => {
        const expected = "VENDORID = 'V1234'";
        const condition = new QueryString();
        condition.query = expected;

        chai.assert.equal(condition.toString(), expected);
    });
});
