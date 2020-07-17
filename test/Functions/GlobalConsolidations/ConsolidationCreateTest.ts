/*
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

import ConsolidationCreate from "../../../src/Functions/GlobalConsolidations/ConsolidationCreate";
import ConsolidationEntity from "../../../src/Functions/GlobalConsolidations/ConsolidationEntity";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ConsolidationCreate", () => {
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
    it("should build ConsolidationCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <consolidate>
            <bookid>USD Books</bookid>
            <reportingperiodname>Month Ended June 2016</reportingperiodname>
        </consolidate>
    </function>
</test>`;

        const record = new ConsolidationCreate();
        record.controlId = "unittest";
        record.reportingBookId = "USD Books";
        record.reportingPeriodName = "Month Ended June 2016";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build ConsolidationCreate object with all fields", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <consolidate>
            <bookid>USD Books</bookid>
            <reportingperiodname>Month Ended June 2016</reportingperiodname>
            <offline>true</offline>
            <updatesucceedingperiods>false</updatesucceedingperiods>
            <changesonly>true</changesonly>
            <email>noreply@intacct.com</email>
            <entities>
                <csnentity>
                    <entityid>VT</entityid>
                    <bsrate>0.0000483502</bsrate>
                    <warate>0.0000485851</warate>
                </csnentity>
            </entities>
        </consolidate>
    </function>
</test>`;

        const record = new ConsolidationCreate();
        record.controlId = "unittest";
        record.reportingBookId = "USD Books";
        record.reportingPeriodName = "Month Ended June 2016";
        record.processOffline = true;
        record.changesOnly = true;
        record.updateSucceedingPeriods = false;
        record.notificationEmail = "noreply@intacct.com";

        const entity1 = new ConsolidationEntity();
        entity1.entityId = "VT";
        entity1.endingSpotRate = 0.0000483502;
        entity1.weightedAverageRate = 0.0000485851;

        record.entities = [
            entity1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
