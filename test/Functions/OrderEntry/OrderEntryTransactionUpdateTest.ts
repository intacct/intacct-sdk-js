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
import TransactionSubtotalUpdate from "../../../src/Functions/InventoryControl/TransactionSubtotalUpdate";
import OrderEntryTransactionLineCreate from "../../../src/Functions/OrderEntry/OrderEntryTransactionLineCreate";
import OrderEntryTransactionLineUpdate from "../../../src/Functions/OrderEntry/OrderEntryTransactionLineUpdate";
import OrderEntryTransactionUpdate from "../../../src/Functions/OrderEntry/OrderEntryTransactionUpdate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("OrderEntryTransactionUpdate", () => {
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
        <update_sotransaction key="Sales Order-SO0001" />
    </function>
</test>`;

        const record = new OrderEntryTransactionUpdate();
        record.controlId = "unittest";
        record.transactionId = "Sales Order-SO0001";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build default XML with subtotals", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update_sotransaction key="Sales Order-SO0001">
            <updatesotransitems>
                <updatesotransitem line_num="1">
                    <itemid>02354032</itemid>
                    <quantity>12</quantity>
                </updatesotransitem>
                <sotransitem>
                    <itemid>02354032</itemid>
                    <quantity>1200</quantity>
                </sotransitem>
            </updatesotransitems>
            <updatesubtotals>
                <updatesubtotal>
                    <description>Subtotal Description</description>
                    <total>1200</total>
                </updatesubtotal>
            </updatesubtotals>
        </update_sotransaction>
    </function>
</test>`;

        const record = new OrderEntryTransactionUpdate();
        record.controlId = "unittest";
        record.transactionId = "Sales Order-SO0001";

        const line1 = new OrderEntryTransactionLineUpdate();
        line1.lineNo = 1;
        line1.itemId = "02354032";
        line1.quantity = 12;

        const line2 = new OrderEntryTransactionLineCreate();
        line2.itemId = "02354032";
        line2.quantity = 1200;

        record.lines = [
            line1,
            line2,
        ];

        const subtotal1 = new TransactionSubtotalUpdate();
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
        <update_sotransaction key="Sales Order-SO0001">
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
            <referenceno>234235</referenceno>
            <termname>N30</termname>
            <datedue>
                <year>2020</year>
                <month>09</month>
                <day>24</day>
            </datedue>
            <origdocdate>
                <year>2015</year>
                <month>06</month>
                <day>15</day>
            </origdocdate>
            <message>Submit</message>
            <shippingmethod>USPS</shippingmethod>
            <shipto>
                <contactname>28952</contactname>
            </shipto>
            <billto>
                <contactname>289533</contactname>
            </billto>
            <supdocid>6942</supdocid>
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
        </update_sotransaction>
    </function>
</test>`;

        const record = new OrderEntryTransactionUpdate();
        record.controlId = "unittest";
        record.transactionId = "Sales Order-SO0001";
        record.transactionDate = new Date("6/30/2015");
        record.glPostingDate = new Date("6/30/2015");
        record.originalDocumentDate = new Date("6/15/2015");
        record.referenceNumber = "234235";
        record.paymentTerm = "N30";
        record.dueDate = new Date("09/24/2020");
        record.message = "Submit";
        record.shippingMethod = "USPS";
        record.shipToContactName = "28952";
        record.billToContactName = "289533";
        record.attachmentsId = "6942";
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

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
