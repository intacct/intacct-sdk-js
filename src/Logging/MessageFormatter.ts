/**
 * @module Intacct/SDK/Logging
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
import * as dateFormat from "dateformat";
import * as os from "os";

export default class MessageFormatter {

    public static readonly clf: string = `{hostname} {req_header_User-Agent} - [{date_common_log}] `
        + `"{method} {target} HTTP/{version}" {code} {res_header_Content-Length}`;

    public static readonly debug: string = ">>>>>>>>" + os.EOL
        + "{request}" + os.EOL + "<<<<<<<<" + os.EOL
        + "{response}" + os.EOL + "--------" + os.EOL
        + "{error}";

    public static readonly short: string = `[{ts}] "{method} {target} HTTP/{version}" {code}`;

    public static maskSensitiveData(msg, meta) {
        const redacted = "$1REDACTED$3";
        const replacements = [
            "password",
            "accountnumber",
            "cardnum",
            "ssn",
            "achaccountnumber",
            "wireaccountnumber",
            "taxid",
            "sessionid",
        ];
        for (const replacement of replacements) {
            const regex = new RegExp("(<" + replacement + "[^>]*>)(.*?)(<\/" + replacement + ">)", "gi");

            msg = msg.replace(regex, redacted);

            if (meta.request != null && meta.request.body != null) {
                meta.request.body = meta.request.body.replace(regex, redacted);
            }
            if (meta.response != null && meta.response.body != null) {
                meta.response.body = meta.response.body.replace(regex, redacted);
            }
        }
        return {
            msg,
            meta,
        };
    }

    private static headers(headers) {
        let result = "";
        for (const key in headers) {
            if (headers.hasOwnProperty(key)) {
                result = result + key + ": " + headers[key] + os.EOL;
            }
        }
        return result.trim();
    }

    private template: string;

    constructor(formatTemplate: string = MessageFormatter.debug) {
        if (formatTemplate == null) {
            formatTemplate = MessageFormatter.clf;
        }
        this.template = formatTemplate;
    }

    public format(response, error: Error = null): string {
        const regex = new RegExp(/{\s*([A-Za-z_\-\.0-9]+)\s*}/, "g");
        let message = "";
        message = this.template.replace(regex, (match) => {
            let result = "";
            switch (match) {
                case "{request}":
                    if (response != null) {
                        result = response.request.method + " "
                            + response.request.uri.path
                            + (response.request.uri.query != null ? "?" + response.request.uri.query : "")
                            + " HTTP/" + (response.request.httpVersion != null ? response.request.httpVersion : "1.1")
                            + os.EOL + "Host:" + response.request.host;
                        for (const key in response.request.headers) {
                            if (response.request.headers.hasOwnProperty(key)) {
                                result = result + os.EOL + " {" + key + "}: " + response.request.headers[key];
                            }
                        }
                        result = result + os.EOL + os.EOL + response.request.body;
                    } else {
                        result = "";
                    }
                    break;
                case "{response}":
                    if (response != null) {
                        result = " HTTP/" + response.httpVersion
                            + " " + response.statusCode + " " + response.statusMessage;
                        for (const key in response.headers) {
                            if (response.headers.hasOwnProperty(key)) {
                                result = result + os.EOL + " {" + key + "}: " + response.headers[key];
                            }
                        }
                        result = result + os.EOL + os.EOL + response.body;
                    } else {
                        result = "";
                    }
                    break;
                case "{req_headers}":
                    result = response.request.method + " "
                        + response.request.uri.path
                        + (response.request.uri.query != null ? "?" + response.request.uri.query : "")
                        + " HTTP/" + (response.request.httpVersion != null ? response.request.httpVersion : "1.1")
                        + MessageFormatter.headers(response.request.headers);
                    break;
                case "{res_headers}":
                    if (response != null) {
                        result = " HTTP/" + response.httpVersion
                            + " " + response.statusCode + " " + response.statusMessage
                            + os.EOL + MessageFormatter.headers(response.headers);
                    } else {
                        result = "NULL";
                    }
                    break;
                case "{req_header_User-Agent}":
                    result = response.request.headers["User-Agent"];
                    break;
                case "{res_header_Content-Length":
                    result = response.headers["Content-Length"];
                    break;
                case "{req_body}":
                    result = response.request.body;
                    break;
                case "{res_body}":
                    result = response.body;
                    break;
                case "{ts}":
                case "{date_iso_8601}":
                    result = new Date().toISOString();
                    break;
                case "{date_common_log}":
                    result = dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss o");
                    break;
                case "{method}":
                    result = response.request.method;
                    break;
                case "{version}":
                    result = (response.request.httpVersion != null ? response.request.httpVersion : "1.1");
                    break;
                case "{uri}":
                    result = response.request.uri.path
                        + (response.request.uri.query != null ? "?" + response.request.uri.query : "");
                    break;
                case "{url}":
                    result = response.request.uri.href;
                    break;
                case "{target}":
                    result = response.request.uri.path
                        + (response.request.uri.query != null ? "?" + response.request.uri.query : "");
                    break;
                case "{req_version}":
                    result = (response.request.httpVersion != null ? response.request.httpVersion : "1.1");
                    break;
                case "{res_version}":
                    result = response.httpVersion;
                    break;
                case "{host}":
                    result = process.env.host;
                    break;
                case "{code}":
                    result = (response.statusCode != null ? response.statusCode : "NULL");
                    break;
                case "{phrase}":
                    result = (response.statusMessage != null ? response.statusMessage : "NULL");
                    break;
                case "{error}":
                    result = (error != null ? error.message : "NULL");
                    break;
                default:
                    // Nothing to see here
                    break;
            }
            return result;
        });

        const redacted = "$1REDACTED$3";
        const replacements = [
            "password",
            "accountnumber",
            "cardnum",
            "ssn",
            "achaccountnumber",
            "wireaccountnumber",
            "taxid",
            "sessionid",
        ];
        for (const replacement of replacements) {
            message = message.replace(
                new RegExp("(<" + replacement + "[^>]*>)(.*?)(<\/" + replacement + ">)", "gi"),
                redacted,
            );
        }

        return message;
    }
}
