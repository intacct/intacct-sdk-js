/**
 * @module Intacct/SDK/Functions/GeneralLedger
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
import AbstractStatisticalJournalEntryLine from "./AbstractStatisticalJournalEntryLine";

export default class StatisticalJournalEntryLineCreate extends AbstractStatisticalJournalEntryLine {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("GLENTRY");

        xml.writeElement("DOCUMENT", this.documentNumber);
        xml.writeElement("ACCOUNTNO", this.statAccountNumber, true);
        if (this.amount < 0) {
            xml.writeElement("TR_TYPE", "-1"); // Decrease
            xml.writeElement("TRX_AMOUNT", Math.abs(this.amount), true);
        } else {
            xml.writeElement("TR_TYPE", "1"); // Increase
            xml.writeElement("TRX_AMOUNT", this.amount, true);
        }

        if (this.allocationId != null) {
            xml.writeElement("ALLOCATION", this.allocationId);

            if (this.allocationId === StatisticalJournalEntryLineCreate.CUSTOM_ALLOCATION_ID) {
                for (const split of this.customAllocationSplits) {
                    split.writeXml(xml);
                }
            }
        } else {
            xml.writeElement("LOCATION", this.locationId);
            xml.writeElement("DEPARTMENT", this.departmentId);
            xml.writeElement("PROJECTID", this.projectId);
            xml.writeElement("TASKID", this.taskId);
            xml.writeElement("COSTTYPEID", this.costTypeId);
            xml.writeElement("CUSTOMERID", this.customerId);
            xml.writeElement("VENDORID", this.vendorId);
            xml.writeElement("EMPLOYEEID", this.employeeId);
            xml.writeElement("ITEMID", this.itemId);
            xml.writeElement("CLASSID", this.classId);
            xml.writeElement("CONTRACTID", this.contractId);
            xml.writeElement("WAREHOUSEID", this.warehouseId);
        }

        xml.writeElement("DESCRIPTION", this.memo);

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // GLENTRY
    }
}
