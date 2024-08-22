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
import AbstractBankFeeds from "./AbstractBankFeeds";

export default class BankFeedsCreate extends AbstractBankFeeds {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create");
        xml.writeStartElement("BANKACCTTXNFEED");

        xml.writeElement("FINANCIALENTITY", this.financialEntity, true);

        xml.writeElementDate("FEEDDATE", this.feedDate);

        xml.writeElement("FEEDTYPE", this.feedType, true);

        if (this.feedType === "xml") {
            if (this.bankAccountTxnRecords != null && this.bankAccountTxnRecords.length > 0) {
                xml.writeStartElement("BANKACCTTXNRECORDS");
                for (const record of this.bankAccountTxnRecords) {
                    record.writeXml(xml);
                }
                xml.writeEndElement(); // BANKACCTTXNRECORDS
            }
        }

        xml.writeEndElement(); // BANKACCTTXNFEED
        xml.writeEndElement(); // create
        xml.writeEndElement(); // function
    }
}
