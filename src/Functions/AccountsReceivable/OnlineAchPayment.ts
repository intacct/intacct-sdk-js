/**
 * @module Intacct/SDK/Functions/AccountsReceivable
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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import IXmlObject from "../../Xml/IXmlObject";

export default class OnlineAchPayment implements IXmlObject {

    public bankName: string;
    public accountType: string;
    public accountNumber: string;
    public routingNumber: string;
    public accountHolder: string;
    public useDefaultCard: boolean;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("onlineachpayment");

        xml.writeElement("bankname", this.bankName, true);
        xml.writeElement("accounttype", this.accountType, true);
        xml.writeElement("accountnumber", this.accountNumber, true);
        xml.writeElement("routingnumber", this.routingNumber, true);
        xml.writeElement("accountholder", this.accountHolder, true);
        xml.writeElement("usedefaultcard", this.useDefaultCard);

        xml.writeEndElement(); // onlineachpayment
    }
}
