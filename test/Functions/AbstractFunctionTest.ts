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
import AbstractFunction from "../../src/Functions/AbstractFunction";
import ApiSessionCreate from "../../src/Functions/ApiSessionCreate";

describe("AbstractFunction", () => {
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
    it("should throw error for controlid that is too long", () => {
        chai.assert.throws(
            () => {
                const reallyLongControlId = "1234567890123456789012345678901234567890123456789012345678901234567890" +
                    "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234" +
                    "567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567";
                return new ApiSessionCreate(reallyLongControlId);
            },
            Error,
            "Function control ID must be between 1 and 256 characters in length.",
        );
    });
});
