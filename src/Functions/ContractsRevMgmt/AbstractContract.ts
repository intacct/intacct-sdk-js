/**
 * @module Intacct/SDK/Functions/ContractsRevMgmt
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

import AbstractFunction from "../AbstractFunction";

export default abstract class AbstractContract extends AbstractFunction {

    public recordNo: number;
    public contractId: string;
    public customerId: string;
    public contractName: string;
    public billToContactName: string;
    public description: string;
    public shipToContactName: string;
    public beginDate: Date;
    public endDate: Date;
    public billingFrequency: string;
    public paymentTerm: string;
    public billingPriceList: string;
    public fairValuePriceList: string;
    public attachmentsId: string;
    public locationId: string;
    public departmentId: string;
    public projectId: string;
    public vendorId: string;
    public employeeId: string;
    public classId: string;
    public transactionCurrency: string;
    public exchangeRateType: string;
    public renewal: boolean;
    public renewalTemplate: string;
    public renewalTermLength: string;
    public renewalTermPeriod: string;

    public customFields: Array<[string, any]> = [];
}
