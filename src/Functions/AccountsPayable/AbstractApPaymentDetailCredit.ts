/**
 * @module Intacct/SDK/Functions/AccountsPayable
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

export default abstract class AbstractApPaymentDetailCredit {

    public static readonly DEBIT_MEMO = "debit memo";

    public static readonly NEGATIVE_BILL = "negative bill";

    public static readonly ADVANCE = "advance";

    public recordNo: number;

    public lineRecordNo: number;

    public transactionAmount: number;

    public writeXml(xml: IaXmlWriter): void {
        xml.writeElement(this.getKeyType(), this.recordNo, true);
        xml.writeElement(this.getEntryKeyType(), this.lineRecordNo);
        xml.writeElement(this.getTransactionType(), this.transactionAmount);
    }

    protected abstract getKeyType(): string;

    protected abstract getEntryKeyType(): string;

    protected abstract getTransactionType(): string;
}
