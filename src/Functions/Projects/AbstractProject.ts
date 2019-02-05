/**
 * @module Intacct/SDK/Functions/Projects
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

export default abstract class AbstractProject extends AbstractFunction {

    public projectId: string;

    public projectName: string;

    public projectCategory: string;

    public description: string;

    public parentProjectId: string;

    public invoiceWithParent: boolean;

    public projectType: string;

    public projectStatus: string;

    public customerId: string;

    public projectManagerEmployeeId: string;

    public externalUserId: string;

    public salesContactEmployeeId: string;

    public referenceNo: string;

    public userRestrictions: string;

    public transactionRules: string[];

    public active: boolean;

    public primaryContactName: string;

    public billToContactName: string;

    public shipToContactName: string;

    public paymentTerms: string;

    public billingType: string;

    public beginDate: Date;

    public endDate: Date;

    public departmentId: string;

    public locationId: string;

    public classId: string;

    public attachmentsId: string;

    public billableEmployeeExpense: boolean;

    public billableApPurchasing: boolean;

    // TODO implement observedPercentComplete as separate object like other SDK's

    public currency: string;

    public salesOrderNo: string;

    public purchaseOrderNo: string;

    public purchaseOrderAmount: string;

    public purchaseQuoteNo: string;

    public contractAmount: string;

    public laborPricingOption: string;

    public laborPricingDefaultRate: string;

    public expensePricingOption: string;

    public expensePricingDefaultRate: string;

    public apPurchasingPricingOption: string;

    public apPurchasingPricingDefaultRate: string;

    public budgetedBillingAmount: string;

    public budgetedCost: string;

    public budgetedDuration: string;

    public glBudgetId: string;

    public invoiceMessage: string;

    public invoiceCurrency: string;

    public customFields: Array<[string, any]> = [];
}
