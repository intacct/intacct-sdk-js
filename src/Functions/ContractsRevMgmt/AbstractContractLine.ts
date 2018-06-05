/**
 * @module Intacct/SDK/Functions/ContractsRevMgmt
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

export default abstract class AbstractContractLine extends AbstractFunction {

    public recordNo: number;
    public contractId: string;
    public itemId: string;
    public beginDate: Date;
    public endDate: Date;
    public itemDescription: string;
    public renewal: boolean;
    public exchangeRateDate: Date;
    public exchangeRateValue: number;
    public billingMethod: string;
    public fixedPriceFrequency: string;
    public billingTemplate: string;
    public billingStartDate: Date;
    public billingEndDate: Date;
    public fixedPriceQuantity: number;
    public fixedPriceRate: number;
    public fixedPriceMultiplier: number;
    public fixedPriceDiscountPercent: number;
    public flatFixedAmount: number;
    public revenue1Template: string;
    public revenue1StartDate: Date;
    public revenue1EndDate: Date;
    public revenue2Template: string;
    public revenue2StartDate: Date;
    public revenue2EndDate: Date;
    public shipToContactName: string;
    public locationId: string;
    public departmentId: string;
    public projectId: string;
    public vendorId: string;
    public employeeId: string;
    public classId: string;

    public customFields: Array<[string, any]> = [];
}
