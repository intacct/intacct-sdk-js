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
import * as mock from "mock-fs";
import ClientConfig from "../../src/ClientConfig";
import LoginCredentials from "../../src/Credentials/LoginCredentials";
import SenderCredentials from "../../src/Credentials/SenderCredentials";

describe("LoginCredentials", () => {
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
        config.companyId = "testcompany";
        config.userId = "testuser";
        config.userPassword = "testpass";

        const creds = new LoginCredentials(config, senderCreds);
        chai.assert.equal(creds.companyId, "testcompany");
        chai.assert.equal(creds.userId, "testuser");
        chai.assert.equal(creds.password, "testpass");
        chai.assert.equal(creds.endpoint.url, "https://api.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("grabs INTACCT_COMPANY_ID, INTACCT_USER_ID, and INTACCT_USER_PASSWORD from the env", () => {
        process.env.INTACCT_COMPANY_ID = "envcompany";
        process.env.INTACCT_USER_ID = "envuser";
        process.env.INTACCT_USER_PASSWORD = "envuserpass";

        const config = new ClientConfig();
        const creds = new LoginCredentials(config, senderCreds);
        chai.assert.equal(creds.companyId, "envcompany");
        chai.assert.equal(creds.userId, "envuser");
        chai.assert.equal(creds.password, "envuserpass");
        chai.assert.equal(creds.endpoint.url, "https://api.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("should throw exception on invalid Company ID", () => {
        chai.assert.throws(
            () => {
                const config = new ClientConfig();
                // config.companyId = 'testcompany';
                config.userId = "testuser";
                config.userPassword = "testpass";
                return new LoginCredentials(config, senderCreds);
            },
            Error,
            'Required Company ID not supplied in config or env variable "INTACCT_COMPANY_ID"',
        );
    });

    it("should throw exception on invalid User ID", () => {
        chai.assert.throws(
            () => {
                const config = new ClientConfig();
                config.companyId = "testcompany";
                // config.userId = 'testuser';
                config.userPassword = "testpass";
                return new LoginCredentials(config, senderCreds);
            },
            Error,
            'Required User ID not supplied in config or env variable "INTACCT_USER_ID"',
        );
    });

    it("should throw exception on invalid User Password", () => {
        chai.assert.throws(
            () => {
                const config = new ClientConfig();
                config.companyId = "testcompany";
                config.userId = "testuser";
                // config.userPassword = 'testpass';
                return new LoginCredentials(config, senderCreds);
            },
            Error,
            'Required User Password not supplied in config or env variable "INTACCT_USER_PASSWORD"',
        );
    });

    it("grabs credentials from the ini profile", () => {
        const ini = "[unittest]\n" +
            "company_id = inicompanyid\n" +
            "user_id = iniuserid\n" +
            "user_password = iniuserpass\n";
        const files = {
            "randomfile.ini": ini,
        };
        mock(files);
        const config = new ClientConfig();
        config.profileFile = "randomfile.ini";
        config.profileName = "unittest";
        const creds = new LoginCredentials(config, senderCreds);
        chai.assert.equal(creds.companyId, "inicompanyid");
        chai.assert.equal(creds.userId, "iniuserid");
        chai.assert.equal(creds.password, "iniuserpass");
    });
});
