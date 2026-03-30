/**
 * @module Intacct/SDK/Functions/Purchasing
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
import AbstractPurchasingTransactionLine from "./AbstractPurchasingTransactionLine";

export default class PurchasingTransactionLineCreate extends AbstractPurchasingTransactionLine {
  public writeXml(xml: IaXmlWriter): void {
    xml.writeStartElement("potransitem");

    xml.writeElement("itemid", this.itemId, true);
    xml.writeElement("itemdesc", this.itemDescription);
    xml.writeElement("taxable", this.taxable);
    xml.writeElement("warehouseid", this.warehouseId);
    xml.writeElement("quantity", this.quantity, true);
    xml.writeElement("unit", this.unit);
    xml.writeElement("price", this.price);
    xml.writeElement("overridetaxamount", this.overrideTaxAmount);
    xml.writeElement("tax", this.tax);
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

    xml.writeElement("form1099", this.form1099);

    xml.writeCustomFieldsExplicit(this.customFields);

    xml.writeElement("sourcelinekey", this.sourceLineKey);
    xml.writeElement("projectid", this.projectId);
    xml.writeElement("taskid", this.taskId);
    xml.writeElement("costtypeid", this.costTypeId);
    xml.writeElement("customerid", this.customerId);
    xml.writeElement("vendorid", this.vendorId);
    xml.writeElement("employeeid", this.employeeId);
    xml.writeElement("classid", this.classId);
    xml.writeElement("contractid", this.contractId);
    xml.writeElement("billable", this.billable);

    xml.writeStartElement("needbydate");
    xml.writeDateSplitElements(this.needByDate, true);
    xml.writeEndElement(); // needbydate

    xml.writeEndElement(); // potransitem
  }
}
