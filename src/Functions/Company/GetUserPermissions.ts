/**
 * @module Intacct/SDK/Functions/Company
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
import AbstractUser from "./AbstractUser";

export default class GetUserPermissions extends AbstractUser {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        // create open tag for <getUserPermissions>
        xml.writeStartElement("getUserPermissions");

        // required userId to run
        if (this.userId == null) {
            throw new Error("User Id is required");
        }

        // add userId element and dynamic value
        xml.writeElement("userId", this.userId);

        // closing tag for </getUserPermissions>
        xml.writeEndElement();

        // closing tag for </function>
        xml.writeEndElement();

    }
}
