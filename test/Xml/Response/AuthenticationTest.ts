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
import IntacctException from "../../../src/Exceptions/IntacctException";
import OnlineResponse from "../../../src/Xml/OnlineResponse";
import Authentication from "../../../src/Xml/Response/Authentication";

describe("Authentication", () => {
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
    it("should set status from acknowledgement", () => {
        const xml = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>ControlIdHere</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>fakeuser</userid>
                  <companyid>fakecompany</companyid>
                  <sessiontimestamp>2015-10-24T18:56:52-07:00</sessiontimestamp>
            </authentication>
            <result>
                  <status>success</status>
                  <function>getAPISession</function>
                  <controlid>testControlId</controlid>
                  <data>
                        <api>
                              <sessionid>faKEsesSiOnId..</sessionid>
                              <endpoint>https://api.intacct.com/ia/xml/xmlgw.phtml</endpoint>
                        </api>
                  </data>
            </result>
      </operation>
</response>`;

        const response = new OnlineResponse(xml);
        const authentication = response.authentication;
        chai.assert.equal(authentication.status, "success");
        chai.assert.equal(authentication.userId, "fakeuser");
        chai.assert.equal(authentication.companyId, "fakecompany");
    });
    it("should throw exception when status is not included", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>ControlIdHere</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <!--<status>success</status>-->
                  <userid>fakeuser</userid>
                  <companyid>fakecompany</companyid>
                  <sessiontimestamp>2015-10-24T18:56:52-07:00</sessiontimestamp>
            </authentication>
            <result/>
      </operation>
</response>`;
                return new OnlineResponse(xml);
            },
            IntacctException,
            "Authentication block is missing status element",
        );
    });
    it("should throw exception when userid is not included", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>ControlIdHere</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <!--<userid>fakeuser</userid>-->
                  <companyid>fakecompany</companyid>
                  <sessiontimestamp>2015-10-24T18:56:52-07:00</sessiontimestamp>
            </authentication>
            <result/>
      </operation>
</response>`;
                return new OnlineResponse(xml);
            },
            IntacctException,
            "Authentication block is missing userid element",
        );
    });
    it("should throw exception when companyid is not included", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>ControlIdHere</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation>
            <authentication>
                  <status>success</status>
                  <userid>fakeuser</userid>
                  <!--<companyid>fakecompany</companyid>-->
                  <sessiontimestamp>2015-10-24T18:56:52-07:00</sessiontimestamp>
            </authentication>
            <result/>
      </operation>
</response>`;
                return new OnlineResponse(xml);
            },
            IntacctException,
            "Authentication block is missing companyid element",
        );
    });
});
