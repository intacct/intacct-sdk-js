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
import RequestConfig from "../src/RequestConfig";

describe("RequestConfig", () => {
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
    it("should set ClientConfig defaults", () => {
        const requestConfig = new RequestConfig();
        requestConfig.controlId = "unittest";

        chai.assert.equal(requestConfig.controlId, "unittest");
        chai.assert.equal(requestConfig.encoding, "utf-8");
        chai.assert.equal(requestConfig.maxRetries, 5);
        chai.assert.equal(requestConfig.maxTimeout, 30000);
        chai.assert.deepEqual(requestConfig.noRetryServerErrorCodes, [ 524 ]);
        chai.assert.equal(requestConfig.policyId, "");
        chai.assert.isFalse(requestConfig.transaction);
        chai.assert.isFalse(requestConfig.uniqueId);
    });
});
