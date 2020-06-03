/**
 * @module Intacct/SDK/Functions/InventoryControl
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
import AbstractTransactionItemDetail from "./AbstractTransactionItemDetail";

export default class TransactionItemDetail extends AbstractTransactionItemDetail {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("itemdetail");

        xml.writeElement("quantity", this.quantity);
        if (this.serialNumber != null) {
            xml.writeElement("serialno", this.serialNumber);
        } else if (this.lotNumber != null) {
            xml.writeElement("lotno", this.lotNumber);
        }

        xml.writeElement("aisle", this.aisle);
        xml.writeElement("row", this.row);
        xml.writeElement("bin", this.bin);

        if (this.itemExpiration != null) {
            xml.writeStartElement("itemexpiration");
            xml.writeDateSplitElements(this.itemExpiration);
            xml.writeEndElement(); // itemexpiration
        }

        xml.writeEndElement(); // itemdetail
    }
}
