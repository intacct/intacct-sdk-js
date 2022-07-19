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

import AbstractApPaymentDetailCredit from "../../../src/Functions/AccountsPayable/AbstractApPaymentDetailCredit";
import ApPaymentDetailBillInfo from "../../../src/Functions/AccountsPayable/ApPaymentDetailBillInfo";
import ApPaymentDetailBuilder from "../../../src/Functions/AccountsPayable/ApPaymentDetailBuilder";
import ApPaymentDetailCreditFactory from "../../../src/Functions/AccountsPayable/ApPaymentDetailCreditFactory";
import ApPaymentDetailInfo from "../../../src/Functions/AccountsPayable/ApPaymentDetailInfo";
import ApPaymentInfo from "../../../src/Functions/AccountsPayable/ApPaymentInfo";
import ApPaymentUpdate from "../../../src/Functions/AccountsPayable/ApPaymentUpdate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ApPaymentUpdate", () => {

    const transactionFactory = new ApPaymentDetailCreditFactory();

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
    it("should generate XML for Bill", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <APPYMT>
                <RECORDNO>1234</RECORDNO>
                <FINANCIALENTITY>BA1143</FINANCIALENTITY>
                <VENDORID>V0001</VENDORID>
                <APPYMTDETAILS>
                    <APPYMTDETAIL>
                        <RECORDKEY>123</RECORDKEY>
                        <TRX_PAYMENTAMOUNT>100.12</TRX_PAYMENTAMOUNT>
                    </APPYMTDETAIL>
                </APPYMTDETAILS>
            </APPYMT>
        </update>
    </function>
</test>`;
        const detailBuilder = new ApPaymentDetailBuilder();

        const line1 = new ApPaymentDetailBillInfo();
        line1.recordNo = 123;
        line1.paymentAmount = 100.12;

        detailBuilder.addApPaymentDetailBill(line1);

        const info = new ApPaymentInfo();
        info.recordNo = 1234;
        info.financialEntityId = "BA1143";
        info.vendorId = "V0001";
        info.apPaymentDetails = detailBuilder.getApPaymentDetailList();

        const record = new ApPaymentUpdate(info, "unittest");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with Bill Line", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <APPYMT>
                <RECORDNO>1234</RECORDNO>
                <FINANCIALENTITY>BA1143</FINANCIALENTITY>
                <VENDORID>V0001</VENDORID>
                <DOCNUMBER>12345</DOCNUMBER>
                <APPYMTDETAILS>
                    <APPYMTDETAIL>
                        <RECORDKEY>123</RECORDKEY>
                        <ENTRYKEY>456</ENTRYKEY>
                        <TRX_PAYMENTAMOUNT>100.12</TRX_PAYMENTAMOUNT>
                    </APPYMTDETAIL>
                </APPYMTDETAILS>
            </APPYMT>
        </update>
    </function>
</test>`;

        const detailBuilder = new ApPaymentDetailBuilder();

        const line1 = new ApPaymentDetailBillInfo();
        line1.recordNo = 123;
        line1.lineRecordNo = 456;
        line1.paymentAmount = 100.12;

        detailBuilder.addApPaymentDetailBill(line1);

        const info = new ApPaymentInfo();
        info.recordNo = 1234;
        info.financialEntityId = "BA1143";
        info.vendorId = "V0001";
        info.documentNo = "12345";
        info.apPaymentDetails = detailBuilder.getApPaymentDetailList();

        const record = new ApPaymentUpdate(info, "unittest");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters for Bill Discount", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <APPYMT>
                <RECORDNO>1234</RECORDNO>
                <FINANCIALENTITY>BA1143</FINANCIALENTITY>
                <VENDORID>V0001</VENDORID>
                <APPYMTDETAILS>
                    <APPYMTDETAIL>
                        <RECORDKEY>123</RECORDKEY>
                        <DISCOUNTDATE>06/29/2015</DISCOUNTDATE>
                        <TRX_PAYMENTAMOUNT>294</TRX_PAYMENTAMOUNT>
                    </APPYMTDETAIL>
                </APPYMTDETAILS>
            </APPYMT>
        </update>
    </function>
</test>`;

        const detailBuilder = new ApPaymentDetailBuilder();

        const line1 = new ApPaymentDetailBillInfo();
        line1.recordNo = 123;
        line1.applyToDiscountDate = new Date("06/29/2015");
        line1.paymentAmount = 294.00;

        detailBuilder.addApPaymentDetailBill(line1);

        const info = new ApPaymentInfo();
        info.recordNo = 1234;
        info.financialEntityId = "BA1143";
        info.vendorId = "V0001";
        info.apPaymentDetails = detailBuilder.getApPaymentDetailList();

        const record = new ApPaymentUpdate(info, "unittest");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML with all parameters for Bill Discount", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <APPYMT>
                <RECORDNO>1234</RECORDNO>
                <FINANCIALENTITY>BA1143</FINANCIALENTITY>
                <VENDORID>V0001</VENDORID>
                <APPYMTDETAILS>
                    <APPYMTDETAIL>
                        <POSADJKEY>2595</POSADJKEY>
                        <POSADJENTRYKEY>42962</POSADJENTRYKEY>
                        <TRX_PAYMENTAMOUNT>1</TRX_PAYMENTAMOUNT>
                    </APPYMTDETAIL>
                    <APPYMTDETAIL>
                        <POSADJKEY>2595</POSADJKEY>
                        <POSADJENTRYKEY>42962</POSADJENTRYKEY>
                        <ADJUSTMENTKEY>2590</ADJUSTMENTKEY>
                        <ADJUSTMENTENTRYKEY>42949</ADJUSTMENTENTRYKEY>
                        <TRX_ADJUSTMENTAMOUNT>1.01</TRX_ADJUSTMENTAMOUNT>
                    </APPYMTDETAIL>
                </APPYMTDETAILS>
            </APPYMT>
        </update>
    </function>
</test>`;

        const detailBuilder = new ApPaymentDetailBuilder();

        const line1 = new ApPaymentDetailInfo();
        line1.recordNo = 2595;
        line1.lineRecordNo = 42962;
        line1.paymentAmount = 1.00;

        const line2 = new ApPaymentDetailInfo();
        line2.recordNo = 2595;
        line2.lineRecordNo = 42962;
        line2.detailTransaction = transactionFactory.create(AbstractApPaymentDetailCredit.DEBIT_MEMO,
            2590, 42949, 1.01);

        detailBuilder.addApPaymentDetailCreditMemo(line1);
        detailBuilder.addApPaymentDetailCreditMemo(line2);

        const info = new ApPaymentInfo();
        info.recordNo = 1234;
        info.financialEntityId = "BA1143";
        info.vendorId = "V0001";
        info.apPaymentDetails = detailBuilder.getApPaymentDetailList();

        const record = new ApPaymentUpdate(info, "unittest");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML for Bill And Use All the Things", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <APPYMT>
                <RECORDNO>1234</RECORDNO>
                <FINANCIALENTITY>BA1143</FINANCIALENTITY>
                <VENDORID>V0001</VENDORID>
                <APPYMTDETAILS>
                    <APPYMTDETAIL>
                        <RECORDKEY>30</RECORDKEY>
                        <ENTRYKEY>60</ENTRYKEY>
                        <TRX_PAYMENTAMOUNT>1</TRX_PAYMENTAMOUNT>
                    </APPYMTDETAIL>
                    <APPYMTDETAIL>
                        <RECORDKEY>30</RECORDKEY>
                        <ENTRYKEY>60</ENTRYKEY>
                        <ADVANCEKEY>2584</ADVANCEKEY>
                        <ADVANCEENTRYKEY>42931</ADVANCEENTRYKEY>
                        <TRX_POSTEDADVANCEAMOUNT>2.49</TRX_POSTEDADVANCEAMOUNT>
                    </APPYMTDETAIL>
                    <APPYMTDETAIL>
                        <RECORDKEY>30</RECORDKEY>
                        <ENTRYKEY>60</ENTRYKEY>
                        <ADJUSTMENTKEY>2590</ADJUSTMENTKEY>
                        <ADJUSTMENTENTRYKEY>42949</ADJUSTMENTENTRYKEY>
                        <TRX_ADJUSTMENTAMOUNT>2.01</TRX_ADJUSTMENTAMOUNT>
                    </APPYMTDETAIL>
                </APPYMTDETAILS>
            </APPYMT>
        </update>
    </function>
</test>`;

        const detailBuilder = new ApPaymentDetailBuilder();

        const line1 = new ApPaymentDetailBillInfo();
        line1.recordNo = 30;
        line1.lineRecordNo = 60;
        line1.paymentAmount = 1.00;

        detailBuilder.addApPaymentDetailBill(line1);

        const line2 = new ApPaymentDetailBillInfo();
        line2.recordNo = 30;
        line2.lineRecordNo = 60;
        line2.detailTransaction = transactionFactory.create(AbstractApPaymentDetailCredit.ADVANCE,
            2584, 42931, 2.49);

        detailBuilder.addApPaymentDetailBill(line2);

        const line3 = new ApPaymentDetailBillInfo();
        line3.recordNo = 30;
        line3.lineRecordNo = 60;
        line3.detailTransaction = transactionFactory.create(AbstractApPaymentDetailCredit.DEBIT_MEMO,
            2590, 42949, 2.01);

        detailBuilder.addApPaymentDetailBill(line3);

        const info = new ApPaymentInfo();
        info.recordNo = 1234;
        info.financialEntityId = "BA1143";
        info.vendorId = "V0001";
        info.apPaymentDetails = detailBuilder.getApPaymentDetailList();

        const record = new ApPaymentUpdate(info, "unittest");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should generate XML for Bill And Use Negative Bill", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <APPYMT>
                <RECORDNO>1234</RECORDNO>
                <FINANCIALENTITY>BOA</FINANCIALENTITY>
                <VENDORID>a4</VENDORID>
                <APPYMTDETAILS>
                    <APPYMTDETAIL>
                        <RECORDKEY>3693</RECORDKEY>
                        <INLINEKEY>3694</INLINEKEY>
                        <TRX_INLINEAMOUNT>70</TRX_INLINEAMOUNT>
                        <TRX_PAYMENTAMOUNT>8.8</TRX_PAYMENTAMOUNT>
                    </APPYMTDETAIL>
                </APPYMTDETAILS>
            </APPYMT>
        </update>
    </function>
</test>`;

        const detailBuilder = new ApPaymentDetailBuilder();

        const line1 = new ApPaymentDetailBillInfo();
        line1.recordNo = 3693;
        line1.paymentAmount = 8.8;
        line1.detailTransaction = transactionFactory.create(AbstractApPaymentDetailCredit.NEGATIVE_BILL,
            3694, null, 70);

        detailBuilder.addApPaymentDetailBill(line1);

        const info = new ApPaymentInfo();
        info.recordNo = 1234;
        info.financialEntityId = "BOA";
        info.vendorId = "a4";
        info.apPaymentDetails = detailBuilder.getApPaymentDetailList();

        const record = new ApPaymentUpdate(info, "unittest");

        XmlObjectTestHelper.CompareXml(expected, record);
    });

    it("should generate XML with all parameters for Bill Discount", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <update>
            <APPYMT>
                <RECORDNO>1234</RECORDNO>
                <FINANCIALENTITY>BA1143</FINANCIALENTITY>
                <VENDORID>V0001</VENDORID>
                <PAYMENTREQUESTMETHOD>vendorpref</PAYMENTREQUESTMETHOD>
                <DOCNUMBER>10000</DOCNUMBER>
                <DESCRIPTION>Memo</DESCRIPTION>
                <WHENCREATED>06/30/2015</WHENCREATED>
                <ACTION>SUBMIT</ACTION>
                <APPYMTDETAILS>
                    <APPYMTDETAIL>
                        <RECORDKEY>123</RECORDKEY>
                        <DISCOUNTTOAPPLY>1.21</DISCOUNTTOAPPLY>
                        <CREDITTOAPPLY>8.12</CREDITTOAPPLY>
                        <TRX_PAYMENTAMOUNT>100.12</TRX_PAYMENTAMOUNT>
                    </APPYMTDETAIL>
                </APPYMTDETAILS>
            </APPYMT>
        </update>
    </function>
</test>`;

        const detailBuilder = new ApPaymentDetailBuilder();

        const line1 = new ApPaymentDetailBillInfo();
        line1.recordNo = 123;
        line1.discountToApply = 1.21;
        line1.paymentAmount = 100.12;
        line1.creditToApply = 8.12;

        detailBuilder.addApPaymentDetailBill(line1);

        const info = new ApPaymentInfo();
        info.recordNo = 1234;
        info.financialEntityId = "BA1143";
        info.vendorId = "V0001";
        info.mergeOption = "vendorpref";
        info.documentNo = "10000";
        info.memo = "Memo";
        info.paymentDate = new Date("06/30/2015");
        info.action = "SUBMIT";
        info.apPaymentDetails = detailBuilder.getApPaymentDetailList();

        const record = new ApPaymentUpdate(info, "unittest");

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
