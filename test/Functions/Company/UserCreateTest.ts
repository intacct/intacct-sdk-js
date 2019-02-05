/**
 * Copyright 2019 Sage Intacct, Inc.
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

import UserCreate from "../../../src/Functions/Company/UserCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("UserCreate", () => {
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
    it("should build UserCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <USERINFO>
                <LOGINID>U1234</LOGINID>
                <USERTYPE>business user</USERTYPE>
                <CONTACTINFO>
                    <LASTNAME>Last</LASTNAME>
                    <FIRSTNAME>First</FIRSTNAME>
                    <EMAIL1>noreply@intacct.com</EMAIL1>
                </CONTACTINFO>
            </USERINFO>
        </create>
    </function>
</test>`;

        const record = new UserCreate();
        record.controlId = "unittest";
        record.userId = "U1234";
        record.userType = "business user";
        record.lastName = "Last";
        record.firstName = "First";
        record.primaryEmailAddress = "noreply@intacct.com";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build UserCreate object with restrictions", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <USERINFO>
                <LOGINID>U1234</LOGINID>
                <USERTYPE>business user</USERTYPE>
                <CONTACTINFO>
                    <LASTNAME>Last</LASTNAME>
                    <FIRSTNAME>First</FIRSTNAME>
                    <EMAIL1>noreply@intacct.com</EMAIL1>
                </CONTACTINFO>
                <USERLOCATIONS>
                    <LOCATIONID>E100</LOCATIONID>
                </USERLOCATIONS>
                <USERLOCATIONS>
                    <LOCATIONID>E200</LOCATIONID>
                </USERLOCATIONS>
                <USERDEPARTMENTS>
                    <DEPARTMENTID>D100</DEPARTMENTID>
                </USERDEPARTMENTS>
                <USERDEPARTMENTS>
                    <DEPARTMENTID>D200</DEPARTMENTID>
                </USERDEPARTMENTS>
            </USERINFO>
        </create>
    </function>
</test>`;

        const record = new UserCreate();
        record.controlId = "unittest";
        record.userId = "U1234";
        record.userType = "business user";
        record.lastName = "Last";
        record.firstName = "First";
        record.primaryEmailAddress = "noreply@intacct.com";
        record.restrictedEntities = [
            "E100",
            "E200",
        ];
        record.restrictedDepartments = [
            "D100",
            "D200",
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
