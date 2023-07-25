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

import ReadUserFormatting from "../../../src/Functions/Common/ReadUserFormatting";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ReadUserFormatting", () => {
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
  it("should run readUserFormatting with key", () => {
    const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <readUserFormatting>
            <key>1</key>
        </readUserFormatting>
    </function>
</test>`;

    const record = new ReadUserFormatting("unittest");
    record.key = 1;

    XmlObjectTestHelper.CompareXml(expected, record);
  });
});
