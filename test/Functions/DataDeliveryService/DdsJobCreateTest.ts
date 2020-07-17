/*
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

import DdsJobCreate from "../../../src/Functions/DataDeliveryService/DdsJobCreate";
import XmlObjectTestHelper from "../../Xml/XmlObjectTestHelper";

describe("DdsJobCreate", () => {
    before((done) => {
        return done();
    });
    beforeEach((done) => {
        return done();
    });
    afterEach((done) => {
        return done();
    });
    after((done) => {
        return done();
    });
    it("should build DdsJobCreate object", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <runDdsJob>
            <object>GLACCOUNT</object>
            <cloudDelivery>My Cloud Bucket</cloudDelivery>
            <jobType>all</jobType>
            <fileConfiguration />
        </runDdsJob>
    </function>
</test>`;

        const record = new DdsJobCreate();
        record.controlId = "unittest";
        record.objectName = "GLACCOUNT";
        record.cloudDeliveryName = "My Cloud Bucket";
        record.jobType = "all";

        XmlObjectTestHelper.CompareXml(expected, record);
    });
    it("should build DdsJobCreate object with all fields", () => {
        const expected = `<?xml version="1.0" encoding="utf-8" ?>
<test>
    <function controlid="unittest">
        <runDdsJob>
            <object>GLACCOUNT</object>
            <cloudDelivery>My Cloud Bucket</cloudDelivery>
            <jobType>change</jobType>
            <timeStamp>2002-09-24T13:00:00Z</timeStamp>
            <fileConfiguration>
                <delimiter>,</delimiter>
                <enclosure>"</enclosure>
                <includeHeaders>true</includeHeaders>
                <fileFormat>unix</fileFormat>
                <splitSize>10000</splitSize>
                <compress>false</compress>
            </fileConfiguration>
        </runDdsJob>
    </function>
</test>`;

        const record = new DdsJobCreate();
        record.controlId = "unittest";
        record.objectName = "GLACCOUNT";
        record.cloudDeliveryName = "My Cloud Bucket";
        record.jobType = "change";
        record.timestamp = new Date("09/24/2002 06:00:00 -07:00");
        record.delimiter = ",";
        record.enclosure = "\"";
        record.includeHeaders = true;
        record.fileFormat = "unix";
        record.splitSize = 10000;
        record.compressed = false;

        XmlObjectTestHelper.CompareXml(expected, record);
    });
});
