/**
 * @module Intacct/SDK/Functions/CashManagement
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
import AbstractFunction from "../AbstractFunction";
import AbstractBankAccountTransactionRecord from "./AbstractBankAccountTransactionRecord";

export default abstract class AbstractBankFeeds extends AbstractFunction {

    public recordNo: number;
    public financialEntity: string;
    public feedDate: Date;
    public feedType: string;
    public fileName: string;

    public bankAccountTxnRecords: AbstractBankAccountTransactionRecord[];

    public customFields: Array<[string, any]> = [];

    public abstract writeXml(xml: IaXmlWriter): void;
}
