/**
 * @module Intacct/SDK/Functions/CashManagement
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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import IXmlObject from "../../Xml/IXmlObject";

export default abstract class AbstractOtherReceiptLine implements IXmlObject {

    public accountLabel: string;
    public glAccountNumber: string;
    public transactionAmount: number;
    public memo: string;
    public departmentId: string;
    public locationId: string;
    public projectId: string;
    public customerId: string;
    public vendorId: string;
    public employeeId: string;
    public itemId: string;
    public classId: string;
    public contractId: string;
    public warehouseId: string;

    public customFields: Array<[string, any]> = [];

    public abstract writeXml(xml: IaXmlWriter): void;
}
