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

import WarehouseCreate from "../../../src/Functions/InventoryControl/WarehouseCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("WarehouseCreate", () => {
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
    it("should build WarehouseCreate object with ID, name, location ID", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <WAREHOUSE>
                <WAREHOUSEID>W1234</WAREHOUSEID>
                <NAME>hello world</NAME>
                <LOC>
                    <LOCATIONID>L1234</LOCATIONID>
                </LOC>
            </WAREHOUSE>
        </create>
    </function>
</test>`;

        const record = new WarehouseCreate();
        record.controlId = "unittest";
        record.warehouseId = "W1234";
        record.warehouseName = "hello world";
        record.locationId = "L1234";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
