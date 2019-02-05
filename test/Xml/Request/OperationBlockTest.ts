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

import * as chai from "chai";
import ClientConfig from "../../../src/ClientConfig";
import ApiSessionCreate from "../../../src/Functions/ApiSessionCreate";
import RequestConfig from "../../../src/RequestConfig";
import OperationBlock from "../../../src/Xml/Request/OperationBlock";
import XmlObjectTestHelper from "../XmlObjectTestHelper";

describe("OperationBlock", () => {
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
    it("should set SessionAuthentication", () => {
        const clientConfig = new ClientConfig();
        clientConfig.sessionId = "fakesession..";

        const func = new ApiSessionCreate();
        func.controlId = "unittest";
        const contentBlock = [
            func,
        ];

        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <operation transaction="false">
        <authentication>
            <sessionid>fakesession..</sessionid>
        </authentication>
        <content>
            <function controlid="unittest">
                <getAPISession />
            </function>
        </content>
    </operation>
</test>`;

        const operationBlock = new OperationBlock(clientConfig, new RequestConfig(), contentBlock);

        XmlObjectTestHelper.CompareXml(expected, operationBlock);
    });
    it("should set LoginAuthentication", () => {
        const clientConfig = new ClientConfig();
        clientConfig.companyId = "testcompany";
        clientConfig.userId = "testuser";
        clientConfig.userPassword = "testpass";

        const func = new ApiSessionCreate();
        func.controlId = "unittest";
        const contentBlock = [
            func,
        ];

        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <operation transaction="false">
        <authentication>
            <login>
                <userid>testuser</userid>
                <companyid>testcompany</companyid>
                <password>testpass</password>
            </login>
        </authentication>
        <content>
            <function controlid="unittest">
                <getAPISession />
            </function>
        </content>
    </operation>
</test>`;

        const operationBlock = new OperationBlock(clientConfig, new RequestConfig(), contentBlock);

        XmlObjectTestHelper.CompareXml(expected, operationBlock);
    });
    it("should set Operation Transaction true", () => {
        const clientConfig = new ClientConfig();
        clientConfig.sessionId = "fakesession..";

        const requestConfig = new RequestConfig();
        requestConfig.transaction = true;

        const func = new ApiSessionCreate();
        func.controlId = "unittest";
        const contentBlock = [
            func,
        ];

        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <operation transaction="true">
        <authentication>
            <sessionid>fakesession..</sessionid>
        </authentication>
        <content>
            <function controlid="unittest">
                <getAPISession />
            </function>
        </content>
    </operation>
</test>`;

        const operationBlock = new OperationBlock(clientConfig, requestConfig, contentBlock);

        XmlObjectTestHelper.CompareXml(expected, operationBlock);
    });
    it("should throw exception when no authentication credentials are provided", () => {
        chai.assert.throws(
            () => {
                const clientConfig = new ClientConfig();
                return new OperationBlock(clientConfig, new RequestConfig(), []);
            },
            Error,
            "Authentication credentials [Company ID, User ID, and User Password] or [Session ID] " +
            "are required and cannot be blank.",
        );
    });
});
