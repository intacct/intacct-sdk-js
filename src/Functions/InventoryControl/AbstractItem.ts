/**
 * @module Intacct/SDK/Functions/InventoryControl
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

export default abstract class AbstractItem extends AbstractFunction {

    public itemId: string;
    public active: boolean;
    public itemName: string;
    public produceLineId: string;
    public costMethod: string;
    public extendedDescription: string;
    public salesDescription: string;
    public purchasingDescription: string;
    public unitOfMeasure: string;
    public note: string;
    public expenseGlAccountNo: string;
    public arGlAccountNo: string;
    public apGlAccountNo: string;
    public inventoryGlAccountNo: string;
    public shippingWeight: string;
    public itemGlGroupName: string;
    public standardCost: string;
    public cogsGlAccountNo: string;
    public basePrice: string;
    public revenueGlAccountNo: string;
    public taxable: boolean;
    public itemTaxGroupName: string;
    public deferredRevGlAccountNo: string;
    public defaultRevRecTemplateId: string;
    public vsoeCategory: string;
    public vsoeDefaultDeliveryStatus: string;
    public vsoeDefaultDeferralStatus: string;
    public kitRevenuePosting: string;
    public kitPrintFormat: string;
    public substituteItemId: string;
    public serialTrackingEnabled: boolean;
    public serialNumberMask: string;
    public lotTrackingEnabled: boolean;
    public lotCategory: string;
    public binTrackingEnabled: boolean;
    public expTrackingEnabled: boolean;
    public upc: string;
    public unitCostPrecisionInventory: number;
    public unitCostPrecisionSales: number;
    public unitCostPrecisionPurchasing: number;
    public itemStartEndDateEnabled: boolean;
    public periodsMeasuredIn: string;
    public numberOfPeriods: number;
    public proratePriceAllowed: boolean;
    public defaultRenewalMacroId: string;

    public customFields: Array<[string, any]> = [];
}
