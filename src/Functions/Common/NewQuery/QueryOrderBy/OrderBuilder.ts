/**
 * @module Intacct/SDK/Functions/Common/NewQuery/QueryOrderBy
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

import IOrder from "./IOrder";
import OrderAscending from "./OrderAscending";
import OrderDescending from "./OrderDescending";

export default class OrderBuilder {
    private orderList: IOrder[];

    constructor() {
        this.orderList = [] as IOrder[];
    }

    /**
     * Adds an ascending order for given fieldName to list of orders
     *
     * @param fieldName
     *
     * @return OrderBuilder
     */
    public addAscending(fieldName: string): OrderBuilder {
        const currentOrderField = new OrderAscending(fieldName);
        this.orderList.push(currentOrderField);

        return this;
    }

    /**
     * Adds a descending order for given fieldName to list of orders
     *
     * @param fieldName
     *
     * @return OrderBuilder
     */
    public addDescending(fieldName: string): OrderBuilder {
        const currentOrderField = new OrderDescending(fieldName);
        this.orderList.push(currentOrderField);

        return this;
    }

    get orders() {
        return this.orderList;
    }
}
