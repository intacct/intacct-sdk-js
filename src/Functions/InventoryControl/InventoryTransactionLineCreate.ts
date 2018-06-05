/**
 * @module Intacct/SDK/Functions/InventoryControl
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
import AbstractInventoryTransactionLine from "./AbstractInventoryTransactionLine";

export default class InventoryTransactionLineCreate extends AbstractInventoryTransactionLine {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("ictransitem");

        xml.writeElement("itemid", this.itemId, true);
        xml.writeElement("itemdesc", this.itemDescription);
        xml.writeElement("warehouseid", this.warehouseId);
        xml.writeElement("quantity", this.quantity, true);
        xml.writeElement("unit", this.unit);
        xml.writeElement("cost", this.cost);
        xml.writeElement("locationid", this.locationId);
        xml.writeElement("departmentid", this.departmentId);

        if (this.itemDetails != null && this.itemDetails.length > 0) {
            xml.writeStartElement("itemdetails");
            for (const itemDetail of this.itemDetails) {
                itemDetail.writeXml(xml);
            }
            xml.writeEndElement(); // itemdetails
        }

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeElement("projectid", this.projectId);
        xml.writeElement("customerid", this.customerId);
        xml.writeElement("vendorid", this.vendorId);
        xml.writeElement("employeeid", this.employeeId);
        xml.writeElement("classid", this.classId);
        xml.writeElement("contractid", this.contractId);

        xml.writeEndElement(); // ictransitem
    }
}
