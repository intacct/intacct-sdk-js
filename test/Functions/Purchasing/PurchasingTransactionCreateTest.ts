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

import TransactionSubtotalCreate from "../../../src/Functions/InventoryControl/TransactionSubtotalCreate";
import PurchasingTransactionCreate from "../../../src/Functions/Purchasing/PurchasingTransactionCreate";
import PurchasingTransactionLineCreate from "../../../src/Functions/Purchasing/PurchasingTransactionLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("PurchasingTransactionCreate", () => {
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
        <create_potransaction>
            <transactiontype>Purchase Order</transactiontype>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <vendorid>2530</vendorid>
            <datedue>
                <year>2019</year>
                <month>09</month>
                <day>15</day>
            </datedue>
            <returnto>
                <contactname />
            </returnto>
            <payto>
                <contactname />
            </payto>
            <potransitems>
                <potransitem>
                    <itemid>02354032</itemid>
                    <quantity>1200</quantity>
                </potransitem>
            </potransitems>
        </create_potransaction>
    </function>
</test>`;

        const record = new PurchasingTransactionCreate();
        record.controlId = "unittest";
        record.transactionDefinition = "Purchase Order";
        record.transactionDate = new Date("6/30/2015");
        record.vendorId = "2530";
        record.dueDate = new Date("9/15/2019");

        const line1 = new PurchasingTransactionLineCreate();
        line1.itemId = "02354032";
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
        <create_potransaction>
            <transactiontype>Purchase Order</transactiontype>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <dateposted>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </dateposted>
            <createdfrom>Purchase Order-P1002</createdfrom>
            <vendorid>23530</vendorid>
            <documentno>23430</documentno>
            <referenceno>234235</referenceno>
            <termname>N30</termname>
            <datedue>
                <year>2020</year>
                <month>09</month>
                <day>24</day>
            </datedue>
            <message>Submit</message>
            <shippingmethod>USPS</shippingmethod>
            <returnto>
                <contactname>Bobbi Reese</contactname>
            </returnto>
            <payto>
                <contactname>Henry Jones</contactname>
            </payto>
            <supdocid>6942</supdocid>
            <externalid>20394</externalid>
            <basecurr>USD</basecurr>
            <currency>USD</currency>
            <exchratedate>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </exchratedate>
            <exchratetype>Intacct Daily Rate</exchratetype>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <state>Pending</state>
            <potransitems>
                <potransitem>
                    <itemid>2390552</itemid>
                    <quantity>223</quantity>
                </potransitem>
            </potransitems>
            <subtotals>
                <subtotal>
                    <description>Subtotal description</description>
                    <total>223</total>
                </subtotal>
            </subtotals>
        </create_potransaction>
    </function>
</test>`;

        const record = new PurchasingTransactionCreate();
        record.controlId = "unittest";
        record.transactionDefinition = "Purchase Order";
        record.transactionDate = new Date("6/30/2015");
        record.glPostingDate = new Date("6/30/2015");
        record.createdFrom = "Purchase Order-P1002";
        record.vendorId = "23530";
        record.documentNumber = "23430";
        record.referenceNumber = "234235";
        record.paymentTerm = "N30";
        record.dueDate = new Date("09/24/2020");
        record.message = "Submit";
        record.shippingMethod = "USPS";
        record.returnToContactName = "Bobbi Reese";
        record.payToContactName = "Henry Jones";
        record.attachmentsId = "6942";
        record.externalId = "20394";
        record.baseCurrency = "USD";
        record.transactionCurrency = "USD";
        record.exchangeRateDate = new Date("6/30/2015");
        record.exchangeRateType = "Intacct Daily Rate";
        record.state = "Pending";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const line1 = new PurchasingTransactionLineCreate();
        line1.itemId = "2390552";
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
