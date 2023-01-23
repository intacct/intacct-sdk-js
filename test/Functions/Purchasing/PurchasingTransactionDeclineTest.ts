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

import PurchasingTransactionDecline from "../../../src/Functions/Purchasing/PurchasingTransactionDecline";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("PurchasingTransactionDecline", () => {
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
    it("should build PurchasingTransactionDecline", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <decline>
            <PODOCUMENT>
                <DOCID>Vendor Invoice-VI4321</DOCID>
                <COMMENT>Need to wait on this</COMMENT>
            </PODOCUMENT>
        </decline>
    </function>
</test>`;

        const record = new PurchasingTransactionDecline();
        record.controlId = "unittest";
        record.externalId = "Vendor Invoice-VI4321";
        record.comment = "Need to wait on this";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
