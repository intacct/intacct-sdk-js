/**
 * @module Intacct/SDK/Functions/CashManagement
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
import AbstractDeposit from "./AbstractDeposit";

export default class DepositCreate extends AbstractDeposit {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("record_deposit");

        xml.writeElement("bankaccountid", this.bankAccountId, true);

        xml.writeStartElement("depositdate");
        xml.writeDateSplitElements(this.depositDate);
        xml.writeEndElement(); // depositdate

        xml.writeElement("depositid", this.depositSlipId, true);

        xml.writeStartElement("receiptkeys");
        if (this.transactionKeysToDeposit != null && this.transactionKeysToDeposit.length > 0) {
            for (const key of this.transactionKeysToDeposit) {
                xml.writeElement("receiptkey", key, true);
            }
        }
        xml.writeEndElement(); // receiptkeys

        xml.writeElement("description", this.description);

        xml.writeElement("supdocid", this.attachmentsId);

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeEndElement(); // record_deposit

        xml.writeEndElement(); // function
    }
}
