/**
 * @module Intacct/SDK/Credentials
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

import * as url from "url";
import ClientConfig from "../ClientConfig";

export default class Endpoint {

    public static readonly DEFAULT_ENDPOINT = "https://api.intacct.com/ia/xml/xmlgw.phtml";

    public static readonly ENDPOINT_URL_ENV_NAME = "INTACCT_ENDPOINT_URL";

    public static readonly DOMAIN_NAME = "intacct.com";

    private _url: string;
    get url(): string {
        return this._url;
    }
    set url(address: string) {
        if (address == null || address === "") {
            address = Endpoint.DEFAULT_ENDPOINT;
        }

        const test = url.parse(address);
        const check = "." + Endpoint.DOMAIN_NAME;
        if (test.hostname.substr(-check.length) !== check) {
            throw new Error("Endpoint URL is not a valid " + Endpoint.DOMAIN_NAME + " domain name.");
        }
        this._url = address;
    }

    constructor(config: ClientConfig) {
        if (config.endpointUrl == null) {
            this.url = process.env[Endpoint.ENDPOINT_URL_ENV_NAME];
        } else {
            this.url = config.endpointUrl;
        }
    }
}
