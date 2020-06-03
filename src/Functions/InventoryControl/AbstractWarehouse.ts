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

export default abstract class AbstractWarehouse extends AbstractFunction {

    public recordNo: number;

    public warehouseId: string;

    public warehouseName: string;

    public locationId: string;

    public managerEmployeeId: string;

    public parentWarehouseId: string;

    public warehouseContactName: string;

    public shipToContactName: string;

    public usedInGeneralLedger: boolean;

    public active: boolean;

    public customFields: Array<[string, any]> = [];
}
