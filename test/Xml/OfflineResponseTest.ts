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
import IntacctException from "../../src/Exceptions/IntacctException";
import OfflineResponse from "../../src/Xml/OfflineResponse";

describe("OfflineResponse", () => {
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
      <acknowledgement>
            <status>success</status>
      </acknowledgement>
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>ControlIdHere</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
</response>`;

        const response = new OfflineResponse(xml);
        chai.assert.equal(response.status, "success");
    });
    it("should throw exception with missing acknowledgement block", () => {
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
                return new OfflineResponse(xml);
            },
            IntacctException,
            "Response block is missing acknowledgement block",
        );
    });
    it("should throw exception with missing acknowledgement block", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="UTF-8"?>
<response>
      <acknowledgement />
      <control>
            <status>success</status>
            <senderid>testsenderid</senderid>
            <controlid>ControlIdHere</controlid>
            <uniqueid>false</uniqueid>
            <dtdversion>3.0</dtdversion>
      </control>
</response>`;
                return new OfflineResponse(xml);
            },
            IntacctException,
            "Acknowledgement block is missing status element",
        );
    });
});
