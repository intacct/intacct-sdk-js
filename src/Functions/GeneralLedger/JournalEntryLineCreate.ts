/**
 * @module Intacct/SDK/Functions/GeneralLedger
 */

/**
 * Copyright 2018 Sage Intacct, Inc.
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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractJournalEntryLine from "./AbstractJournalEntryLine";

export default class JournalEntryLineCreate extends AbstractJournalEntryLine {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("GLENTRY");

        xml.writeElement("DOCUMENT", this.documentNumber);
        xml.writeElement("ACCOUNTNO", this.glAccountNumber, true);
        if (this.transactionAmount < 0) {
            xml.writeElement("TR_TYPE", "-1"); // Credit
            xml.writeElement("TRX_AMOUNT", Math.abs(this.transactionAmount), true);
        } else {
            xml.writeElement("TR_TYPE", "1"); // Debit
            xml.writeElement("TRX_AMOUNT", this.transactionAmount, true);
        }

        xml.writeElement("CURRENCY", this.transactionCurrencyCode);

        if (this.exchangeRateDate != null) {
            xml.writeElementDate("EXCH_RATE_DATE", this.exchangeRateDate, IaXmlWriter.intacctDateFormat);
        }
        if (this.exchangeRateType != null) {
            xml.writeElement("EXCH_RATE_TYPE_ID", this.exchangeRateType);
        } else if (this.exchangeRateValue != null) {
            xml.writeElement("EXCHANGE_RATE", this.exchangeRateValue);
        } else if (this.transactionCurrencyCode != null) {
            xml.writeElement("EXCH_RATE_TYPE_ID", this.exchangeRateType, true);
        }

        if (this.allocationId != null) {
            xml.writeElement("ALLOCATION", this.allocationId);

            if (this.allocationId === JournalEntryLineCreate.CUSTOM_ALLOCATION_ID) {
                for (const split of this.customAllocationSplits) {
                    split.writeXml(xml);
                }
            }
        } else {
            xml.writeElement("LOCATION", this.locationId);
            xml.writeElement("DEPARTMENT", this.departmentId);
            xml.writeElement("PROJECTID", this.projectId);
            xml.writeElement("CUSTOMERID", this.customerId);
            xml.writeElement("VENDORID", this.vendorId);
            xml.writeElement("EMPLOYEEID", this.employeeId);
            xml.writeElement("ITEMID", this.itemId);
            xml.writeElement("CLASSID", this.classId);
            xml.writeElement("CONTRACTID", this.contractId);
            xml.writeElement("WAREHOUSEID", this.warehouseId);
        }

        xml.writeElement("DESCRIPTION", this.memo);

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // GLENTRY
    }
}
