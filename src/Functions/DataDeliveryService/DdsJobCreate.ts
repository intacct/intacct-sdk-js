/**
 * @module Intacct/SDK/Functions/DataDeliveryService
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

import dateFormat = require("dateformat");
import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractFunction from "../AbstractFunction";

export default class DdsJobCreate extends AbstractFunction {

    public objectName: string;
    public cloudDeliveryName: string;
    public jobType: string;
    public timestamp: Date;
    public delimiter: string;
    public enclosure: string;
    public includeHeaders: boolean;
    public fileFormat: string;
    public splitSize: number;
    public compressed: boolean;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("runDdsJob");

        xml.writeElement("object", this.objectName, true);
        xml.writeElement("cloudDelivery", this.cloudDeliveryName, true);
        xml.writeElement("jobType", this.jobType, true);

        if (this.timestamp != null) {
            xml.writeElementDate("timeStamp", this.timestamp, dateFormat.masks.isoUtcDateTime);
            // TODO: review this format = 2002-09-24T06:00:00
        }

        xml.writeStartElement("fileConfiguration");

        xml.writeElement("delimiter", this.delimiter);
        xml.writeElement("enclosure", this.enclosure);
        xml.writeElement("includeHeaders", this.includeHeaders);
        xml.writeElement("fileFormat", this.fileFormat);
        xml.writeElement("splitSize", this.splitSize);
        xml.writeElement("compress", this.compressed);

        xml.writeEndElement(); // fileConfiguration

        xml.writeEndElement(); // runDdsJob

        xml.writeEndElement(); // function
    }
}
