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

import TransactionSubtotalCreate from "../../../src/Functions/InventoryControl/TransactionSubtotalCreate";
import OrderEntryTransactionCreate from "../../../src/Functions/OrderEntry/OrderEntryTransactionCreate";
import OrderEntryTransactionLineCreate from "../../../src/Functions/OrderEntry/OrderEntryTransactionLineCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("OrderEntryTransactionCreate", () => {
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
        <create_sotransaction>
            <transactiontype>Sales Order</transactiontype>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <customerid>2530</customerid>
            <sotransitems>
                <sotransitem>
                    <itemid>02354032</itemid>
                    <quantity>1200</quantity>
                </sotransitem>
            </sotransitems>
        </create_sotransaction>
    </function>
</test>`;

        const record = new OrderEntryTransactionCreate();
        record.controlId = "unittest";
        record.transactionDefinition = "Sales Order";
        record.transactionDate = new Date("6/30/2015");
        record.customerId = "2530";

        const line1 = new OrderEntryTransactionLineCreate();
        line1.itemId = "02354032";
        line1.quantity = 1200;

        record.lines = [
            line1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build default XML with subtotals", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_sotransaction>
            <transactiontype>Sales Order</transactiontype>
            <datecreated>
                <year>2015</year>
                <month>06</month>
                <day>30</day>
            </datecreated>
            <customerid>2530</customerid>
            <sotransitems>
                <sotransitem>
                    <itemid>02354032</itemid>
                    <quantity>1200</quantity>
                </sotransitem>
            </sotransitems>
            <subtotals>
                <subtotal>
                    <description>Subtotal Description</description>
                    <total>1200</total>
                </subtotal>
            </subtotals>
        </create_sotransaction>
    </function>
</test>`;

        const record = new OrderEntryTransactionCreate();
        record.controlId = "unittest";
        record.transactionDefinition = "Sales Order";
        record.transactionDate = new Date("6/30/2015");
        record.customerId = "2530";

        const line1 = new OrderEntryTransactionLineCreate();
        line1.itemId = "02354032";
        line1.quantity = 1200;

        record.lines = [
            line1,
        ];

        const subtotal1 = new TransactionSubtotalCreate();
        subtotal1.description = "Subtotal Description";
        subtotal1.total = 1200;

        record.subtotals = [
            subtotal1,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build all XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_sotransaction>
            <transactiontype>Sales Order</transactiontype>
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
            <createdfrom>Sales Quote-Q1002</createdfrom>
            <customerid>23530</customerid>
            <documentno>23430</documentno>
            <origdocdate>
                <year>2015</year>
                <month>06</month>
                <day>15</day>
            </origdocdate>
            <referenceno>234235</referenceno>
            <termname>N30</termname>
            <datedue>
                <year>2020</year>
                <month>09</month>
                <day>24</day>
            </datedue>
            <message>Submit</message>
            <shippingmethod>USPS</shippingmethod>
            <shipto>
                <contactname>28952</contactname>
            </shipto>
            <billto>
                <contactname>289533</contactname>
            </billto>
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
            <vsoepricelist>VSOEPricing</vsoepricelist>
            <customfields>
                <customfield>
                    <customfieldname>customfield1</customfieldname>
                    <customfieldvalue>customvalue1</customfieldvalue>
                </customfield>
            </customfields>
            <state>Pending</state>
            <projectid>P2904</projectid>
            <sotransitems>
                <sotransitem>
                    <itemid>2390552</itemid>
                    <quantity>223</quantity>
                </sotransitem>
            </sotransitems>
            <subtotals>
                <subtotal>
                    <description>Subtotal description</description>
                    <total>223</total>
                </subtotal>
            </subtotals>
        </create_sotransaction>
    </function>
</test>`;

        const record = new OrderEntryTransactionCreate();
        record.controlId = "unittest";
        record.transactionDefinition = "Sales Order";
        record.transactionDate = new Date("6/30/2015");
        record.glPostingDate = new Date("6/30/2015");
        record.createdFrom = "Sales Quote-Q1002";
        record.customerId = "23530";
        record.documentNumber = "23430";
        record.originalDocumentDate = new Date("6/15/2015");
        record.referenceNumber = "234235";
        record.paymentTerm = "N30";
        record.dueDate = new Date("09/24/2020");
        record.message = "Submit";
        record.shippingMethod = "USPS";
        record.shipToContactName = "28952";
        record.billToContactName = "289533";
        record.attachmentsId = "6942";
        record.externalId = "20394";
        record.baseCurrency = "USD";
        record.transactionCurrency = "USD";
        record.exchangeRateDate = new Date("6/30/2015");
        record.exchangeRateType = "Intacct Daily Rate";
        record.vsoePriceList = "VSOEPricing";
        record.state = "Pending";
        record.projectId = "P2904";
        record.customFields = [
            [ "customfield1", "customvalue1" ],
        ];

        const line1 = new OrderEntryTransactionLineCreate();
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
