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
import ProfileCredentialProvider from "../../src/Credentials/ProfileCredentialProvider";

describe("ProfileCredentialsProvider", () => {
    before((done) => {
        return done();
    });
    beforeEach((done) => {
        const ini = "[default]\n" +
            "sender_id = defsenderid\n" +
            "sender_password = defsenderpass\n" +
            "company_id = defcompanyid\n" +
            "user_id = defuserid\n" +
            "user_password = defuserpass\n" +
            "endpoint_url = https://unittest.intacct.com/ia/xmlgw.phtml\n\n" +
            "[unittest]\n" +
            "company_id = inicompanyid\n" +
            "user_id = iniuserid\n" +
            "user_password = iniuserpass\n";
        const files = {};
        const homeDir = ProfileCredentialProvider.getHomeDirProfile();
        files[homeDir] = ini;
        mock(files);
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
        const config = new ClientConfig();
        const loginCreds = ProfileCredentialProvider.getLoginCredentials(config);

        chai.assert.equal(loginCreds.companyId, "defcompanyid");
        chai.assert.equal(loginCreds.userId, "defuserid");
        chai.assert.equal(loginCreds.userPassword, "defuserpass");

        const senderCreds = ProfileCredentialProvider.getSenderCredentials(config);

        chai.assert.equal(senderCreds.senderId, "defsenderid");
        chai.assert.equal(senderCreds.senderPassword, "defsenderpass");
        chai.assert.equal(senderCreds.endpointUrl, "https://unittest.intacct.com/ia/xmlgw.phtml");

        done();
    });

    it("should return credentials from a specific profile", (done) => {
        const config = new ClientConfig();
        config.profileName = "unittest";
        const loginCreds = ProfileCredentialProvider.getLoginCredentials(config);

        chai.assert.equal(loginCreds.companyId, "inicompanyid");
        chai.assert.equal(loginCreds.userId, "iniuserid");
        chai.assert.equal(loginCreds.userPassword, "iniuserpass");

        done();
    });

    it("should throw exception on invalid profile name", () => {
        chai.assert.throws(
            () => {
                const config = new ClientConfig();
                config.profileName = "wrongname";
                return ProfileCredentialProvider.getLoginCredentials(config);
            },
            Error,
            'Profile Name "wrongname" not found in credentials file',
        );
    });
});
