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
import * as nock from "nock";
import ClientConfig from "../src/ClientConfig";
import ApiSessionCreate from "../src/Functions/ApiSessionCreate";
import OfflineClient from "../src/OfflineClient";
import RequestConfig from "../src/RequestConfig";

describe("OfflineClient", () => {
    before((done) => {
        chai.should();
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

    it("should execute a request", async () => {
        const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <acknowledgement>
            <status>success</status>
      </acknowledgement>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>requestUnitTest</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
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
        config.senderId = "testsender";
        config.senderPassword = "testsendpass";
        config.sessionId = "testsession..";

        const requestConfig = new RequestConfig();
        requestConfig.policyId = "asyncPolicyId";

        const client = new OfflineClient(config);

        const response = await client.execute(new ApiSessionCreate("func1UnitTest"), requestConfig);

        chai.assert.equal(response.control.controlId, "requestUnitTest");
    });
    it("should execute a batch transaction request", async () => {
        const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <acknowledgement>
            <status>success</status>
      </acknowledgement>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>requestUnitTest</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
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
        config.senderId = "testsender";
        config.senderPassword = "testsendpass";
        config.sessionId = "testsession..";

        const requestConfig = new RequestConfig();
        requestConfig.policyId = "asyncPolicyId";

        const client = new OfflineClient(config);

        const content = [
            new ApiSessionCreate("func1UnitTest"),
        ];

        const response = await client.executeBatch(content, requestConfig);

        chai.assert.equal(response.control.controlId, "requestUnitTest");
    });
});
