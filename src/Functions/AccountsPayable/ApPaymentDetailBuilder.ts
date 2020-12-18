/**
 * @module Intacct/SDK/Functions/AccountsPayable
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

import ApPaymentDetailBill from "./ApPaymentDetailBill";
import ApPaymentDetailBillInfo from "./ApPaymentDetailBillInfo";
import ApPaymentDetailCreditMemo from "./ApPaymentDetailCreditMemo";
import ApPaymentDetailInfo from "./ApPaymentDetailInfo";
import IApPaymentDetail from "./IApPaymentDetail";

export default class ApPaymentDetailBuilder {
    private readonly detailList: IApPaymentDetail[];

    constructor() {
        this.detailList = [];
    }

    public addApPaymentDetailBill(info: ApPaymentDetailBillInfo): ApPaymentDetailBuilder {
        this.detailList.push(new ApPaymentDetailBill(info));
        return this;
    }

    public addApPaymentDetailCreditMemo(info: ApPaymentDetailInfo): ApPaymentDetailBuilder {
        this.detailList.push(new ApPaymentDetailCreditMemo(info));
        return this;
    }

    public getApPaymentDetailList(): IApPaymentDetail[] {
        return this.detailList;
    }
}
