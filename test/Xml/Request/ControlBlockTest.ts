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
import ClientConfig from "../../../src/ClientConfig";
import RequestConfig from "../../../src/RequestConfig";
import ControlBlock from "../../../src/Xml/Request/ControlBlock";
import XmlObjectTestHelper from "../XmlObjectTestHelper";

describe("ControlBlock", () => {
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
    it("should set defaults", () => {
        const clientConfig = new ClientConfig();
        clientConfig.senderId = "testsenderid";
        clientConfig.senderPassword = "pass123!";

        const requestConfig = new RequestConfig();
        requestConfig.controlId = "unittest";

        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <control>
        <senderid>testsenderid</senderid>
        <password>pass123!</password>
        <controlid>unittest</controlid>
        <uniqueid>false</uniqueid>
        <dtdversion>3.0</dtdversion>
        <includewhitespace>false</includewhitespace>
    </control>
</test>`;

        const controlBlock = new ControlBlock(clientConfig, requestConfig);

        XmlObjectTestHelper.CompareXml(expected, controlBlock);
    });
    it("should throw exception when sender id is blank", () => {
        chai.assert.throws(
            () => {
                const clientConfig = new ClientConfig();
                clientConfig.senderId = null;
                const config = new RequestConfig();
                return new ControlBlock(clientConfig, config);
            },
            Error,
            "Sender ID is required and cannot be blank",
        );
    });
    it("should throw exception when sender password is not provided", () => {
        chai.assert.throws(
            () => {
                const clientConfig = new ClientConfig();
                clientConfig.senderId = "testsenderid";
                const config = new RequestConfig();
                return new ControlBlock(clientConfig, config);
            },
            Error,
            "Sender Password is required and cannot be blank",
        );
    });
    it("should allow overriding defaults", () => {
        const clientConfig = new ClientConfig();
        clientConfig.senderId = "testsenderid";
        clientConfig.senderPassword = "pass123!";

        const requestConfig = new RequestConfig();
        requestConfig.controlId = "testcontrol";
        requestConfig.uniqueId = true;
        requestConfig.policyId = "testpolicy";

        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <control>
        <senderid>testsenderid</senderid>
        <password>pass123!</password>
        <controlid>testcontrol</controlid>
        <uniqueid>true</uniqueid>
        <dtdversion>3.0</dtdversion>
        <policyid>testpolicy</policyid>
        <includewhitespace>false</includewhitespace>
    </control>
</test>`;

        const controlBlock = new ControlBlock(clientConfig, requestConfig);

        XmlObjectTestHelper.CompareXml(expected, controlBlock);
    });
    it("should throw exception when control id is too long", () => {
        chai.assert.throws(
            () => {
            const config = new ClientConfig();
            config.senderId = "testSender";
            config.senderPassword = "testPassword";

            const requestConfig = new RequestConfig();
            requestConfig.controlId = "123456789012345678901234567890123456789012345678901234567890123456789" +
                "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
                "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
                "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
            return new ControlBlock(config, requestConfig);
        },
        Error,
            "Request control ID must be between 1 and 256 characters in length.",
        );
    });
});
