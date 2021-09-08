/**
 * @module Intacct/SDK/Functions/OrderEntry
 */

/**
 * Copyright 2021 Sage Intacct, Inc.
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
import AbstractFunction from "../AbstractFunction";

/**
 * Implementation of API described here:
 * https://developer.intacct.com/api/order-entry/order-entry-transactions/#get-order-entry-transaction-pdf-data
 */
export default class OrderEntryRetreivePDF extends AbstractFunction {

  public documentId: string;

  public writeXml(xml: IaXmlWriter): void {
    xml.writeStartElement("function");
    xml.writeAttribute("controlid", this.controlId, true);

    xml.writeStartElement("retrievepdf");
    xml.writeStartElement("SODOCUMENT");

    xml.writeElement("DOCID", this.documentId, true);

    xml.writeEndElement(); // SODOCUMENT

    xml.writeEndElement(); // retrievepdf

    xml.writeEndElement(); // function
  }
}
