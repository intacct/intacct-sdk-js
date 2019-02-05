/**
 * @module Intacct/SDK/Functions/GeneralLedger
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
import AbstractGlEntry from "./AbstractGlEntry";

export default abstract class AbstractJournalEntryLine extends AbstractGlEntry {

    public glAccountNumber: string;
    public transactionAmount: number;
    public transactionCurrencyCode: string;
    public exchangeRateDate: Date;
    public exchangeRateValue: number;
    public exchangeRateType: string;

    public abstract writeXml(xml: IaXmlWriter): void;
}
