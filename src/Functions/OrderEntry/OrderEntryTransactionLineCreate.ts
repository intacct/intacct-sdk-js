/**
 * @module Intacct/SDK/Functions/OrderEntry
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
import AbstractOrderEntryTransactionLine from "./AbstractOrderEntryTransactionLine";

export default class OrderEntryTransactionLineCreate extends AbstractOrderEntryTransactionLine {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("sotransitem");

        xml.writeElement("bundlenumber", this.bundleNumber);
        xml.writeElement("itemid", this.itemId, true);
        xml.writeElement("itemdesc", this.itemDescription);
        xml.writeElement("taxable", this.taxable);
        xml.writeElement("warehouseid", this.warehouseId);
        xml.writeElement("quantity", this.quantity, true);
        xml.writeElement("unit", this.unit);
        xml.writeElement("discountpercent", this.discountPercent);
        xml.writeElement("price", this.price);
        xml.writeElement("discsurchargememo", this.discountSurchargeMemo);
        xml.writeElement("locationid", this.locationId);
        xml.writeElement("departmentid", this.departmentId);
        xml.writeElement("memo", this.memo);

        if (this.itemDetails != null && this.itemDetails.length > 0) {
            xml.writeStartElement("itemdetails");
            for (const itemDetail of this.itemDetails) {
                itemDetail.writeXml(xml);
            }
            xml.writeEndElement(); // itemdetails
        }

        xml.writeCustomFieldsExplicit(this.customFields);

        xml.writeElement("revrectemplate", this.revRecTemplate);

        if (this.revRecStartDate != null) {
            xml.writeStartElement("revrecstartdate");
            xml.writeDateSplitElements(this.revRecStartDate);
            xml.writeEndElement(); // revrecstartdate
        }

        if (this.revRecEndDate != null) {
            xml.writeStartElement("revrecenddate");
            xml.writeDateSplitElements(this.revRecEndDate);
            xml.writeEndElement(); // revrecenddate
        }

        xml.writeElement("renewalmacro", this.renewalMacro);

        xml.writeElement("projectid", this.projectId);
        xml.writeElement("customerid", this.customerId);
        xml.writeElement("vendorid", this.vendorId);
        xml.writeElement("employeeid", this.employeeId);
        xml.writeElement("classid", this.classId);
        xml.writeElement("contractid", this.contractId);

        if (this.fulfillmentStatus) {
            xml.writeStartElement("fulfillmentstatus");
            xml.writeElement("deliverystatus", this.fulfillmentStatus);
            xml.writeEndElement(); // fulfillmentstatus
        }

        xml.writeElement("taskno", this.taskNumber);
        xml.writeElement("billingtemplate", this.billingTemplate);

        xml.writeEndElement(); // sotransitem
    }
}
