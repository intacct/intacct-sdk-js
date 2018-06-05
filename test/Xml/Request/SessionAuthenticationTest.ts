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
import SessionAuthentication from "../../../src/Xml/Request/SessionAuthentication";
import XmlObjectTestHelper from "../XmlObjectTestHelper";

describe("SessionAuthentication", () => {
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
    it("should set sessionId", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <authentication>
        <sessionid>testsessionid..</sessionid>
    </authentication>
</test>`;

        const sessionAuth = new SessionAuthentication("testsessionid..");

        XmlObjectTestHelper.CompareXml(expected, sessionAuth);
    });
    it("should throw exception when sessionid is null", () => {
        chai.assert.throws(
            () => {
                return new SessionAuthentication("");
            },
            Error,
            "Session ID is required and cannot be blank",
        );
    });
});
