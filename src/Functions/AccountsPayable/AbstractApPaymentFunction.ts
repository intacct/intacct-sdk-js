/**
 * @module Intacct/SDK/Functions/AccountsPayable
 */

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

import IntacctException from "../../Exceptions/IntacctException";
import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractFunction from "../AbstractFunction";

export default abstract class AbstractApPaymentFunction extends AbstractFunction {

    public static readonly DELETE = "delete";

    public static readonly DECLINE = "decline_appaymentrequest";

    public static readonly CONFIRM = "confirm_appaymentrequest";

    public static readonly APPROVE = "approve_appaymentrequest";

    public static readonly SEND = "send_appaymentrequest";

    public static readonly VOID = "void_appaymentrequest";

    private recordNo: number;

    constructor(recordNo: number, controlId?: string) {
        super(controlId);
        this.recordNo = recordNo;
    }

    public writeXml(xml: IaXmlWriter): void {
        switch (this.getFunction()) {
            case AbstractApPaymentFunction.DELETE:
                this.writeCrudXml(xml);
                break;
           case AbstractApPaymentFunction.DECLINE:
            case AbstractApPaymentFunction.CONFIRM:
            case AbstractApPaymentFunction.APPROVE:
            case AbstractApPaymentFunction.SEND:
            case AbstractApPaymentFunction.VOID:
                this.writeLegacyXml(xml);
                break;
            default:
                throw new IntacctException("Cannot write XML for ApPaymentFunction " + this.getFunction());
        }
    }

    protected abstract getFunction(): string;

    private writeCrudXml(xml: IaXmlWriter): void {

        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement(this.getFunction());

        xml.writeElement("object", "APPYMT");
        xml.writeElement("keys", this.recordNo);

        xml.writeEndElement(); // delete

        xml.writeEndElement(); // function
    }

    private writeLegacyXml(xml: IaXmlWriter): void {

        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement(this.getFunction());

        xml.writeStartElement("appaymentkeys");

        xml.writeElement("appaymentkey", this.recordNo, true);

        xml.writeEndElement(); // appaymentkeys

        xml.writeEndElement(); // GetFunction

        xml.writeEndElement(); // function
    }
}
