/**
 * @module Intacct/SDK/Functions/Company
 */

/**
 * Copyright 2018 Sage Intacct, Inc.
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

export default class UserUpdate extends AbstractUser {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update");
        xml.writeStartElement("USERINFO");

        xml.writeElement("LOGINID", this.userId, true);

        xml.writeElement("USERTYPE", this.userType);
        xml.writeElement("DESCRIPTION", this.userName);

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        xml.writeElement("LOGINDISABLED", this.webServicesOnly);
        xml.writeElement("SSO_ENABLED", this.ssoEnabled);
        xml.writeElement("SSO_FEDERATED_ID", this.ssoFederatedId);

        if (this.restrictedEntities != null && this.restrictedEntities.length > 0) {
            for (const entity of this.restrictedEntities) {
                xml.writeStartElement("USERLOCATIONS");
                xml.writeElement("LOCATIONID", entity);
                xml.writeEndElement(); // USERLOCATIONS
            }
        }
        if (this.restrictedDepartments != null && this.restrictedDepartments.length > 0) {
            for (const department of this.restrictedDepartments) {
                xml.writeStartElement("USERDEPARTMENTS");
                xml.writeElement("DEPARTMENTID", department);
                xml.writeEndElement(); // USERDEPARTMENTS
            }
        }

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // USERINFO
        xml.writeEndElement(); // update

        xml.writeEndElement(); // function
    }
}
