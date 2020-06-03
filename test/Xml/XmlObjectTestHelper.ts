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

import * as chai from "chai";
import * as xmlbuilder from "xmlbuilder";
import IaXmlWriter from "../../src/Xml/IaXmlWriter";
import IXmlObject from "../../src/Xml/IXmlObject";

export default class XmlObjectTestHelper {

    public static CompareXml(expected: string, apiFunction: IXmlObject): void {
        const xml = new IaXmlWriter(xmlbuilder.create("test", {
            "version": "1.0",
            "encoding": "utf-8",
            "standalone": null,
        }));

        apiFunction.writeXml(xml);

        const out = xml.flush(true);

        chai.assert.equal(out, expected);
    }
}
