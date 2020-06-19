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
import IFilter from "./QueryFilter/IFilter";
import IOrder from "./QueryOrderBy/IOrder";
import ISelect from "./QuerySelect/ISelect";

export default interface IQueryFunction extends IXmlObject {

    selectFields: ISelect[];

    fromObject: string;

    docParId: string;

    filter: IFilter;

    orderBy: IOrder[];

    caseInsensitive: boolean;

    pageSize: number;

    offset: number;

    addSelectFields(selectFields: ISelect[]): IQueryFunction;

    addFromObject(fromObject: string): IQueryFunction;

    addDocParId(docParId: string): IQueryFunction;

    addFilter(filter: IFilter): IQueryFunction;

    addOrderBy(orderBy: IOrder[]): IQueryFunction;

    addCaseInsensitive(caseInsensitive: boolean): IQueryFunction;

    addPageSize(pageSize: number): IQueryFunction;

    addOffset(offset: number): IQueryFunction;
}
