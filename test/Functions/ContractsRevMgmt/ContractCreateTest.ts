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

import ContractCreate from "../../../src/Functions/ContractsRevMgmt/ContractCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("ContractCreate", () => {
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
    it("should build ContractCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <create>
            <CONTRACT>
                <CONTRACTID>CT1234</CONTRACTID>
                <CUSTOMERID>C1234</CUSTOMERID>
                <NAME>Contract name</NAME>
                <BEGINDATE>01/01/2017</BEGINDATE>
                <ENDDATE>12/31/2017</ENDDATE>
                <BILLINGFREQUENCY>Monthly</BILLINGFREQUENCY>
                <TERMNAME>N30</TERMNAME>
            </CONTRACT>
        </create>
    </function>
</test>`;

        const record = new ContractCreate();
        record.controlId = "unittest";
        record.contractId = "CT1234";
        record.customerId = "C1234";
        record.contractName = "Contract name";
        record.beginDate = new Date("01/01/2017");
        record.endDate = new Date("12/31/2017");
        record.billingFrequency = "Monthly";
        record.paymentTerm = "N30";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
