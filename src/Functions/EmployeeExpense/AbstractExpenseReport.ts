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
import AbstractExpenseReportLine from "./AbstractExpenseReportLine";

export default abstract class AbstractExpenseReport extends AbstractFunction {

    public recordNo: number;
    public transactionDate: Date;
    public employeeId: string;
    public expenseReportNumber: string;
    public glPostingDate: Date;
    public summaryRecordNo: number;
    public externalId: string;
    public action: string;
    public baseCurrency: string;
    public reimbursementCurrency: string;
    public attachmentsId: string;
    public reasonForExpense: string;
    public memo: string;
    public lines: AbstractExpenseReportLine[];

    public customFields: Array<[string, any]> = [];
}
