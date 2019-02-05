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

import StatisticalJournalEntryCreate from "../../../src/Functions/GeneralLedger/StatisticalJournalEntryCreate";
import StatisticalJournalEntryLineCreate from "../../../src/Functions/GeneralLedger/StatisticalJournalEntryLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("StatisticalJournalEntryCreate", () => {
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
    it("should create a StatisticalJournalEntryCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <GLBATCH>
                <JOURNAL />
                <BATCH_DATE />
                <BATCH_TITLE />
                <ENTRIES>
                    <GLENTRY>
                        <ACCOUNTNO />
                        <TR_TYPE>1</TR_TYPE>
                        <TRX_AMOUNT />
                    </GLENTRY>
                </ENTRIES>
            </GLBATCH>
        </create>
    </function>
</test>`;

        const record = new StatisticalJournalEntryCreate();
        record.controlId = "unittest";

        const line1 = new StatisticalJournalEntryLineCreate();

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
