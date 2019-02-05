/*
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

import ChargeCardTransactionReverse from "../../../src/Functions/CashManagement/ChargeCardTransactionReverse";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ChargeCardTransactionReverse", () => {
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
    it("should generate XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <reverse_cctransaction key="1234">
            <datereversed>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datereversed>
        </reverse_cctransaction>
    </function>
</test>`;

        const record = new ChargeCardTransactionReverse();
        record.controlId = "unittest";
        record.recordNo = 1234;
        record.reverseDate = new Date("6/30/2015");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
