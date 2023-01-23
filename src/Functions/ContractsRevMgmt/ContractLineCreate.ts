/**
 * @module Intacct/SDK/Functions/ContractsRevMgmt
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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractContractLine from "./AbstractContractLine";

export default class ContractLineCreate extends AbstractContractLine {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create");
        xml.writeStartElement("CONTRACTDETAIL");

        xml.writeElement("CONTRACTID", this.contractId, true);
        xml.writeElement("ITEMID", this.itemId, true);

        xml.writeElementDate("BEGINDATE", this.beginDate, IaXmlWriter.intacctDateFormat);
        xml.writeElementDate("ENDDATE", this.endDate, IaXmlWriter.intacctDateFormat);

        xml.writeElement("ITEMDESC", this.itemDescription);
        xml.writeElement("RENEWAL", this.renewal);

        xml.writeElementDate("EXCH_RATE_DATE", this.exchangeRateDate, IaXmlWriter.intacctDateFormat);
        xml.writeElement("EXCHANGE_RATE", this.exchangeRateValue);

        xml.writeElement("BILLINGMETHOD", this.billingMethod, true);

        if (this.billingMethod === "Fixed price") {
            xml.writeElement("BILLINGOPTIONS", this.fixedPriceFrequency);

            xml.writeElement("QUANTITY", this.fixedPriceQuantity);
            xml.writeElement("PRICE", this.fixedPriceRate);
            xml.writeElement("MULTIPLIER", this.fixedPriceMultiplier);
            xml.writeElement("DISCOUNTPERCENT", this.fixedPriceDiscountPercent);

            if (this.fixedPriceFrequency === "Use billing template") {
                xml.writeElement("BILLINGTEMPLATE", this.billingTemplate);
                xml.writeElementDate("BILLINGSTARTDATE", this.billingStartDate, IaXmlWriter.intacctDateFormat);
                xml.writeElementDate("BILLINGENDDATE", this.billingEndDate, IaXmlWriter.intacctDateFormat);
            }
        }

        xml.writeElement("FLATAMOUNT", this.flatFixedAmount);

        xml.writeElement("REVENUETEMPLATENAME", this.revenue1Template);
        xml.writeElementDate("REVENUESTARTDATE", this.revenue1StartDate, IaXmlWriter.intacctDateFormat);
        xml.writeElementDate("REVENUEENDDATE", this.revenue1EndDate, IaXmlWriter.intacctDateFormat);

        xml.writeElement("REVENUE2TEMPLATENAME", this.revenue2Template);
        xml.writeElementDate("REVENUE2STARTDATE", this.revenue2StartDate);
        xml.writeElementDate("REVENUE2ENDDATE", this.revenue2EndDate);

        xml.writeElement("SHIPTOCONTACTNAME", this.shipToContactName);

        xml.writeElement("LOCATIONID", this.locationId);
        xml.writeElement("DEPARTMENTID", this.departmentId);
        xml.writeElement("PROJECTID", this.projectId);
        xml.writeElement("VENDORID", this.vendorId);
        xml.writeElement("EMPLOYEEID", this.employeeId);
        xml.writeElement("CLASSID", this.classId);
        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // CONTRACTDETAIL
        xml.writeEndElement(); // create

        xml.writeEndElement(); // function
    }
}
