/**
 * @module Intacct/SDK/Functions/Purchasing
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

export default abstract class AbstractPurchasingTransactionLine
  implements IXmlObject
{
  public itemId: string;
  public itemDescription: string;
  public taxable: boolean;
  public warehouseId: string;
  public quantity: number;
  public unit: string;
  public price: number;
  public overrideTaxAmount: number;
  public tax: number;
  public memo: string;
  public form1099: boolean;
  public billable: boolean;
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
  public costTypeId: string;
  public taskId: string;
  public needByDate: Date;
  public sourceLineKey: string;

  public abstract writeXml(xml: IaXmlWriter): void;
}
