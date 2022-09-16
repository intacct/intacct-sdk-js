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

import UserUpdate from "../../../src/Functions/Company/UserUpdate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("UserUpdate", () => {
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
    it("should build UserUpdate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <USERINFO>
                <LOGINID>U1234</LOGINID>
            </USERINFO>
        </update>
    </function>
</test>`;

        const record = new UserUpdate();
        record.controlId = "unittest";
        record.userId = "U1234";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build UserUpdate object with restrictions", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <USERINFO>
                <LOGINID>U1234</LOGINID>
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
        </update>
    </function>
</test>`;

        const record = new UserUpdate();
        record.controlId = "unittest";
        record.userId = "U1234";
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
