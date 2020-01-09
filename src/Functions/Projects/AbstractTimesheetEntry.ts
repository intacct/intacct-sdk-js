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

export default abstract class AbstractTimesheetEntry extends AbstractFunction {
  public recordNo: number;
  public timesheetRecordNo: number;
  public entryDate: Date;
  public quantity: number;
  public description: string;
  public notes: string;
  public taskRecordNo: number;
  public timeTypeName: string;
  public billable: boolean;
  public overrideBillingRate: number;
  public overrideLaborCostRate: number;
  public departmentId: string;
  public locationId: string;
  public projectId: string;
  public customerId: string;
  public vendorId: string;
  public itemId: string;
  public classId: string;
  public contractId: string;
  public warehouseId: string;

  public customFields: Array<[string, any]> = [];
}
