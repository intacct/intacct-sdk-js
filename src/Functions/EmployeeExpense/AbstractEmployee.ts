/**
 * @module Intacct/SDK/Functions/EmployeeExpense
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

export default abstract class AbstractEmployee extends AbstractFunction {

    public employeeId: string;
    public contactName: string;
    public startDate: Date;
    public title: string;
    public ssn: string;
    public employeeType: string;
    public active: boolean;
    public placeholderResource: boolean;
    public birthDate: Date;
    public endDate: Date;
    public terminationType: string;
    public managerEmployeeId: string;
    public gender: string;
    public departmentId: string;
    public locationId: string;
    public classId: string;
    public defaultCurrency: string;
    public earningTypeName: string;
    public postActualCost: boolean;
    public form1099Name: string;
    public form1099Type: string;
    public form1099Box: string;
    public attachmentFolderName: string;
    public preferredPaymentMethod: string;
    public sendAutomaticPaymentNotification: boolean;
    public mergePaymentRequests: boolean;
    public achEnabled: boolean;
    public achBankRoutingNo: string;
    public achBankAccountNo: string;
    public achBankAccountType: string;
    public achBankAccountClass: string;
    public customFields: Array<[string, any]> = [];
}
