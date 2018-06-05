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
import * as xml2js from "xml2js";
import ErrorMessage from "../../../src/Xml/Response/ErrorMessage";

describe("ErrorMessage", () => {
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
    it("should parse errors", () => {
        const xml = `<?xml version="1.0" encoding="utf-8" ?>
<errormessage>
    <error>
          <errorno>1234</errorno>
          <description>description</description>
          <description2>Object definition &#39;BADOBJECT&#39; not found.</description2>
          <correction>strip&lt;out&gt;these&lt;/out&gt;tags.</correction>
    </error>
    <error>
          <errorno>5678</errorno>
          <description>strip&lt;out&gt;these&lt;/out&gt;tags.</description>
          <description2>Object definition &#39;BADOBJECT&#39; not found.</description2>
          <correction>correct.</correction>
    </error>
</errormessage>`;

        const options = {
            explicitArray: false,
        };
        xml2js.parseString(xml, options, (err, xmlObject) => {
            if (err) {
                throw err;
            }

            const errorMesssage = new ErrorMessage(xmlObject["errormessage"]);

            chai.assert.isArray(errorMesssage.errors);
            chai.assert.isString(errorMesssage.errors[0]);
            chai.assert.equal(
                errorMesssage.errors[0],
                "1234 description Object definition 'BADOBJECT' not found. stripthesetags.",
            );
            chai.assert.equal(
                errorMesssage.errors[1],
                "5678 stripthesetags. Object definition 'BADOBJECT' not found. correct.",
            );
        });
    });
});
