/**
 * @module Intacct/SDK/Functions/AccountsPayable
 */

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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractFunction from "../AbstractFunction";
import ApPaymentInfo from "./ApPaymentInfo";

export default class ApPaymentUpdate extends AbstractFunction {

    private readonly apPaymentInfo: ApPaymentInfo;

    constructor(apPaymentInfo: ApPaymentInfo, controlId: string) {
        super(controlId);
        this.apPaymentInfo = apPaymentInfo;
    }

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update");
        xml.writeStartElement("APPYMT");
        xml.writeElement("RECORDNO", this.apPaymentInfo.recordNo);
        xml.writeElement("FINANCIALENTITY", this.apPaymentInfo.financialEntityId);
        xml.writeElement("VENDORID", this.apPaymentInfo.vendorId, true);

        xml.writeElement("PAYMENTREQUESTMETHOD", this.apPaymentInfo.mergeOption);
        xml.writeElement("DOCNUMBER", this.apPaymentInfo.documentNo);
        xml.writeElement("DESCRIPTION", this.apPaymentInfo.memo);

        xml.writeElementDate("WHENCREATED", this.apPaymentInfo.paymentDate, IaXmlWriter.intacctDateFormat);

        xml.writeElement("ACTION", this.apPaymentInfo.action);

        if (this.apPaymentInfo.apPaymentDetails && this.apPaymentInfo.apPaymentDetails.length > 0) {
            xml.writeStartElement("APPYMTDETAILS");
            for (const apPaymentDetail of this.apPaymentInfo.apPaymentDetails) {
                apPaymentDetail.writeXml(xml);
            }

            xml.writeEndElement(); // APPYMTDETAILS
        }

        xml.writeEndElement(); // APPYMT
        xml.writeEndElement(); // update

        xml.writeEndElement(); // function
    }
}
