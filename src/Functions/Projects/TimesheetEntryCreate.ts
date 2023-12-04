/**
 * @module Intacct/SDK/Functions/Projects
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
import AbstractTimesheetEntry from "./AbstractTimesheetEntry";

export default class TimesheetEntryCreate extends AbstractTimesheetEntry {
  private _isEmbedded: boolean;
  constructor(isEmbedded = true) {
    super(...arguments);
    this._isEmbedded = isEmbedded;
  }

  public writeXml(xml: IaXmlWriter): void {
    if (!this._isEmbedded) {
      xml.writeStartElement("function");
      xml.writeAttribute("controlid", this.controlId, true);
      xml.writeStartElement("create");
    }
    xml.writeStartElement("TIMESHEETENTRY");
    if (!this._isEmbedded) {
      xml.writeElement("TIMESHEETKEY", this.timesheetRecordNo);
    }
    if (this._isEmbedded && this.recordNo) {
      xml.writeElement("RECORDNO", this.recordNo);
    }

    xml.writeElementDate("ENTRYDATE", this.entryDate, IaXmlWriter.intacctDateFormat);

    xml.writeElement("QTY", this.quantity, true);

    xml.writeElement("DESCRIPTION", this.description);
    xml.writeElement("NOTES", this.notes);
    xml.writeElement("TASKKEY", this.taskRecordNo);
    xml.writeElement("TASKID", this.taskId);
    xml.writeElement("TIMETYPE", this.timeTypeName);
    xml.writeElement("BILLABLE", this.billable);

    xml.writeElement("EXTBILLRATE", this.overrideBillingRate);
    xml.writeElement("EXTCOSTRATE", this.overrideLaborCostRate);

    xml.writeElement("DEPARTMENTID", this.departmentId);
    xml.writeElement("LOCATIONID", this.locationId);
    xml.writeElement("PROJECTID", this.projectId);
    xml.writeElement("CUSTOMERID", this.customerId);
    xml.writeElement("VENDORID", this.vendorId);
    xml.writeElement("ITEMID", this.itemId);
    xml.writeElement("CLASSID", this.classId);
    xml.writeElement("CONTRACTID", this.contractId);
    xml.writeElement("WAREHOUSEID", this.warehouseId);
    xml.writeElement("COSTTYPEID", this.costtypeId);
    if (this.employeepositionId) {
      xml.writeElement("EMPPOSITIONID", this.employeepositionId);
    }
    if (this.laborclassId) {
      xml.writeElement("LABORCLASSID", this.laborclassId);
    }
    if (this.laborshiftId) {
      xml.writeElement("LABORSHIFTID", this.laborshiftId);
    }
    if (this.laborunionId) {
      xml.writeElement("LABORUNIONID", this.laborunionId);
    }

    xml.writeCustomFieldsImplicit(this.customFields);

    xml.writeEndElement(); // TIMESHEETENTRY
    if (!this._isEmbedded) {
      xml.writeEndElement(); // create
      xml.writeEndElement(); // function
    }
  }
}
