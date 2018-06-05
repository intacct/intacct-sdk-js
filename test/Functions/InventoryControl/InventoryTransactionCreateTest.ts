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

import InventoryTransactionCreate from "../../../src/Functions/InventoryControl/InventoryTransactionCreate";
import InventoryTransactionLineCreate from "../../../src/Functions/InventoryControl/InventoryTransactionLineCreate";
import TransactionSubtotalCreate from "../../../src/Functions/InventoryControl/TransactionSubtotalCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("InventoryTransactionCreate", () => {
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
    <function controlid="unittest">
        <create_ictransaction>
            <transactiontype>Purchase Order</transactiontype>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <ictransitems>
                <ictransitem>
                    <itemid>02354032</itemid>
                    <warehouseid>W1234</warehouseid>
                    <quantity>1200</quantity>
                </ictransitem>
            </ictransitems>
        </create_ictransaction>
    </function>
</test>`;

        const record = new InventoryTransactionCreate();
        record.controlId = "unittest";
        record.transactionDefinition = "Purchase Order";
        record.transactionDate = new Date("6/30/2015");

        const line1 = new InventoryTransactionLineCreate();
        line1.itemId = "02354032";
        line1.warehouseId = "W1234";
        line1.quantity = 1200;

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build all XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_ictransaction>
            <transactiontype>Inventory Shipper</transactiontype>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <createdfrom>Inventory Shipper-P1002</createdfrom>
            <documentno>23430</documentno>
            <referenceno>234235</referenceno>
            <message>Submit</message>
            <externalid>20394</externalid>
            <basecurr>USD</basecurr>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <state>Pending</state>
            <ictransitems>
                <ictransitem>
                    <itemid>2390552</itemid>
                    <warehouseid>W1234</warehouseid>
                    <quantity>223</quantity>
                </ictransitem>
            </ictransitems>
            <subtotals>
                <subtotal>
                    <description>Subtotal description</description>
                    <total>223</total>
                </subtotal>
            </subtotals>
        </create_ictransaction>
    </function>
</test>`;

        const record = new InventoryTransactionCreate();
        record.controlId = "unittest";
        record.transactionDefinition = "Inventory Shipper";
        record.transactionDate = new Date("6/30/2015");
        record.createdFrom = "Inventory Shipper-P1002";
        record.documentNumber = "23430";
        record.referenceNumber = "234235";
        record.message = "Submit";
        record.externalId = "20394";
        record.baseCurrency = "USD";
        record.state = "Pending";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const line1 = new InventoryTransactionLineCreate();
        line1.itemId = "2390552";
        line1.warehouseId = "W1234";
        line1.quantity = 223;

        record.lines = [
            line1,
        ];

        const subtotal1 = new TransactionSubtotalCreate();
        subtotal1.description = "Subtotal description";
        subtotal1.total = 223;

        record.subtotals = [
            subtotal1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
