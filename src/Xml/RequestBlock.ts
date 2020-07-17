/**
 * @module Intacct/SDK/Xml
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

import * as xmlbuilder from "xmlbuilder";
import ClientConfig from "../ClientConfig";
import IFunction from "../Functions/IFunction";
import RequestConfig from "../RequestConfig";
import IaXmlWriter from "./IaXmlWriter";
import ControlBlock from "./Request/ControlBlock";
import OperationBlock from "./Request/OperationBlock";

export default class RequestBlock {

    public controlBlock: ControlBlock;

    public operationBlock: OperationBlock;

    private _encoding: string;
    get encoding(): string {
        return this._encoding;
    }
    set encoding(encoding: string) {
        if (encoding == null) {
            encoding = "utf-8";
        }
        // TODO Can this validate it is a supported encoding by the system?

        this._encoding = encoding;
    }

    constructor(clientConfig: ClientConfig, requestConfig: RequestConfig, content: IFunction[]) {
        this.encoding = requestConfig.encoding;
        this.controlBlock = new ControlBlock(clientConfig, requestConfig);
        this.operationBlock = new OperationBlock(clientConfig, requestConfig, content);
    }

    public writeXml(): string {
        const xml = new IaXmlWriter(xmlbuilder.create("request", {
            "version": "1.0",
            "encoding": this.encoding,
            "standalone": null,
        }));

        this.controlBlock.writeXml(xml);
        this.operationBlock.writeXml(xml);

        return xml.flush(false);
    }
}
