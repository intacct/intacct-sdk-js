/**
 * @module Intacct/SDK/Functions/InventoryControl
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
import AbstractWarehouse from "./AbstractWarehouse";

export default class WarehouseCreate extends AbstractWarehouse {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create");
        xml.writeStartElement("WAREHOUSE");

        xml.writeElement("WAREHOUSEID", this.warehouseId, true);

        xml.writeElement("NAME", this.warehouseName, true);

        xml.writeStartElement("LOC");
        xml.writeElement("LOCATIONID", this.locationId);
        xml.writeEndElement(); // LOC

        xml.writeElement("MANAGERID", this.managerEmployeeId);
        xml.writeElement("PARENTID", this.parentWarehouseId);

        if (this.warehouseContactName != null) {
            xml.writeStartElement("CONTACTINFO");
            xml.writeElement("CONTACTNAME", this.warehouseContactName);
            xml.writeEndElement(); // CONTACTINFO
        }
        if (this.shipToContactName != null) {
            xml.writeStartElement("SHIPTO");
            xml.writeElement("CONTACTNAME", this.shipToContactName);
            xml.writeEndElement(); // SHIPTO
        }

        if (this.vendorRecordNo != null) {
            xml.writeElement("RVENDOR", this.vendorRecordNo);
        }

        xml.writeElement("USEDINGL", this.usedInGeneralLedger);

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // WAREHOUSE
        xml.writeEndElement(); // create

        xml.writeEndElement(); // function
    }
}
