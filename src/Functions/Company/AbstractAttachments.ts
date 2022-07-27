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
import AbstractFunction from "../AbstractFunction";
import AttachmentFile from "./AttachmentFile";

export default abstract class AbstractAttachments extends AbstractFunction {

    public attachmentsId: string;
    public attachmentsName: string;
    public attachmentFolderName: string;
    public description: string;
    public files: AttachmentFile[];

    public abstract writeXml(xml: IaXmlWriter): void;
}
