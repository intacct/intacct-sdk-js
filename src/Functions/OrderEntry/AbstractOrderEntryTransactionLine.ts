/**
 * @module Intacct/SDK/Functions/OrderEntry
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
import AbstractTransactionItemDetail from "../InventoryControl/AbstractTransactionItemDetail";

export default abstract class AbstractOrderEntryTransactionLine implements IXmlObject {

    public bundleNumber: string;
    public itemId: string;
    public itemDescription: string;
    public taxable: boolean;
    public warehouseId: string;
    public quantity: number;
    public unit: string;
    public discountPercent: number;
    public price: number;
    public discountSurchargeMemo: string;
    public memo: string;
    public revRecTemplate: string;
    public revRecStartDate: Date;
    public revRecEndDate: Date;
    public renewalMacro: string;
    public fulfillmentStatus: string;
    public taskNumber: string;
    public billingTemplate: string;
    public itemDetails: AbstractTransactionItemDetail[];
    public departmentId: string;
    public locationId: string;
    public projectId: string;
    public customerId: string;
    public vendorId: string;
    public employeeId: string;
    public classId: string;
    public contractId: string;
    public customFields: Array<[string, any]> = [];

    public abstract writeXml(xml: IaXmlWriter): void;
}
