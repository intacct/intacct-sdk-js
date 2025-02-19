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

import * as chai from "chai";
import IntacctException from "../../../src/Exceptions/IntacctException";
import ResultException from "../../../src/Exceptions/ResultException";
import OnlineResponse from "../../../src/Xml/OnlineResponse";
import Result from "../../../src/Xml/Response/Result";

describe("Result", () => {
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
    it("should return success status", () => {
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
                  <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
                  <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
            </authentication>
            <result>
                  <status>success</status>
                  <function>readByQuery</function>
                  <controlid>testControlId</controlid>
                  <data listtype="department" count="0" totalcount="0" numremaining="0" resultId=""/>
            </result>
      </operation>
</response>`;

        const response = new OnlineResponse(xml);
        const result = response.results[0];
        chai.assert.instanceOf(result, Result);
        chai.assert.equal(result.status, "success");
        chai.assert.equal(result.functionName, "readByQuery");
        chai.assert.equal(result.controlId, "testControlId");
        chai.assert.isArray(result.data);
        result.ensureStatusSuccess();
    });
    it("should return failure status and errors", () => {
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
                  <sessiontimestamp>2015-10-25T11:07:22-07:00</sessiontimestamp>
                  <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
            </authentication>
            <result>
                  <status>failure</status>
                  <function>readByQuery</function>
                  <controlid>testControlId</controlid>
                  <errormessage>
                        <error>
                              <errorno>Query Failed</errorno>
                              <description></description>
                              <description2>Object definition BADOBJECT not found</description2>
                              <correction></correction>
                        </error>
                  </errormessage>
            </result>
      </operation>
</response>`;

        const response = new OnlineResponse(xml);
        const result = response.results[0];
        chai.assert.equal(result.status, "failure");
        chai.assert.isArray(result.errors);
        chai.assert.isString(result.errors[0]);
    });
    it("should throw error for missing status element", () => {
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
                  <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
                  <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
            </authentication>
            <result>
                  <!--<status>success</status>-->
                  <function>readByQuery</function>
                  <controlid>testControlId</controlid>
                  <data listtype="department" count="0" totalcount="0" numremaining="0" resultId="" />
            </result>
      </operation>
</response>`;

                return new OnlineResponse(xml);
            },
            IntacctException,
            "Response result block is missing status element",
        );
    });
    it("should throw error for missing function element", () => {
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
                  <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
                  <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
            </authentication>
            <result>
                  <status>success</status>
                  <!--<function>readByQuery</function>-->
                  <controlid>testControlId</controlid>
                  <data listtype="department" count="0" totalcount="0" numremaining="0" resultId=""/>
            </result>
      </operation>
</response>`;

                return new OnlineResponse(xml);
            },
            IntacctException,
            "Response result block is missing function element",
        );
    });
    it("should throw error for missing controlid element", () => {
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
            <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
            <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
        </authentication>
        <result>
            <status>success</status>
            <function>readByQuery</function>
            <!--<controlid>testControlId</controlid>-->
            <data listtype="department" count="0" totalcount="0" numremaining="0" resultId=""/>
        </result>
    </operation>
</response>`;

                return new OnlineResponse(xml);
            },
            IntacctException,
            "Response result block is missing controlid element",
        );
    });
    it("should throw error for result status as failure", () => {
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
            <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
            <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
        </authentication>
        <result>
            <status>failure</status>
            <function>read</function>
            <controlid>testFunctionId</controlid>
            <errormessage>
                <error>
                    <errorno>XXX</errorno>
                    <description></description>
                    <description2>Object definition VENDOR2 not found</description2>
                    <correction></correction>
                </error>
            </errormessage>
        </result>
    </operation>
</response>`;

                const response = new OnlineResponse(xml);
                const result = response.results[0];
                result.ensureStatusNotFailure();
            },
            ResultException,
            "Result status: failure for Control ID: testFunctionId - XXX Object definition VENDOR2 not found",
        );
    });
    it("should throw error for result status as aborted", () => {
        chai.assert.throws(
            () => {
                // tslint:disable:max-line-length
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
            <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
            <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
        </authentication>
        <result>
            <status>aborted</status>
            <function>readByQuery</function>
            <controlid>testFunctionId</controlid>
            <errormessage>
                <error>
                    <errorno>Query Failed</errorno>
                    <description></description>
                    <description2>Object definition VENDOR9 not found</description2>
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

                const response = new OnlineResponse(xml);
                const result = response.results[0];
                result.ensureStatusSuccess();
            },
            ResultException,
            "Result status: aborted for Control ID: testFunctionId - Query Failed Object definition VENDOR9 not found - XL03000009 The entire transaction in this operation has been rolled back due to an error.",
        );
    });
    it("should not throw error for result status as aborted", () => {
        // tslint:disable:max-line-length
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
            <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
            <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
        </authentication>
        <result>
            <status>aborted</status>
            <function>readByQuery</function>
            <controlid>testFunctionId</controlid>
            <errormessage>
                <error>
                    <errorno>Query Failed</errorno>
                    <description></description>
                    <description2>Object definition VENDOR9 not found</description2>
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

        const response = new OnlineResponse(xml);
        const result = response.results[0];
        chai.assert.doesNotThrow(() => {
            result.ensureStatusNotFailure();
        });
    });
    it("should parse get list class response", () => {
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
            <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
            <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
        </authentication>
        <result>
            <status>success</status>
            <function>get_list</function>
            <controlid>ccdeafa7-4f22-49ae-b6ae-b5e1a39423e7</controlid>
            <listtype start="0" end="1" total="2">class</listtype>
            <data>
                <class>
                    <key>C1234</key>
                    <name>hello world</name>
                    <description/>
                    <parentid/>
                    <whenmodified>07/24/2018 15:19:46</whenmodified>
                    <status>active</status>
                </class>
                <class>
                    <key>C1235</key>
                    <name>hello world</name>
                    <description/>
                    <parentid/>
                    <whenmodified>07/24/2018 15:20:27</whenmodified>
                    <status>active</status>
                </class>
            </data>
        </result>
    </operation>
</response>`;

        const response = new OnlineResponse(xml);
        const result = response.getResult();

        chai.assert.equal(result.start, 0);
        chai.assert.equal(result.end, 1);
        chai.assert.equal(result.totalCount, 2);
        chai.assert.equal(result.data.length, 2);
    });
    it("should parse readByQuery response", () => {
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
                  <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
                  <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
            </authentication>
            <result>
                <status>success</status>
                <function>readByQuery</function>
                <controlid>818b0a96-3faf-4931-97e6-1cf05818ea44</controlid>
                <data listtype="class" count="1" totalcount="2" numremaining="1" offset="0" resultId="myResultId">
                    <class>
                        <RECORDNO>8</RECORDNO>
                        <CLASSID>C1234</CLASSID>
                        <NAME>hello world</NAME>
                        <DESCRIPTION></DESCRIPTION>
                        <STATUS>active</STATUS>
                        <PARENTKEY></PARENTKEY>
                        <PARENTID></PARENTID>
                        <PARENTNAME></PARENTNAME>
                        <WHENCREATED>07/24/2017 15:19:46</WHENCREATED>
                        <WHENMODIFIED>07/24/2017 15:19:46</WHENMODIFIED>
                        <CREATEDBY>9</CREATEDBY>
                        <MODIFIEDBY>9</MODIFIEDBY>
                        <MEGAENTITYKEY></MEGAENTITYKEY>
                        <MEGAENTITYID></MEGAENTITYID>
                        <MEGAENTITYNAME></MEGAENTITYNAME>
                    </class>
                </data>
            </result>
      </operation>
</response>`;

        const response = new OnlineResponse(xml);
        const result = response.results[0];

        chai.assert.equal(result.count, 1);
        chai.assert.equal(result.totalCount, 2);
        chai.assert.equal(result.numRemaining, 1);
        chai.assert.equal(result.offset, 0);
        chai.assert.equal(result.resultId, "myResultId");
        chai.assert.equal(result.data.length, 1);
    });
    it("should parse readByQuery response with multiple records", () => {
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
                  <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
                  <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
            </authentication>
            <result>
                <status>success</status>
                <function>readByQuery</function>
                <controlid>818b0a96-3faf-4931-97e6-1cf05818ea44</controlid>
                <data listtype="class" count="2" totalcount="3" numremaining="1" offset="0" resultId="myResultId">
                    <class>
                        <RECORDNO>8</RECORDNO>
                        <CLASSID>C1234</CLASSID>
                        <NAME>hello world</NAME>
                        <DESCRIPTION></DESCRIPTION>
                        <STATUS>active</STATUS>
                        <PARENTKEY></PARENTKEY>
                        <PARENTID></PARENTID>
                        <PARENTNAME></PARENTNAME>
                        <WHENCREATED>07/24/2017 15:19:46</WHENCREATED>
                        <WHENMODIFIED>07/24/2017 15:19:46</WHENMODIFIED>
                        <CREATEDBY>9</CREATEDBY>
                        <MODIFIEDBY>9</MODIFIEDBY>
                        <MEGAENTITYKEY></MEGAENTITYKEY>
                        <MEGAENTITYID></MEGAENTITYID>
                        <MEGAENTITYNAME></MEGAENTITYNAME>
                    </class>
                    <class>
                        <RECORDNO>9</RECORDNO>
                        <CLASSID>C1235</CLASSID>
                        <NAME>hello world2</NAME>
                        <DESCRIPTION></DESCRIPTION>
                        <STATUS>active</STATUS>
                        <PARENTKEY></PARENTKEY>
                        <PARENTID></PARENTID>
                        <PARENTNAME></PARENTNAME>
                        <WHENCREATED>07/24/2017 15:19:46</WHENCREATED>
                        <WHENMODIFIED>07/24/2017 15:19:46</WHENMODIFIED>
                        <CREATEDBY>9</CREATEDBY>
                        <MODIFIEDBY>9</MODIFIEDBY>
                        <MEGAENTITYKEY></MEGAENTITYKEY>
                        <MEGAENTITYID></MEGAENTITYID>
                        <MEGAENTITYNAME></MEGAENTITYNAME>
                    </class>
                </data>
            </result>
      </operation>
</response>`;

        const response = new OnlineResponse(xml);
        const result = response.results[0];

        chai.assert.equal(result.count, 2);
        chai.assert.equal(result.totalCount, 3);
        chai.assert.equal(result.numRemaining, 1);
        chai.assert.equal(result.offset, 0);
        chai.assert.equal(result.resultId, "myResultId");
        chai.assert.equal(result.data.length, 2);
    });
    it("should parse legacy create class key response", () => {
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
            <sessiontimestamp>2015-10-25T10:08:34-07:00</sessiontimestamp>
            <sessiontimeout>2015-10-26T10:08:34-07:00</sessiontimeout>
        </authentication>
        <result>
            <status>success</status>
            <function>create_class</function>
            <controlid>d4814563-1e97-4708-b9c5-9a49569d2a0d</controlid>
            <key>C1234</key>
        </result>
    </operation>
</response>`;

        const response = new OnlineResponse(xml);
        const result = response.results[0];

        chai.assert.equal(result.key, "C1234");
    });
});
