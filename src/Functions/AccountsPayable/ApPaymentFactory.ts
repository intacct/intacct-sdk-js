/**
 * @module Intacct/SDK/Functions/AccountsPayable
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

import IntacctException from "../../Exceptions/IntacctException";
import AbstractApPaymentFunction from "./AbstractApPaymentFunction";
import ApPaymentApprove from "./ApPaymentApprove";
import ApPaymentConfirm from "./ApPaymentConfirm";
import ApPaymentDecline from "./ApPaymentDecline";
import ApPaymentDelete from "./ApPaymentDelete";
import ApPaymentSend from "./ApPaymentSend";
import ApPaymentVoid from "./ApPaymentVoid";

export default class ApPaymentFactory {
    public static create(type: string, recordno: number, controlId: string): AbstractApPaymentFunction {
        let apPaymentFunction: AbstractApPaymentFunction;

        switch (type) {
            case AbstractApPaymentFunction.DELETE:
                apPaymentFunction = new ApPaymentDelete(recordno, controlId);
                break;
            case AbstractApPaymentFunction.DECLINE:
                apPaymentFunction = new ApPaymentDecline(recordno, controlId);
                break;
            case AbstractApPaymentFunction.CONFIRM:
                apPaymentFunction = new ApPaymentConfirm(recordno, controlId);
                break;
            case AbstractApPaymentFunction.APPROVE:
                apPaymentFunction = new ApPaymentApprove(recordno, controlId);
                break;
            case AbstractApPaymentFunction.SEND:
                apPaymentFunction = new ApPaymentSend(recordno, controlId);
                break;
            case AbstractApPaymentFunction.VOID:
                apPaymentFunction = new ApPaymentVoid(recordno, controlId);
                break;
            default:
                throw new IntacctException("Cannot generate" + type + ".");
            }

        return apPaymentFunction;
    }
}
