/**
 * @module Intacct/SDK/Functions/Company
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

export default abstract class AbstractLocation extends AbstractFunction {

    public locationId: string;
    public locationName: string;
    public parentLocationId: string;
    public managerEmployeeId: string;
    public locationContactName: string;
    public shipToContactName: string;
    public startDate: Date;
    public endDate: Date;
    public locationTitle: string;
    public active: boolean;

    public customFields: Array<[string, any]> = [];
}
