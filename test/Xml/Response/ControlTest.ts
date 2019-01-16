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
import Control from "../../../src/Xml/Response/Control";
import MockAbstractResponse from "../MockAbstractResponse";

describe("Control", () => {
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
</response>`;

        const response = new MockAbstractResponse(xml);
        const control = response.control;

        chai.assert.equal(control.senderId, "testsenderid");
        chai.assert.equal(control.controlId, "ControlIdHere");
        chai.assert.equal(control.uniqueId, "false");
        chai.assert.equal(control.dtdVersion, "3.0");
    });
    it("should throw exception when status is not included", () => {
        chai.assert.throws(
            () => {
                const xml = `<?xml version="1.0" encoding="utf-8" ?>
<response>
      <control />
</response>`;
                return new MockAbstractResponse(xml);
            },
            Error,
            "Control block is missing status element",
        );
    });
});
