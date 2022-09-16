/**
 * @module Intacct/SDK/Logging
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

    public formatRequest(options, error: Error = null): string {
        const regex = new RegExp(/{\s*([A-Za-z_\-\.0-9]+)\s*}/, "g");
        let message = "";
        message = this.template.replace(regex, (match) => {
            let result = "{request}" + os.EOL;
            result = result + options.method + " "
                + options.url + " "
                + os.EOL;
            for (const key in options.headers) {
                if (options.headers.hasOwnProperty(key)) {
                    result = result + os.EOL + " {" + key + "}: " + options.headers[key];
                }
            }
            result = result + os.EOL + os.EOL + options.body;
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

    public formatResponse(response, body, error: Error = null): string {
        const regex = new RegExp(/{\s*([A-Za-z_\-\.0-9]+)\s*}/, "g");
        let message = "";
        message = this.template.replace(regex, (match) => {
            let result = "{response}" + os.EOL;
            if (response != null) {
                result =  result + "HTTP/1.1 " +
                    + response.status + " " + response.statusText;
                for (const key in response.headers) {
                    if (response.headers.hasOwnProperty(key)) {
                        result = result + os.EOL + " {" + key + "}: " + response.headers.get(key);
                    }
                }
                result = result + os.EOL + os.EOL + body;
            } else {
                result = "";
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
