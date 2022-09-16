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

import OnlineAchPayment from "../../../src/Functions/AccountsReceivable/OnlineAchPayment";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("OnlineAchPayment", () => {
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
    <onlineachpayment>
        <bankname>National</bankname>
        <accounttype>checking</accounttype>
        <accountnumber>456123789</accountnumber>
        <routingnumber>987321654</routingnumber>
        <accountholder>Jeff</accountholder>
        <usedefaultcard>true</usedefaultcard>
    </onlineachpayment>
</test>`;

        const record = new OnlineAchPayment();
        record.bankName = "National";
        record.accountType = "checking";
        record.accountNumber = "456123789";
        record.routingNumber = "987321654";
        record.accountHolder = "Jeff";
        record.useDefaultCard = true;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
