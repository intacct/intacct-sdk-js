/**
 * @module Intacct/SDK/Functions/Purchasing
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
import AbstractPurchasingTransaction from "./AbstractPurchasingTransaction";

export default class PurchasingTransactionCreate extends AbstractPurchasingTransaction {
  public writeXml(xml: IaXmlWriter): void {
    xml.writeStartElement("function");
    xml.writeAttribute("controlid", this.controlId, true);

    xml.writeStartElement("create_potransaction");

    xml.writeElement("transactiontype", this.transactionDefinition, true);

    xml.writeStartElement("datecreated");
    xml.writeDateSplitElements(this.transactionDate, true);
    xml.writeEndElement(); // datecreated

    if (this.glPostingDate != null) {
      xml.writeStartElement("dateposted");
      xml.writeDateSplitElements(this.glPostingDate);
      xml.writeEndElement(); // dateposted
    }

    xml.writeElement("createdfrom", this.createdFrom);
    xml.writeElement("vendorid", this.vendorId, true);
    xml.writeElement("documentno", this.documentNumber);

    xml.writeElement("referenceno", this.referenceNumber);
    xml.writeElement("vendordocno", this.vendorDocNumber);
    xml.writeElement("termname", this.paymentTerm);

    if (this.dueDate != null) {
      xml.writeStartElement("datedue");
      xml.writeDateSplitElements(this.dueDate, true);
      xml.writeEndElement(); // datedue
    }

    xml.writeElement("message", this.message);
    xml.writeElement("shippingmethod", this.shippingMethod);

    xml.writeStartElement("returnto");
    xml.writeElement("contactname", this.returnToContactName, true);
    xml.writeEndElement(); // returnto

    xml.writeStartElement("payto");
    xml.writeElement("contactname", this.payToContactName, true);
    xml.writeEndElement(); // payto

    xml.writeElement("supdocid", this.attachmentsId);
    xml.writeElement("externalid", this.externalId);

    this.writeXmlMultiCurrencySection(xml);

    xml.writeCustomFieldsExplicit(this.customFields);

    xml.writeElement("state", this.state);

    xml.writeElement("projectid", this.projectId);

    xml.writeStartElement("potransitems");
    if (this.lines != null && this.lines.length > 0) {
      for (const line of this.lines) {
        line.writeXml(xml);
      }
    }
    xml.writeEndElement(); // potransitems

    if (this.subtotals != null && this.subtotals.length > 0) {
      xml.writeStartElement("subtotals");
      for (const subtotal of this.subtotals) {
        subtotal.writeXml(xml);
      }
      xml.writeEndElement(); // subtotals
    }

    xml.writeEndElement(); // create_potransaction

    xml.writeEndElement(); // function
  }
}
