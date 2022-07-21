/**
 * @module Intacct/SDK/Functions/CashManagement
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
import AbstractBankAccountTransactionRecord from "./AbstractBankAccountTransactionRecord";

export default class BankAccountTransactionRecord extends AbstractBankAccountTransactionRecord {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("BANKACCTTXNRECORD");
        xml.writeElement("TRANSACTIONID", this.transactionId);

        xml.writeStartElement("POSTINGDATE");
        xml.writeDateSplitElements(this.postingDate);
        xml.writeEndElement(); // POSTINGDATE

        xml.writeElement("TRANSACTIONTYPE", this.transactionType, true);
        xml.writeElement("DOCTYPE", this.docType);
        xml.writeElement("DOCNO", this.docNo);
        xml.writeElement("PAYEE", this.payee);
        xml.writeElement("AMOUNT", this.amount);
        xml.writeElement("DESCRIPTION", this.description);
        xml.writeElement("CURRENCY", this.currency);

        xml.writeEndElement(); // BANKACCTTXNRECORD
    }
}
