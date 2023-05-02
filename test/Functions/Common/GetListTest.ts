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

import GetList from "../../../src/Functions/Common/GetList";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("GetList", () => {
  it("should get company info", () => {
    const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <get_list object="company_info" />
    </function>
</test>`;

    const record = new GetList("unittest");
    record.object = "company_info";

    XmlObjectTestHelper.CompareXml(expected, record);
  });
  it("should get attachment with all attributes", () => {
    const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <get_list object="supdoc" maxitems="1" start="10" showprivate="true">
            <fields>
                <field>recordno</field>
                <field>supdocid</field>
            </fields>
            <sorts>
                <sortfield order="asc">recordno</sortfield>
                <sortfield order="desc">supdocid</sortfield>
            </sorts>
        </get_list>
    </function>
</test>`;

    const record = new GetList("unittest");
    record.object = "supdoc";
    record.maxitems = 1;
    record.start = 10;
    record.showprivate = true;
    record.fields = ["recordno", "supdocid"];
    record.sorts = [{ recordno: "asc" }, { supdocid: "desc" }];

    XmlObjectTestHelper.CompareXml(expected, record);
  });
});
