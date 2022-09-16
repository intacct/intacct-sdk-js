/**
 * @module Intacct/SDK/Functions/CashManagement
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
import IXmlObject from "../../Xml/IXmlObject";

export default abstract class AbstractBankAccountTransactionRecord implements IXmlObject {

    public transactionId: number;
    public postingDate: Date;
    public transactionType: string;
    public docType: string;
    public docNo: string;
    public payee: string;
    public amount: number;
    public description: string;
    public currency: string;

    public customFields: Array<[string, any]> = [];

    public abstract writeXml(xml: IaXmlWriter): void;
}
