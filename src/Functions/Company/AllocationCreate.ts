/**
 * @module Intacct/SDK/Functions/Company
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
import AbstractAllocation from "./AbstractAllocation";

export default class AllocationCreate extends AbstractAllocation {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create");
        xml.writeStartElement("ALLOCATION");

        xml.writeElement("ALLOCATIONID", this.allocationId, true);
        xml.writeElement("TYPE", this.allocationBy, true);

        xml.writeElement("DESCRIPTION", this.description);
        xml.writeElement("DOCNUMBER", this.documentNo);
        xml.writeElement("SUPDOCID", this.attachmentsId);

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        if (this.lines != null && this.lines.length > 0) {
            xml.writeStartElement("ALLOCATIONENTRIES");
            for (const line of this.lines) {
                line.writeXml(xml);
            }
            xml.writeEndElement(); // ALLOCATIONENTRIES
        }

        xml.writeEndElement(); // ALLOCATION
        xml.writeEndElement(); // create

        xml.writeEndElement(); // function
    }
}
