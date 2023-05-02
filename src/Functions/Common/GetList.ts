/**
 * @module Intacct/SDK/Functions/Common
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
import AbstractFunction from "../AbstractFunction";

export default class GetList extends AbstractFunction {
  public object: string;
  /** Maximum number of items to return. */
  public maxitems?: number;
  /** List of fields to return in the response. */
  public fields?: string[];
  /** First item from total result set to include in response, zero-based integer. */
  public start?: number;
  /** Show entity private records if running this at top level. */
  public showprivate?: boolean;
  // TODO: write filter property on GetList
  /** Limits the objects to return based on their field values. */
  // public filter?: unknown;
  /** Sorts the objects to return based on their field values. */
  public sorts?: Array<Record<string, "asc" | "desc">>;

  public writeXml(xml: IaXmlWriter): void {
    xml.writeStartElement("function");
    xml.writeAttribute("controlid", this.controlId, true);

    xml.writeStartElement("get_list");
    xml.writeAttribute("object", this.object);

    if (this.maxitems != null) {
      // The API supports a negative maxitem, so no validation performed
      xml.writeAttribute("maxitems", this.maxitems);
    }

    if (this.start != null) {
      // The API supports a negative start, so no validation performed
      xml.writeAttribute("start", this.start);
    }

    if (this.showprivate != null) {
      xml.writeAttribute("showprivate", this.showprivate);
    }

    // TODO: filter

    if (this.fields != null && this.fields.length > 0) {
      xml.writeStartElement("fields");
      for (const field of this.fields) {
        xml.writeElement("field", field, false);
      }
      xml.writeEndElement(); // fields
    }

    if (this.sorts != null && this.sorts.length > 0) {
      xml.writeStartElement("sorts");
      for (const sort of this.sorts) {
        for (const field in sort) {
          if (sort.hasOwnProperty(field)) {
            xml.writeStartElement("sortfield");
            xml.writeAttribute("order", sort[field]);
            xml.writeText(field);
            xml.writeEndElement(); // sortfield
          }
        }
      }
      xml.writeEndElement(); // sorts
    }

    xml.writeEndElement(); // get_list

    xml.writeEndElement(); // function
  }
}
