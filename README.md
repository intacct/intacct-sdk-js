# Sage Intacct SDK for JavaScript

[![npm version](https://badge.fury.io/js/%40intacct%2Fintacct-sdk.svg)](https://badge.fury.io/js/%40intacct%2Fintacct-sdk)
[![License](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://www.npmjs.com/package/@sage-intact/intacct-sdk)

## Xometry Repository Info

This repository is a fork of intacct/intacct-sdk-js to add missing fields and change the way a couple cases are handled, in order to fix errors we encountered while using the upstream version of this SDK.

The application in this repository is currently **deployed** as a package dependency of [accounting-automation-service](https://github.com/xometry/accounting-automation-service).

Ensure PRs are set to merge to the `main` branch not the original Intacct `master` branch.
To trigger deployment of any changes on merge make sure you add `feat:` to the beginning of the PR merge commit title.

![example merge deploy](<Screenshot 2025-01-28 at 10.59.43 AM.png>)

## Testing
For testing changes to package locally use [yarn link](https://yarnpkg.com/cli/link).

🚨 **SOX:** This repository is under SOX control, please see [Xometry SOX Change Control Guidelines](https://xometry.atlassian.net/wiki/spaces/ACCTT/pages/6183256540/Xometry+SOX+Change+Control+Guidelines)

## Contact Information

* xometry/intacct-sdk-js is maintained by the Revenue and Payments Squad (OFD).
* accountingenablement@xometry.com
* If you are an on-call developer and need to route an alert about this service, in OpsGenie please route alerts to the "Financial Services and Supplies Domains" team.
* If you have questions, the primary slack channel for discussion is [#order-fulfillment-engineering](https://xometry.slack.com/archives/C01V0FCEXBR), and you can tag @revenue-and-payments-tech

## Resources

* [SDK Guides][sdk-homepage] - Getting started with the SDK
* [SDK Reference][sdk-reference] - Code-level reference for the SDK
* [Issues][sdk-issues] - Report issues with the SDK or submit pull requests
* [License][sdk-license] - Apache 2.0 license
* [Sage Intacct Developer][ia-developer] - Sage Intacct's Developer site
* [Sage Intacct][intacct] - Sage Intacct's home page

## System Requirements

* You must have an active Sage Intacct Web Services Developer license
* Node.js >= 14.20.0. The SDK is written in TypeScript and targets ES2015.

[intacct]: http://www.intacct.com
[ia-developer]: https://developer.intacct.com/
[sdk-homepage]: https://developer.intacct.com/tools/sdk-node-js/
[sdk-reference]: https://intacct.github.io/intacct-sdk-js/
[sdk-issues]: https://github.com/Intacct/intacct-sdk-js/issues
[sdk-license]: http://www.apache.org/licenses/LICENSE-2.0
[npm]: https://www.npmjs.com/package/@sage-intact/intacct-sdk
