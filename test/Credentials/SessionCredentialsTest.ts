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
import * as mock from "mock-fs";
import ClientConfig from "../../src/ClientConfig";
import SenderCredentials from "../../src/Credentials/SenderCredentials";
import SessionCredentials from "../../src/Credentials/SessionCredentials";

describe("SessionCredentials", () => {
    const oldEnv = process.env;

    const senderConfig = new ClientConfig();
    senderConfig.senderId = "testsenderid";
    senderConfig.senderPassword = "pass123!";
    const senderCreds = new SenderCredentials(senderConfig);

    before((done) => {
        return done();
    });
    beforeEach((done) => {
        process.env = {};
        return done();
    });
    afterEach((done) => {
        process.env = oldEnv;
        return done();
    });
    after((done) => {
        mock.restore();
        return done();
    });

    it("grabs the creds from the config", () => {
        const config = new ClientConfig();
        config.sessionId = "faKEsesSiOnId..";
        config.endpointUrl = "https://p1.intacct.com/ia/xml/xmlgw.phtml";

        const creds = new SessionCredentials(config, senderCreds);
        chai.assert.equal(creds.sessionId, "faKEsesSiOnId..");
        chai.assert.equal(creds.endpoint.url, "https://p1.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("grabs the creds from the config with an empty endpoint", () => {
        const config = new ClientConfig();
        config.sessionId = "faKEsesSiOnId..";
        config.endpointUrl = null;

        const creds = new SessionCredentials(config, senderCreds);
        chai.assert.equal(creds.sessionId, "faKEsesSiOnId..");
        chai.assert.equal(creds.endpoint.url, "https://api.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("should throw exception on invalid Session ID", () => {
        chai.assert.throws(
            () => {
                const config = new ClientConfig();
                config.sessionId = "";
                return new SessionCredentials(config, senderCreds);
            },
            Error,
            "Required Session ID not supplied in config",
        );
    });
});
