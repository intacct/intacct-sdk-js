/**
 * @module Intacct/SDK/Functions/Common/Query/Comparison/EqualTo
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

import AbstractNull from "../AbstractNull";

export default class EqualToNull extends AbstractNull {

    public toString(): string {
        let clause = "";

        if (this.negate === true) {
            clause = clause + this.field + " IS NOT NULL";
        } else {
            clause = clause + this.field + " IS NULL";
        }

        return clause;
    }
}
