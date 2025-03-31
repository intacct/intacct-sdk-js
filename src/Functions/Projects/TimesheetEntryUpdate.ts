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

export default class TimesheetEntryUpdate extends AbstractTimesheetEntry {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("TIMESHEETENTRY");
        xml.writeElement("RECORDNO", this.lineRecordNo);

        xml.writeElementDate("ENTRYDATE", this.entryDate, IaXmlWriter.intacctDateFormat);

        xml.writeElement("QTY", this.quantity);

        xml.writeElement("DESCRIPTION", this.description);
        xml.writeElement("NOTES", this.notes);
        xml.writeElement("TASKID", this.taskId);
        xml.writeElement("TASKKEY", this.taskRecordNo);
        xml.writeElement("COSTTYPEID", this.costTypeId);
        xml.writeElement("TIMETYPE", this.timeTypeName);
        xml.writeElement("LABORCLASSID", this.laborClassId);
        xml.writeElement("LABORUNIONID", this.laborUnionId);
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

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // TIMESHEETENTRY
    }
}
