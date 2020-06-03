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

import AbstractFunction from "../AbstractFunction";
import ApPaymentRequestItem from "./ApPaymentRequestItem";

export default abstract class AbstractApPaymentRequest extends AbstractFunction {

    public recordNo: number;
    public paymentMethod: string;
    public bankAccountId: string;
    public chargeCardId: string;
    public vendorId: string;
    public mergeOption: string;
    public groupPayments: boolean;
    public paymentDate: Date;
    public transactionAmount: number;
    public documentNo: string;
    public memo: string;
    public notificationContactName: string;
    public applyToTransactions: ApPaymentRequestItem[];
}
