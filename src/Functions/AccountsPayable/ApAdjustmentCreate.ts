/**
 * @module Intacct/SDK/Functions/AccountsPayable
 */

/**
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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractApAdjustment from "./AbstractApAdjustment";

export default class ApAdjustmentCreate extends AbstractApAdjustment {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create_apadjustment");

        xml.writeElement("vendorid", this.vendorId, true);

        xml.writeStartElement("datecreated");
        xml.writeDateSplitElements(this.transactionDate);
        xml.writeEndElement(); // datecreated

        if (this.glPostingDate != null) {
            xml.writeStartElement("dateposted");
            xml.writeDateSplitElements(this.glPostingDate);
            xml.writeEndElement(); // dateposted
        }

        xml.writeElement("batchkey", this.summaryRecordNo);

        xml.writeElement("adjustmentno", this.adjustmentNumber);

        xml.writeElement("action", this.action);

        xml.writeElement("billno", this.billNumber);

        xml.writeElement("description", this.description);

        xml.writeElement("externalid", this.externalId);

        this.writeXmlMultiCurrencySection(xml);

        xml.writeElement("nogl", this.doNotPostToGl);

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeStartElement("apadjustmentitems");
        if (this.lines != null && this.lines.length > 0) {
            for (const line of this.lines) {
                line.writeXml(xml);
            }
        }
        xml.writeEndElement(); // apadjustmentitems

        xml.writeEndElement(); // create_apadjustment

        xml.writeEndElement(); // function
    }
}
