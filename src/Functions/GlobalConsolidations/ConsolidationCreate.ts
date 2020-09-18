/**
 * @module Intacct/SDK/Functions/GlobalConsolidations
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
import AbstractConsolidation from "./AbstractConsolidation";

export default class ConsolidationCreate extends AbstractConsolidation {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("consolidate");

        xml.writeElement("bookid", this.reportingBookId, true);

        xml.writeElement("reportingperiodname", this.reportingPeriodName, true);

        if (this.processOffline === true) {
            xml.writeElement("offline", "T");
        } else if (this.processOffline === false) {
            xml.writeElement("offline", "F");
        }

        xml.writeElement("updatesucceedingperiods", this.updateSucceedingPeriods);
        xml.writeElement("changesonly", this.changesOnly);
        xml.writeElement("email", this.notificationEmail);

        if (this.entities != null && this.entities.length > 0) {
            xml.writeStartElement("entities");
            for (const entity of this.entities) {
                entity.writeXml(xml);
            }
            xml.writeEndElement(); // entities
        }

        xml.writeEndElement(); // consolidate

        xml.writeEndElement(); // function
    }
}
