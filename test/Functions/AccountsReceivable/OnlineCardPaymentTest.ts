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

import OnlineCardPayment from "../../../src/Functions/AccountsReceivable/OnlineCardPayment";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("OnlineCardPayment", () => {
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
    <onlinecardpayment>
        <cardnum>12345678</cardnum>
        <expirydate>7/22/2022</expirydate>
        <cardtype>visa</cardtype>
        <securitycode>1234</securitycode>
        <usedefaultcard>true</usedefaultcard>
    </onlinecardpayment>
</test>`;

        const record = new OnlineCardPayment();
        record.cardNum = "12345678";
        record.expiryDate = "7/22/2022";
        record.cardType = "visa";
        record.securityCode = "1234";
        record.useDefaultCard = true;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
