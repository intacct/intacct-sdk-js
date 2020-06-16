/**
 * @module Intacct/SDK/Functions/Common/NewQuery
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

import IXmlObject from "../../../Xml/IXmlObject";
import {IOrder} from "./QueryOrderBy";
import ISelect from "./QuerySelect/ISelect";

export default interface IQueryFunction extends IXmlObject {

    /**
     * @type {ISelect[]}
     */
    selectFields: ISelect[];

    /**
     * @type {string}
     */
    fromObject: string;

    /**
     * @type {string}
     */
    docParId: string;

    /**
     * @type {IOrder[]}
     */
    orderBy: IOrder[];

    /**
     * @type {boolean}
     */
    caseInsensitive: boolean;

    /**
     * @type {number}
     */
    pageSize: number;

    /**
     * @type {number}
     */
    offset: number;

    /**
     *
     * @param selectFields
     *
     * @return IQueryFunction
     */
    setSelectFields(selectFields: ISelect[]): IQueryFunction;

    /**
     *
     * @param fromObject
     *
     * @return IQueryFunction
     */
    setFromObject(fromObject: string): IQueryFunction;

    /**
     *
     * @param docParId
     *
     * @return IQueryFunction
     */
    setDocParId(docParId: string): IQueryFunction;

    /**
     *
     * @param orderBy
     *
     * @return IQueryFunction
     */
    setOrderBy(orderBy: IOrder[]): IQueryFunction;

    /**
     *
     * @param caseInsensitive
     *
     * @return IQueryFunction
     */
    setCaseInsensitive(caseInsensitive: boolean): IQueryFunction;

    /**
     *
     * @param pageSize
     *
     * @return IQueryFunction
     */
    setPageSize(pageSize: number): IQueryFunction;

    /**
     *
     * @param offset
     *
     * @return IQueryFunction
     */
    setOffset(offset: number): IQueryFunction;
}
