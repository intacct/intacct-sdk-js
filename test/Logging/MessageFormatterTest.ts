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
import MessageFormatter from "../../src/Logging/MessageFormatter";

describe("MessageFormatter", () => {
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
    it("should format string to redact specific text", () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<request>
    <control>
        <senderid>sensitiveSenderId</senderid>
        <password>sender_password</password>
        <controlid>timestamp</controlid>
        <uniqueid>false</uniqueid>
        <dtdversion>3.0</dtdversion>
        <includewhitespace>false</includewhitespace>
    </control>
    <operation>
        <authentication>
            <login>
                <userid>sensitiveUserId</userid>
                <companyid>companyId</companyid>
                <password>user_password</password>
            </login>
        </authentication>
        <content>
            <function controlid="9209530295623">
                <getAPISession />
            </function>
        </content>
    </operation>
</request>`;
        const redactedXml = `<?xml version="1.0" encoding="UTF-8"?>
<request>
    <control>
        <senderid>sensitiveSenderId</senderid>
        <password>REDACTED</password>
        <controlid>timestamp</controlid>
        <uniqueid>false</uniqueid>
        <dtdversion>3.0</dtdversion>
        <includewhitespace>false</includewhitespace>
    </control>
    <operation>
        <authentication>
            <login>
                <userid>sensitiveUserId</userid>
                <companyid>companyId</companyid>
                <password>REDACTED</password>
            </login>
        </authentication>
        <content>
            <function controlid="9209530295623">
                <getAPISession />
            </function>
        </content>
    </operation>
</request>`;
        const redactedMessage = MessageFormatter.maskSensitiveData(xml, {});
        chai.assert.equal(redactedMessage.msg, redactedXml);
    });
});
