/**
 * @module Intacct/SDK/Credentials
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

import * as url from "url";
import ClientConfig from "../ClientConfig";

export default class Endpoint {

    public static readonly DEFAULT_ENDPOINT = "https://api.intacct.com/ia/xml/xmlgw.phtml";

    public static readonly ENDPOINT_URL_ENV_NAME = "INTACCT_ENDPOINT_URL";

    public static readonly ALLOW_NON_INTACCT_ENDPOINT_URL_ENV_NAME = "INTACCT_ALLOW_NON_INTACCT_ENDPOINT_URL";

    public static readonly DOMAIN_NAME = "intacct.com";

    public static readonly FULL_QUALIFIED_DOMAIN_NAME = Endpoint.DOMAIN_NAME + ".";

    private static isDomainValid(hostname: string): boolean {
        const checkMainDomain = "." + Endpoint.DOMAIN_NAME;
        const checkFQDNDomain = "." + Endpoint.FULL_QUALIFIED_DOMAIN_NAME;
        return (hostname.substr(-checkMainDomain.length) === checkMainDomain) ||
            (hostname.substr(-checkFQDNDomain.length) === checkFQDNDomain);
    }

    private allowNonIntacctEndpointUrl: boolean;

    private _url: string;
    get url(): string {
        return this._url;
    }
    set url(address: string) {
        if (address == null || address === "") {
            address = Endpoint.DEFAULT_ENDPOINT;
        }

        this.verifyEndpointUrl(address);
        this._url = address;
    }

    constructor(config: ClientConfig) {
        if (config.allowNonIntacctEndpointUrl == null) {
            this.allowNonIntacctEndpointUrl = process.env[Endpoint.ALLOW_NON_INTACCT_ENDPOINT_URL_ENV_NAME] === "true";
        } else {
            this.allowNonIntacctEndpointUrl = config.allowNonIntacctEndpointUrl;
        }
        if (config.endpointUrl == null) {
            this.url = process.env[Endpoint.ENDPOINT_URL_ENV_NAME];
        } else {
            this.url = config.endpointUrl;
        }
    }

    private verifyEndpointUrl(address: string): void | never {
        const parsedUrl = url.parse(address);
        if (!Endpoint.isDomainValid(parsedUrl.hostname) && !this.allowNonIntacctEndpointUrl) {
            throw new Error("Endpoint URL is not a valid " + Endpoint.DOMAIN_NAME + " domain name.");
        }
    }
}
