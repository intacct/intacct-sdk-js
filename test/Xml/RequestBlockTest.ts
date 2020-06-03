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
import ClientConfig from "../../src/ClientConfig";
import RequestConfig from "../../src/RequestConfig";
import RequestBlock from "../../src/Xml/RequestBlock";

describe("RequestBlock", () => {
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
    it("should generate a full request XML block", () => {
        // tslint:disable:max-line-length
        const expected = `<?xml version="1.0" encoding="utf-8" ?><request><control><senderid>testsenderid</senderid><password>pass123!</password><controlid>unittest</controlid><uniqueid>false</uniqueid><dtdversion>3.0</dtdversion><includewhitespace>false</includewhitespace></control><operation transaction="false"><authentication><sessionid>testsession..</sessionid></authentication><content /></operation></request>`;
        // tslint:enable:max-line-length

        const clientConfig = new ClientConfig();
        clientConfig.senderId = "testsenderid";
        clientConfig.senderPassword = "pass123!";
        clientConfig.sessionId = "testsession..";

        const requestConfig = new RequestConfig();
        requestConfig.controlId = "unittest";

        const contentBlock = [];

        const requestBlock = new RequestBlock(clientConfig, requestConfig, contentBlock);

        const actual = requestBlock.writeXml();

        chai.assert.equal(actual, expected);
    });
});
