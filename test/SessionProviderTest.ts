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
import * as nock from "nock";
import ClientConfig from "../src/ClientConfig";
import SessionProvider from "../src/SessionProvider";

describe("SessionProvider", () => {
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
    it("should execute from login credentials", async () => {
        const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>sessionProvider</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>testuser</userid>
                  <companyid>testcompany</companyid>
                  <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
            </authentication>
            <result>
                  <status>success</status>
                  <function>getSession</function>
                  <controlid>testControlId</controlid>
                  <data>
                        <api>
                              <sessionid>fAkESesSiOnId..</sessionid>
                              <endpoint>https://unittest.intacct.com/ia/xml/xmlgw.phtml</endpoint>
                        </api>
                  </data>
            </result>
      </operation>
</response>`;

        const headers = {
            "Content-Type": 'text/xml; encoding="UTF-8"',
        };

        nock.disableNetConnect();
        nock("https://api.intacct.com")
            .replyContentLength()
            .post("/ia/xml/xmlgw.phtml")
            .reply(200, xmlResponse, headers);

        const config = new ClientConfig();
        config.senderId = "testsenderid";
        config.senderPassword = "pass123!";
        config.companyId = "testcompany";
        config.userId = "testuser";
        config.userPassword = "testpass";

        const sessionCreds = await SessionProvider.factory(config);

        chai.assert.equal(sessionCreds.sessionId, "fAkESesSiOnId..");
        chai.assert.equal(sessionCreds.endpointUrl, "https://unittest.intacct.com/ia/xml/xmlgw.phtml");
    });
    it("should execute from session credentials", async () => {
        const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>sessionProvider</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>testuser</userid>
                  <companyid>testcompany</companyid>
                  <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
            </authentication>
            <result>
                  <status>success</status>
                  <function>getSession</function>
                  <controlid>testControlId</controlid>
                  <data>
                        <api>
                              <sessionid>fAkESesSiOnId..</sessionid>
                              <endpoint>https://unittest.intacct.com/ia/xml/xmlgw.phtml</endpoint>
                        </api>
                  </data>
            </result>
      </operation>
</response>`;

        const headers = {
            "Content-Type": 'text/xml; encoding="UTF-8"',
        };

        nock.disableNetConnect();
        nock("https://api.intacct.com")
            .replyContentLength()
            .post("/ia/xml/xmlgw.phtml")
            .reply(200, xmlResponse, headers);

        const config = new ClientConfig();
        config.senderId = "testsenderid";
        config.senderPassword = "pass123!";
        config.sessionId = "fAkESesSiOnId..";

        const sessionCreds = await SessionProvider.factory(config);

        chai.assert.equal(sessionCreds.sessionId, "fAkESesSiOnId..");
        chai.assert.equal(sessionCreds.endpointUrl, "https://unittest.intacct.com/ia/xml/xmlgw.phtml");
    });
    it("should execute from session credentials using an environment sender", async () => {
        const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>sessionProvider</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>testuser</userid>
                  <companyid>testcompany</companyid>
                  <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
            </authentication>
            <result>
                  <status>success</status>
                  <function>getSession</function>
                  <controlid>testControlId</controlid>
                  <data>
                        <api>
                              <sessionid>fAkESesSiOnId..</sessionid>
                              <endpoint>https://unittest.intacct.com/ia/xml/xmlgw.phtml</endpoint>
                        </api>
                  </data>
            </result>
      </operation>
</response>`;

        const headers = {
            "Content-Type": 'text/xml; encoding="UTF-8"',
        };

        nock.disableNetConnect();
        nock("https://api.intacct.com")
            .replyContentLength()
            .post("/ia/xml/xmlgw.phtml")
            .reply(200, xmlResponse, headers);

        const oldEnv = process.env;
        process.env.INTACCT_SENDER_ID = "envsender";
        process.env.INTACCT_SENDER_PASSWORD = "envpass";

        const config = new ClientConfig();
        config.sessionId = "fAkESesSiOnId..";

        const sessionCreds = await SessionProvider.factory(config);

        chai.assert.equal(sessionCreds.sessionId, "fAkESesSiOnId..");
        chai.assert.equal(sessionCreds.endpointUrl, "https://unittest.intacct.com/ia/xml/xmlgw.phtml");
        chai.assert.equal(sessionCreds.senderId, "envsender");
        chai.assert.equal(sessionCreds.senderPassword, "envpass");

        process.env = oldEnv;
    });
});
