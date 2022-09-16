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

import TransactionItemDetail from "../../../src/Functions/InventoryControl/TransactionItemDetail";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("TransactionItemDetail", () => {
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
    it("should build default XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <itemdetail>
        <quantity>5523</quantity>
        <lotno>223</lotno>
        <itemexpiration>
            <year>2017</year>
            <month>12</month>
            <day>31</day>
        </itemexpiration>
    </itemdetail>
</test>`;

        const record = new TransactionItemDetail();
        record.quantity = 5523;
        record.lotNumber = "223";
        record.itemExpiration = new Date("12/31/2017");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build all XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <itemdetail>
        <quantity>15325</quantity>
        <serialno>S2355235</serialno>
        <lotno>L5</lotno>
        <aisle>55</aisle>
        <row>1</row>
        <bin>12</bin>
    </itemdetail>
</test>`;

        const record = new TransactionItemDetail();
        record.quantity = 15325;
        record.serialNumber = "S2355235";
        record.lotNumber = "L5";
        record.aisle = "55";
        record.row = "1";
        record.bin = "12";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
