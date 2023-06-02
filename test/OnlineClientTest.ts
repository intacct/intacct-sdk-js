/**
 * Copyright 2022 Sage Intacct, Inc.
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

import { rejects } from "assert";
import * as chai from "chai";
import * as nock from "nock";
import * as winston from "winston";
import ClientConfig from "../src/ClientConfig";
import ResultException from "../src/Exceptions/ResultException";
import ApiSessionCreate from "../src/Functions/ApiSessionCreate";
import ReadByQuery from "../src/Functions/Common/ReadByQuery";
import OnlineClient from "../src/OnlineClient";
import RequestConfig from "../src/RequestConfig";

describe("OnlineClient", () => {
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
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>requestUnitTest</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>testuser</userid>
                  <companyid>testcompany</companyid>
                  <locationid></locationid>
                  <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
                  <sessiontimeout>2015-12-07T15:57:08-08:00</sessiontimeout>
            </authentication>
            <result>
                  <status>success</status>
                  <function>getAPISession</function>
                  <controlid>func1UnitTest</controlid>
                  <data>
                        <api>
                              <sessionid>unittest..</sessionid>
                              <endpoint>https://unittest.intacct.com/ia/xml/xmlgw.phtml</endpoint>
                              <locationid></locationid>
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
        config.senderId = "testsender";
        config.senderPassword = "testsendpass";
        config.sessionId = "testsession..";

        const client = new OnlineClient(config);

        const response = await client.execute(new ApiSessionCreate("func1UnitTest"));
        chai.assert.equal(response.control.controlId, "requestUnitTest");
    });
    it("should execute a request and return ResultException", async () => {
        const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>requestUnitTest</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>testuser</userid>
                  <companyid>testcompany</companyid>
                  <locationid></locationid>
                  <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
                  <sessiontimeout>2015-12-07T15:57:08-08:00</sessiontimeout>
            </authentication>
            <result>
                  <status>failure</status>
                  <function>getAPISession</function>
                  <controlid>func1UnitTest</controlid>
                  <errormessage>
                        <error>
                              <errorno>Get API Session Failed</errorno>
                              <description></description>
                              <description2>Something went wrong</description2>
                              <correction></correction>
                        </error>
                  </errormessage>
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
        config.senderId = "testsender";
        config.senderPassword = "testsendpass";
        config.sessionId = "testsession..";

        const client = new OnlineClient(config);
        try {
            await client.execute(new ApiSessionCreate("func1UnitTest"));
            chai.assert.isOk(false, "Expected exception not thrown");
        } catch (ex) {
            chai.assert.instanceOf(ex, ResultException);
            chai.assert.equal(ex.message,
                "Result status: failure for Control ID: func1UnitTest - Get API Session Failed Something went wrong");
        }
    });
    it("should execute a batch transaction request and return ResultException", async () => {
        // tslint:disable:max-line-length
        const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>requestUnitTest</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>testuser</userid>
                  <companyid>testcompany</companyid>
                  <locationid></locationid>
                  <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
                  <sessiontimeout>2015-12-07T15:57:08-08:00</sessiontimeout>
            </authentication>
            <result>
                  <status>aborted</status>
                  <function>getAPISession</function>
                  <controlid>func1UnitTest</controlid>
                  <errormessage>
                          <error>
                                <errorno>XL03000009</errorno>
                                <description></description>
                                <description2>The entire transaction in this operation has been rolled back due to an error.</description2>
                                <correction></correction>
                          </error>
                  </errormessage>
            </result>
            <result>
                  <status>failure</status>
                  <function>getAPISession</function>
                  <controlid>func2UnitTest</controlid>
                  <errormessage>
                        <error>
                              <errorno>Get API Session Failed</errorno>
                              <description></description>
                              <description2>Something went wrong</description2>
                              <correction></correction>
                        </error>
                          <error>
                                <errorno>XL03000009</errorno>
                                <description></description>
                                <description2>The entire transaction in this operation has been rolled back due to an error.</description2>
                                <correction></correction>
                          </error>
                  </errormessage>
            </result>
      </operation>
</response>`;
        // tslint:enable:max-line-length

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
        requestConfig.transaction = true;

        const content = [
            new ApiSessionCreate("func1UnitTest"),
            new ApiSessionCreate("func2UnitTest"),
        ];

        const client = new OnlineClient(config);
        try {
            await client.executeBatch(content, requestConfig);
            chai.assert.isOk(false, "Expected exception not thrown");
        } catch (ex) {
            chai.assert.instanceOf(ex, ResultException);
            chai.assert.equal(ex.message,
                "Result status: failure for Control ID: func2UnitTest - " +
                "Get API Session Failed Something went wrong - " +
                "XL03000009 The entire transaction in this operation has been rolled back due to an error.");
        }
    });
    it('should execute a request with the Sage App ID from config', async () => {
      const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
      <response>
            <control>
                  <status>success</status>
                  <senderid>testsenderid</senderid>
                  <controlid>requestUnitTest</controlid>
                  <uniqueid>false</uniqueid>
                  <dtdversion>3.0</dtdversion>
            </control>
            <operation>
                  <authentication>
                        <status>success</status>
                        <userid>testuser</userid>
                        <companyid>testcompany</companyid>
                        <locationid></locationid>
                        <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
                        <sessiontimeout>2015-12-07T15:57:08-08:00</sessiontimeout>
                  </authentication>
                  <result>
                      <status>success</status>
                      <function>readByQuery</function>
                      <controlid>func1UnitTest</controlid>
                      <data listtype="customer" count="1" totalcount="1" numremaining="0" resultId="">
                          <customer>
                              <CUSTOMERID>C0001</CUSTOMERID>
                              <NAME>Intacct Corporation</NAME>
                          </customer>
                      </data>
                  </result>
            </operation>
      </response>`;
      const headers = {
          "Content-Type": 'text/xml; encoding="UTF-8"',
      };

      nock.disableNetConnect();
      nock("https://api.intacct.com", {
            reqheaders: {
                  "x-sage-app-id": "testAppId",
            },
      })
          .replyContentLength()
          .post("/ia/xml/xmlgw.phtml")
          .reply(200, xmlResponse, headers);

      process.env.INTACCT_SAGE_APP_ID = "testAppId";
      const config = new ClientConfig();
      config.senderId = "testsender";
      config.senderPassword = "testsendpass";
      config.sessionId = "testsession..";

      const client = new OnlineClient(config);

      const response = await client.execute(new ReadByQuery("func1UnitTest"));
      chai.assert.equal(response.getResult().data[0].CUSTOMERID, "C0001");
      process.env.INTACCT_SAGE_APP_ID = "";
    });

    it('should execute a request with the Sage App ID from environment variable', async () => {
      const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
      <response>
            <control>
                  <status>success</status>
                  <senderid>testsenderid</senderid>
                  <controlid>requestUnitTest</controlid>
                  <uniqueid>false</uniqueid>
                  <dtdversion>3.0</dtdversion>
            </control>
            <operation>
                  <authentication>
                        <status>success</status>
                        <userid>testuser</userid>
                        <companyid>testcompany</companyid>
                        <locationid></locationid>
                        <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
                        <sessiontimeout>2015-12-07T15:57:08-08:00</sessiontimeout>
                  </authentication>
                  <result>
                      <status>success</status>
                      <function>readByQuery</function>
                      <controlid>func1UnitTest</controlid>
                      <data listtype="customer" count="1" totalcount="1" numremaining="0" resultId="">
                          <customer>
                              <CUSTOMERID>C0001</CUSTOMERID>
                              <NAME>Intacct Corporation</NAME>
                          </customer>
                      </data>
                  </result>
            </operation>
      </response>`;
      const headers = {
          "Content-Type": 'text/xml; encoding="UTF-8"',
      };

      nock.disableNetConnect();
      nock("https://api.intacct.com", {
            reqheaders: {
                  "x-sage-app-id": "testAppId",
            },
      })
          .replyContentLength()
          .post("/ia/xml/xmlgw.phtml")
          .reply(200, xmlResponse, headers);
          
      process.env.INTACCT_SAGE_APP_ID = "testAppId";
      const config2 = new ClientConfig();
      config2.senderId = "testsender";
      config2.senderPassword = "testsendpass";
      config2.sessionId = "testsession..";
      // Omit config2.sageAppId
      

      const client2 = new OnlineClient(config2);
      const response2 = await client2.execute(new ReadByQuery("func1UnitTest"));
      chai.assert.equal(response2.getResult().data[0].CUSTOMERID, "C0001");
      process.env.INTACCT_SAGE_APP_ID = '';
    });
    it('should fail to execute a request with an incorrect Sage App ID', async () => {
      const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
      <response>
            <control>
                  <status>success</status>
                  <senderid>testsenderid</senderid>
                  <controlid>requestUnitTest</controlid>
                  <uniqueid>false</uniqueid>
                  <dtdversion>3.0</dtdversion>
            </control>
            <operation>
                  <authentication>
                        <status>success</status>
                        <userid>testuser</userid>
                        <companyid>testcompany</companyid>
                        <locationid></locationid>
                        <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
                        <sessiontimeout>2015-12-07T15:57:08-08:00</sessiontimeout>
                  </authentication>
                  <result>
                      <status>success</status>
                      <function>readByQuery</function>
                      <controlid>func1UnitTest</controlid>
                      <data listtype="customer" count="1" totalcount="1" numremaining="0" resultId="">
                          <customer>
                              <CUSTOMERID>C0001</CUSTOMERID>
                              <NAME>Intacct Corporation</NAME>
                          </customer>
                      </data>
                  </result>
            </operation>
      </response>`;
      const headers = {
          "Content-Type": 'text/xml; encoding="UTF-8"',
      };

      nock.disableNetConnect();
      nock("https://api.intacct.com", {
            reqheaders: {
                  "x-sage-app-id": "testAppId",
            },
      })
          .replyContentLength()
          .post("/ia/xml/xmlgw.phtml")
          .reply(200, xmlResponse, headers);

      const config = new ClientConfig();
      config.senderId = "testsender";
      config.senderPassword = "testsendpass";
      config.sessionId = "testsession..";
      config.sageAppId = "incorrectSageAppId";

      const client = new OnlineClient(config);
      await rejects(async () => await client.execute(new ReadByQuery("func1UnitTest")));
    });
    it("should log the request and response", async () => {
        const xmlResponse = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>requestUnitTest</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>testuser</userid>
                  <companyid>testcompany</companyid>
                  <locationid></locationid>
                  <sessiontimestamp>2015-12-06T15:57:08-08:00</sessiontimestamp>
                  <sessiontimeout>2015-12-07T15:57:08-08:00</sessiontimeout>
            </authentication>
            <result>
                <status>success</status>
                <function>readByQuery</function>
                <controlid>func1UnitTest</controlid>
                <data listtype="customer" count="1" totalcount="1" numremaining="0" resultId="">
                    <customer>
                        <CUSTOMERID>C0001</CUSTOMERID>
                        <NAME>Intacct Corporation</NAME>
                    </customer>
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

        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console({ level: "debug" }),
            ],
        });

        const config = new ClientConfig();
        config.senderId = "testsender";
        config.senderPassword = "testsendpass";
        config.sessionId = "testsession..";
        config.logger = logger;

        const client = new OnlineClient(config);

        await client.execute(new ReadByQuery("func1UnitTest"));

        chai.assert.isTrue(true); // TODO finish this test to check the log contains "<password>REDACTED</password>"
    });
});
