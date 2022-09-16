/**
 * @module Intacct/SDK/Functions/Company
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
import AbstractAttachments from "./AbstractAttachments";

export default class AttachmentsUpdate extends AbstractAttachments {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update_supdoc");

        xml.writeElement("supdocid", this.attachmentsId, true);

        xml.writeElement("supdocname", this.attachmentsName);
        xml.writeElement("supdocfoldername", this.attachmentFolderName);
        xml.writeElement("supdocdescription", this.description);

        if (this.files != null && this.files.length > 0) {
            xml.writeStartElement("attachments");
            for (const file of this.files) {
                file.writeXml(xml);
            }
            xml.writeEndElement(); // attachments
        }

        xml.writeEndElement(); // update_supdoc

        xml.writeEndElement(); // function
    }
}
