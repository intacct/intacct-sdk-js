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
import ClientConfig from "../src/ClientConfig";
import MessageFormatter from "../src/Logging/MessageFormatter";

describe("ClientConfig", () => {
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
        const clientConfig = new ClientConfig();

        chai.assert.isUndefined(clientConfig.profileFile);
        chai.assert.isUndefined(clientConfig.profileName);
        chai.assert.isUndefined(clientConfig.endpointUrl);
        chai.assert.isUndefined(clientConfig.senderId);
        chai.assert.isUndefined(clientConfig.senderPassword);
        chai.assert.isUndefined(clientConfig.sessionId);
        chai.assert.isUndefined(clientConfig.companyId);
        chai.assert.isUndefined(clientConfig.userId);
        chai.assert.isUndefined(clientConfig.userPassword);
        chai.assert.isUndefined(clientConfig.credentials);
        chai.assert.isUndefined(clientConfig.logger);
        chai.assert.equal(clientConfig.logLevel, "debug");
        chai.assert.instanceOf(clientConfig.logMessageFormatter, MessageFormatter);
    });
});
