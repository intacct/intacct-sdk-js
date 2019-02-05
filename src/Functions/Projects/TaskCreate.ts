/**
 * @module Intacct/SDK/Functions/Projects
 */

/**
 * Copyright 2019 Sage Intacct, Inc.
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
import AbstractTask from "./AbstractTask";

export default class TaskCreate extends AbstractTask {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create");
        xml.writeStartElement("TASK");

        xml.writeElement("NAME", this.taskName, true);
        xml.writeElement("PROJECTID", this.projectId, true);

        xml.writeElementDate("PBEGINDATE", this.plannedBeginDate, IaXmlWriter.intacctDateFormat);
        xml.writeElementDate("PENDDATE", this.plannedEndDate, IaXmlWriter.intacctDateFormat);
        xml.writeElement("CLASSID", this.classId);
        xml.writeElement("ITEMID", this.itemId);
        xml.writeElement("BILLABLE", this.billable);
        xml.writeElement("DESCRIPTION", this.description);
        xml.writeElement("ISMILESTONE", this.milestone);
        xml.writeElement("UTILIZED", this.utilized);
        xml.writeElement("PRIORITY", this.priority);
        xml.writeElement("TASKNO", this.wbsCode);
        xml.writeElement("TASKSTATUS", this.taskStatus);
        xml.writeElement("TIMETYPENAME", this.timeType);
        xml.writeElement("PARENTKEY", this.parentTaskRecordNo);
        xml.writeElement("SUPDOCID", this.attachmentsId);
        xml.writeElement("BUDGETQTY", this.plannedDuration);
        xml.writeElement("ESTQTY", this.estimatedDuration);

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // TASK
        xml.writeEndElement(); // create

        xml.writeEndElement(); // function
    }
}
