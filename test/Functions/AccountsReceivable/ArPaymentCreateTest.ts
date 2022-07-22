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

import ArPaymentCreate from "../../../src/Functions/AccountsReceivable/ArPaymentCreate";
import ArPaymentItem from "../../../src/Functions/AccountsReceivable/ArPaymentItem";
import OnlineAchPayment from "../../../src/Functions/AccountsReceivable/OnlineAchPayment";
import OnlineCardPayment from "../../../src/Functions/AccountsReceivable/OnlineCardPayment";
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

    it("should generate all XML", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_arpayment>
            <customerid>C0020</customerid>
            <paymentamount>100.99</paymentamount>
            <undepfundsacct>1030</undepfundsacct>
            <refid>123456789</refid>
            <overpaylocid>US</overpaylocid>
            <overpaydeptid>CS</overpaydeptid>
            <datereceived>
                <year>2016</year>
                <month>06</month>
                <day>30</day>
            </datereceived>
            <paymentmethod>Printed Check</paymentmethod>
            <arpaymentitem>
                <invoicekey>1000</invoicekey>
                <amount>75</amount>
            </arpaymentitem>
            <arpaymentitem>
                <invoicekey>1001</invoicekey>
                <amount>25.99</amount>
            </arpaymentitem>
        </create_arpayment>
    </function>
</test>`;

        const record = new ArPaymentCreate();
        record.controlId = "unittest";
        record.customerId = "C0020";
        record.transactionPaymentAmount = 100.99;
        record.receivedDate = new Date("6/30/2016");
        record.paymentMethod = "Printed Check";
        record.undepositedFundsGlAccountNo = "1030";
        record.referenceNumber = "123456789";
        record.overpaymentLocationId = "US";
        record.overpaymentDepartmentId = "CS";

        const applyToRecordA = new ArPaymentItem();
        applyToRecordA.applyToRecordId = 1000;
        applyToRecordA.amountToApply = 75.00;

        const applyToRecordB = new ArPaymentItem();
        applyToRecordB.applyToRecordId = 1001;
        applyToRecordB.amountToApply = 25.99;

        record.applyToTransactions = [
            applyToRecordA,
            applyToRecordB,
        ];

        XmlObjectTestHelper.CompareXml(expected, record);
    });

    it("should generate all XML with Online Card Payment", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_arpayment>
            <customerid>C0020</customerid>
            <paymentamount>100.99</paymentamount>
            <undepfundsacct>1030</undepfundsacct>
            <refid>123456789</refid>
            <overpaylocid>US</overpaylocid>
            <overpaydeptid>CS</overpaydeptid>
            <datereceived>
                <year>2016</year>
                <month>06</month>
                <day>30</day>
            </datereceived>
            <paymentmethod>Online Charge Card</paymentmethod>
            <arpaymentitem>
                <invoicekey>1000</invoicekey>
                <amount>75</amount>
            </arpaymentitem>
            <arpaymentitem>
                <invoicekey>1001</invoicekey>
                <amount>25.99</amount>
            </arpaymentitem>
            <onlinecardpayment>
                <cardnum>12345678</cardnum>
                <expirydate>7/22/2022</expirydate>
                <cardtype>visa</cardtype>
                <securitycode>1234</securitycode>
                <usedefaultcard>true</usedefaultcard>
            </onlinecardpayment>
        </create_arpayment>
    </function>
</test>`;

        const record = new ArPaymentCreate();
        record.controlId = "unittest";
        record.customerId = "C0020";
        record.transactionPaymentAmount = 100.99;
        record.receivedDate = new Date("6/30/2016");
        record.paymentMethod = "Online Charge Card";
        record.undepositedFundsGlAccountNo = "1030";
        record.referenceNumber = "123456789";
        record.overpaymentLocationId = "US";
        record.overpaymentDepartmentId = "CS";

        const applyToRecordA = new ArPaymentItem();
        applyToRecordA.applyToRecordId = 1000;
        applyToRecordA.amountToApply = 75.00;

        const applyToRecordB = new ArPaymentItem();
        applyToRecordB.applyToRecordId = 1001;
        applyToRecordB.amountToApply = 25.99;

        const onlineCardPayment = new OnlineCardPayment();
        onlineCardPayment.cardNum = "12345678";
        onlineCardPayment.expiryDate = "7/22/2022";
        onlineCardPayment.cardType = "visa";
        onlineCardPayment.securityCode = "1234";
        onlineCardPayment.useDefaultCard = true;

        record.applyToTransactions = [
            applyToRecordA,
            applyToRecordB,
        ];

        record.onlineCardPayment = onlineCardPayment;

        XmlObjectTestHelper.CompareXml(expected, record);
    });

    it("should generate all XML with Online ACH Payment", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create_arpayment>
            <customerid>C0020</customerid>
            <paymentamount>100.99</paymentamount>
            <undepfundsacct>1030</undepfundsacct>
            <refid>123456789</refid>
            <overpaylocid>US</overpaylocid>
            <overpaydeptid>CS</overpaydeptid>
            <datereceived>
                <year>2016</year>
                <month>06</month>
                <day>30</day>
            </datereceived>
            <paymentmethod>Online ACH Debit</paymentmethod>
            <arpaymentitem>
                <invoicekey>1000</invoicekey>
                <amount>75</amount>
            </arpaymentitem>
            <arpaymentitem>
                <invoicekey>1001</invoicekey>
                <amount>25.99</amount>
            </arpaymentitem>
            <onlineachpayment>
                <bankname>National</bankname>
                <accounttype>checking</accounttype>
                <accountnumber>456123789</accountnumber>
                <routingnumber>987321654</routingnumber>
                <accountholder>Jeff</accountholder>
                <usedefaultcard>true</usedefaultcard>
            </onlineachpayment>
        </create_arpayment>
    </function>
</test>`;

        const record = new ArPaymentCreate();
        record.controlId = "unittest";
        record.customerId = "C0020";
        record.transactionPaymentAmount = 100.99;
        record.receivedDate = new Date("6/30/2016");
        record.paymentMethod = "Online ACH Debit";
        record.undepositedFundsGlAccountNo = "1030";
        record.referenceNumber = "123456789";
        record.overpaymentLocationId = "US";
        record.overpaymentDepartmentId = "CS";

        const applyToRecordA = new ArPaymentItem();
        applyToRecordA.applyToRecordId = 1000;
        applyToRecordA.amountToApply = 75.00;

        const applyToRecordB = new ArPaymentItem();
        applyToRecordB.applyToRecordId = 1001;
        applyToRecordB.amountToApply = 25.99;

        const onlineAchPayment = new OnlineAchPayment();
        onlineAchPayment.bankName = "National";
        onlineAchPayment.accountType = "checking";
        onlineAchPayment.accountNumber = "456123789";
        onlineAchPayment.routingNumber = "987321654";
        onlineAchPayment.accountHolder = "Jeff";
        onlineAchPayment.useDefaultCard = true;

        record.applyToTransactions = [
            applyToRecordA,
            applyToRecordB,
        ];

        record.onlineAchPayment = onlineAchPayment;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
