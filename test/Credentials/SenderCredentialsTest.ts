/**
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
import * as mock from "mock-fs";
import ClientConfig from "../../src/ClientConfig";
import SenderCredentials from "../../src/Credentials/SenderCredentials";

describe("SenderCredentials", () => {
    const oldEnv = process.env;

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
        config.senderId = "testsenderid";
        config.senderPassword = "pass123!";
        config.endpointUrl = "https://unittest.intacct.com/ia/xml/xmlgw.phtml";

        const creds = new SenderCredentials(config);
        chai.assert.equal(creds.senderId, "testsenderid");
        chai.assert.equal(creds.password, "pass123!");
        chai.assert.equal(creds.endpoint.url, "https://unittest.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("grabs INTACCT_SENDER_ID and INTACCT_SENDER_PASSWORD from the env", () => {
        process.env.INTACCT_SENDER_ID = "envsender";
        process.env.INTACCT_SENDER_PASSWORD = "envpass";

        const config = new ClientConfig();
        const creds = new SenderCredentials(config);
        chai.assert.equal(creds.senderId, "envsender");
        chai.assert.equal(creds.password, "envpass");
        chai.assert.equal(creds.endpoint.url, "https://api.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("should throw exception on invalid Sender ID", () => {
        chai.assert.throws(
            () => {
                const config = new ClientConfig();
                // config.senderId = 'testsenderid';
                config.senderPassword = "pass123!";
                return new SenderCredentials(config);
            },
            Error,
            'Required Sender ID not supplied in config or env variable "INTACCT_SENDER_ID"',
        );
    });

    it("should throw exception on invalid Sender Password", () => {
        chai.assert.throws(
            () => {
                const config = new ClientConfig();
                config.senderId = "testsenderid";
                // config.senderPassword = 'pass123!';
                return new SenderCredentials(config);
            },
            Error,
            'Required Sender Password not supplied in config or env variable "INTACCT_SENDER_PASSWORD"',
        );
    });

    it("grabs credentials from the ini profile", () => {
        const ini = "[unittest]\n" +
            "sender_id = inisenderid\n" +
            "sender_password = inisenderpass\n" +
            "endpoint_url = https://unittest.intacct.com/ia/xml/xmlgw.phtml\n";
        const files = {
            "randomfile.ini": ini,
        };
        mock(files);
        const config = new ClientConfig();
        config.profileFile = "randomfile.ini";
        config.profileName = "unittest";
        const creds = new SenderCredentials(config);
        chai.assert.equal(creds.senderId, "inisenderid");
        chai.assert.equal(creds.password, "inisenderpass");
        chai.assert.equal(creds.endpoint.url, "https://unittest.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("grabs credentials from the ini profile but allows config override of endpoint url", () => {
        const ini = "[unittest]\n" +
            "sender_id = inisenderid\n" +
            "sender_password = inisenderpass\n" +
            "endpoint_url = https://unittest.intacct.com/ia/xml/xmlgw.phtml\n";
        const files = {
            "randomfile.ini": ini,
        };
        mock(files);
        const config = new ClientConfig();
        config.profileFile = "randomfile.ini";
        config.profileName = "unittest";
        config.endpointUrl = "https://somethingelse.intacct.com/ia/xml/xmlgw.phtml";
        const creds = new SenderCredentials(config);
        chai.assert.equal(creds.senderId, "inisenderid");
        chai.assert.equal(creds.password, "inisenderpass");
        chai.assert.equal(creds.endpoint.url, "https://somethingelse.intacct.com/ia/xml/xmlgw.phtml");
    });
});
