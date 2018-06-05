/*
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

import ArPaymentCreate from "../../../src/Functions/AccountsReceivable/ArPaymentCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ArPaymentCreate", () => {
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
        <create_arpayment>
            <customerid>C0020</customerid>
            <paymentamount>1922.12</paymentamount>
            <datereceived>
                <year>2016</year>
                <month>06</month>
                <day>30</day>
            </datereceived>
            <paymentmethod>Printed Check</paymentmethod>
        </create_arpayment>
    </function>
</test>`;

        const record = new ArPaymentCreate();
        record.controlId = "unittest";
        record.customerId = "C0020";
        record.transactionPaymentAmount = 1922.12;
        record.receivedDate = new Date("6/30/2016");
        record.paymentMethod = "Printed Check";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
