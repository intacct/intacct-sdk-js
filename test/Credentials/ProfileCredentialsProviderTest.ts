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
import ProfileCredentialProvider from "../../src/Credentials/ProfileCredentialProvider";

describe("ProfileCredentialsProvider", () => {

    const testIni = "[default]\n" +
        "sender_id = defsenderid\n" +
        "sender_password = defsenderpass\n" +
        "company_id = defcompanyid\n" +
        "user_id = defuserid\n" +
        "user_password = defuserpass\n" +
        "endpoint_url = https://unittest.intacct.com/ia/xmlgw.phtml\n\n" +
        "[unittest]\n" +
        "company_id = inicompanyid\n" +
        "user_id = iniuserid\n" +
        "user_password = iniuserpass\n" +
        "[entity]\n" +
        "company_id = inicompanyid\n" +
        "entity_id = inientityid\n" +
        "user_id = iniuserid\n" +
        "user_password = iniuserpass\n";

    before((done) => {
        return done();
    });
    beforeEach((done) => {
        return done();
    });
    afterEach((done) => {
        mock.restore();
        return done();
    });
    after((done) => {
        return done();
    });

    it("should return credentials from default profile", (done) => {
        const files = {};
        const homeDir = ProfileCredentialProvider.getHomeDirProfile();
        files[homeDir] = testIni;
        mock(files);

        const config = new ClientConfig();
        const loginCreds = ProfileCredentialProvider.getLoginCredentials(config);

        chai.assert.equal(loginCreds.companyId, "defcompanyid");
        chai.assert.isUndefined(loginCreds.entityId);
        chai.assert.equal(loginCreds.userId, "defuserid");
        chai.assert.equal(loginCreds.userPassword, "defuserpass");

        const senderCreds = ProfileCredentialProvider.getSenderCredentials(config);

        chai.assert.equal(senderCreds.senderId, "defsenderid");
        chai.assert.equal(senderCreds.senderPassword, "defsenderpass");
        chai.assert.equal(senderCreds.endpointUrl, "https://unittest.intacct.com/ia/xmlgw.phtml");

        done();
    });

    it("should return credentials from a specific profile", (done) => {
        const files = {};
        const homeDir = ProfileCredentialProvider.getHomeDirProfile();
        files[homeDir] = testIni;
        mock(files);

        const config = new ClientConfig();
        config.profileName = "unittest";
        const loginCreds = ProfileCredentialProvider.getLoginCredentials(config);

        chai.assert.equal(loginCreds.companyId, "inicompanyid");
        chai.assert.isUndefined(loginCreds.entityId);
        chai.assert.equal(loginCreds.userId, "iniuserid");
        chai.assert.equal(loginCreds.userPassword, "iniuserpass");

        done();
    });

    it("should return credentials with entity from a specific profile", (done) => {
        const files = {};
        const homeDir = ProfileCredentialProvider.getHomeDirProfile();
        files[homeDir] = testIni;
        mock(files);

        const config = new ClientConfig();
        config.profileName = "entity";
        const loginCreds = ProfileCredentialProvider.getLoginCredentials(config);

        chai.assert.equal(loginCreds.companyId, "inicompanyid");
        chai.assert.equal(loginCreds.entityId, "inientityid");
        chai.assert.equal(loginCreds.userId, "iniuserid");
        chai.assert.equal(loginCreds.userPassword, "iniuserpass");

        done();
    });

    it("should return no credentials from missing ini", () => {
        const files = {};
        // const homeDir = ProfileCredentialProvider.getHomeDirProfile();
        // files[homeDir] = testIni;
        mock(files);

        const config = new ClientConfig();
        config.profileName = "unittest";
        const loginCreds = ProfileCredentialProvider.getLoginCredentials(config);

        chai.assert.isUndefined(loginCreds.companyId);
        chai.assert.isUndefined(loginCreds.entityId);
        chai.assert.isUndefined(loginCreds.userId);
        chai.assert.isUndefined(loginCreds.userPassword);
    });
});
