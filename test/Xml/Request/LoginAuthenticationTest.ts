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
import LoginAuthentication from "../../../src/Xml/Request/LoginAuthentication";
import XmlObjectTestHelper from "../XmlObjectTestHelper";

describe("LoginAuthentication", () => {
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
    it("should set companyId, userId, and password", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <authentication>
        <login>
            <userid>testuser</userid>
            <companyid>testcompany</companyid>
            <password>testpass</password>
        </login>
    </authentication>
</test>`;

        const loginAuthentication = new LoginAuthentication("testuser", "testcompany", "testpass");

        XmlObjectTestHelper.CompareXml(expected, loginAuthentication);
    });
    it("should set companyId, entityId, userId, and password", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <authentication>
        <login>
            <userid>testuser</userid>
            <companyid>testcompany</companyid>
            <password>testpass</password>
            <locationid>testentity</locationid>
        </login>
    </authentication>
</test>`;

        const loginAuthentication = new LoginAuthentication("testuser", "testcompany", "testpass", "testentity");

        XmlObjectTestHelper.CompareXml(expected, loginAuthentication);
    });
    it("should set companyId, empty entityId, userId, and password", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <authentication>
        <login>
            <userid>testuser</userid>
            <companyid>testcompany</companyid>
            <password>testpass</password>
            <locationid />
        </login>
    </authentication>
</test>`;

        const loginAuthentication = new LoginAuthentication("testuser", "testcompany", "testpass", "");

        XmlObjectTestHelper.CompareXml(expected, loginAuthentication);
    });
    it("should throw exception when companyid is null", () => {
        chai.assert.throws(
            () => {
                return new LoginAuthentication("testuser", "", "testpass");
            },
            Error,
            "Company ID is required and cannot be blank",
        );
    });
    it("should throw exception when user is not provided", () => {
        chai.assert.throws(
            () => {
                return new LoginAuthentication("", "testcompany", "testpass");
            },
            Error,
            "User ID is required and cannot be blank",
        );
    });
    it("should throw exception when password is not provided", () => {
        chai.assert.throws(
            () => {
                return new LoginAuthentication("testuser", "testcompany", "");
            },
            Error,
            "User Password is required and cannot be blank",
        );
    });
});
