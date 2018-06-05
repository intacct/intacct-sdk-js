/**
 * @module Intacct/SDK/Functions/Company
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
import AbstractAllocationLine from "./AbstractAllocationLine";

export default class AllocationLine extends AbstractAllocationLine {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("ALLOCATIONENTRY");

        xml.writeElement("VALUE", this.amount, true);

        xml.writeElement("LOCATIONID", this.locationId, true);
        xml.writeElement("DEPARTMENTID", this.departmentId);
        xml.writeElement("PROJECTID", this.projectId);
        xml.writeElement("CUSTOMERID", this.customerId);
        xml.writeElement("VENDORID", this.vendorId);
        xml.writeElement("EMPLOYEEID", this.employeeId);
        xml.writeElement("ITEMID", this.itemId);
        xml.writeElement("CLASSID", this.classId);
        xml.writeElement("CONTRACTID", this.contractId);
        xml.writeElement("WAREHOUSEID", this.warehouseId);

        xml.writeEndElement(); // ALLOCATIONENTRY
    }
}
