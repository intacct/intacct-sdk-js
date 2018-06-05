/**
 * @module Intacct/SDK/Functions/AccountsReceivable
 */

/**
 * Copyright 2018 Sage Intacct, Inc.
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
import ArPaymentItem from "./ArPaymentItem";

export default abstract class AbstractArPayment extends AbstractFunction {

    public recordNo: number;
    public paymentMethod: string;
    public bankAccountId: string;
    public undepositedFundsGlAccountNo: string;
    public transactionCurrency: string;
    public baseCurrency: string;
    public customerId: string;
    public receivedDate: Date;
    public transactionPaymentAmount: number;
    public basePaymentAmount: number;
    public exchangeRateDate: Date;
    public exchangeRateValue: number;
    public exchangeRateType: string;
    public creditCardType: string;
    public authorizationCode: string;
    public overpaymentLocationId: string;
    public overpaymentDepartmentId: string;
    public referenceNumber: string;

    public applyToTransactions: ArPaymentItem[];
}
