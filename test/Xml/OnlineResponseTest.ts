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
import IntacctException from "../../src/Exceptions/IntacctException";
import ResponseException from "../../src/Exceptions/ResponseException";
import OnlineResponse from "../../src/Xml/OnlineResponse";
import Result from "../../src/Xml/Response/Result";

describe("OnlineResponse", () => {
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
    it("should parse response and verify acknowledgement is success", () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
                  <locationid></locationid>
                  <sessiontimestamp>2015-10-22T20:58:27-07:00</sessiontimestamp>
            </authentication>
            <result>
                  <status>success</status>
                  <function>getAPISession</function>
                  <controlid>testControlId</controlid>
                  <data>
                        <api>
                              <sessionid>fAkESesSiOnId..</sessionid>
                              <endpoint>https://api.intacct.com/ia/xml/xmlgw.phtml</endpoint>
                              <locationid></locationid>
                        </api>
                  </data>
            </result>
      </operation>
</response>`;

        const response = new OnlineResponse(xml);
        chai.assert.isArray(response.results);
        chai.assert.instanceOf(response.results[0], Result);
    });

    it("should throw exception with missing operation block", () => {
        chai.assert.throws(
        () => {
                const xml = `<?xml version="1.0" encoding="UTF-8"?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>ControlIdHere</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
</response>`;
                return new OnlineResponse(xml);
            },
            IntacctException,
            "Response block is missing operation block",
        );
    });
    it("should throw exception with authentication failure", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
                  <status>failure</status>
                  <userid>fakeuser</userid>
                  <companyid>fakecompany</companyid>
                  <locationid></locationid>
            </authentication>
            <errormessage>
                  <error>
                        <errorno>XL03000006</errorno>
                        <description></description>
                        <description2>Sign-in information is incorrect</description2>
                        <correction></correction>
                  </error>
            </errormessage>
      </operation>
</response>`;
                return new OnlineResponse(xml);
            },
            ResponseException,
            "Response authentication status failure - XL03000006 Sign-in information is incorrect",
        );
    });
    it("should throw exception with missing authentication block", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="UTF-8"?>
<response>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>ControlIdHere</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
      <operation/>
</response>`;
                return new OnlineResponse(xml);
            },
            IntacctException,
            "Authentication block is missing from operation element",
        );
    });
    it("should throw exception with missing result block", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
                  <locationid></locationid>
                  <sessiontimestamp>2015-10-22T20:58:27-07:00</sessiontimestamp>
            </authentication>
      </operation>
</response>`;
                return new OnlineResponse(xml);
            },
            Error,
            "Result block is missing from operation element",
        );
    });
    it("should throw response exception with errors", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="UTF-8"?>
<response>
    <control>
        <status>failure</status>
        <senderid></senderid>
        <controlid></controlid>
    </control>
    <errormessage>
        <error>
            <errorno>PL04000055</errorno>
            <description></description>
            <description2>This company is a demo company and has expired.</description2>
            <correction></correction>
        </error>
    </errormessage>
</response>`;
                return new OnlineResponse(xml);
            },
            ResponseException,
            "Response control status failure - PL04000055 This company is a demo company and has expired.",
        );
    });
});
