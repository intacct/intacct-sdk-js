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
import * as mock from "mock-fs";
import ClientConfig from "../../src/ClientConfig";
import Endpoint from "../../src/Credentials/Endpoint";

describe("Endpoint", () => {
    const oldEnv = process.env;

    before((done) => {
        return done();
    });
    beforeEach((done) => {
        process.env = {};
        return done();
    });
    afterEach((done) => {
        process.env = oldEnv;
        return done();
    });
    after((done) => {
        mock.restore();
        return done();
    });

    it("should return the default endpoint", () => {
        const config = new ClientConfig();
        const endpoint = new Endpoint(config);

        chai.assert.equal(endpoint.url, "https://api.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("grabs INTACCT_ENDPOINT_URL from the env", () => {
        process.env.INTACCT_ENDPOINT_URL = "https://envunittest.intacct.com/ia/xml/xmlgw.phtml";
        const config = new ClientConfig();
        const endpoint = new Endpoint(config);
        chai.assert.equal(endpoint.url, "https://envunittest.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("grab the endpoint URL from the config", () => {
        const config = new ClientConfig();
        config.endpointUrl = "https://configtest.intacct.com/ia/xml/xmlgw.phtml";
        const endpoint = new Endpoint(config);

        chai.assert.equal(endpoint.url, "https://configtest.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("should return the default endpoint if the endpoint URL from the config is null", () => {
        const config = new ClientConfig();
        config.endpointUrl = "";
        const endpoint = new Endpoint(config);

        chai.assert.equal(endpoint.url, "https://api.intacct.com/ia/xml/xmlgw.phtml");
    });

    it("should throw exception on invalid Endpoint URL", () => {
        chai.assert.throws(
            () => {
                const config = new ClientConfig();
                config.endpointUrl = "https://www.example.com/xmlgw.phtml";
                return new Endpoint(config);
            },
            Error,
            "Endpoint URL is not a valid intacct.com domain name.",
        );
    });
});
