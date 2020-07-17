/**
 * @module Intacct/SDK/Functions/Projects
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

import IaXmlWriter from "../../Xml/IaXmlWriter";
import AbstractProject from "./AbstractProject";

export default class ProjectCreate extends AbstractProject {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("create");
        xml.writeStartElement("PROJECT");

        // Project ID is not required if auto-numbering is configured in module
        xml.writeElement("PROJECTID", this.projectId);

        xml.writeElement("NAME", this.projectName, true);
        xml.writeElement("PROJECTCATEGORY", this.projectCategory, true);

        xml.writeElement("DESCRIPTION", this.description);
        xml.writeElement("PARENTID", this.parentProjectId);
        xml.writeElement("INVOICEWITHPARENT", this.invoiceWithParent);
        xml.writeElement("PROJECTTYPE", this.projectType);
        xml.writeElement("PROJECTSTATUS", this.projectStatus);
        xml.writeElement("CUSTOMERID", this.customerId);
        xml.writeElement("MANAGERID", this.projectManagerEmployeeId);
        xml.writeElement("CUSTUSERID", this.externalUserId);
        xml.writeElement("SALESCONTACTID", this.salesContactEmployeeId);
        xml.writeElement("DOCNUMBER", this.referenceNo);
        xml.writeElement("USERRESTRICTIONS", this.userRestrictions);

        if (this.transactionRules != null && this.transactionRules.length > 0) {
            for (const transactionRule of this.transactionRules) {
                xml.writeStartElement("PROJECT_RULES");
                xml.writeElement("RULENAME", transactionRule);
                xml.writeEndElement(); // PROJECT_RULES
            }
        }

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        if (this.primaryContactName != null) {
            xml.writeStartElement("CONTACTINFO");
            xml.writeElement("CONTACTNAME", this.primaryContactName);
            xml.writeEndElement(); // CONTACTINFO
        }
        if (this.billToContactName != null) {
            xml.writeStartElement("BILLTO");
            xml.writeElement("CONTACTNAME", this.billToContactName);
            xml.writeEndElement(); // BILLTO
        }
        if (this.shipToContactName != null) {
            xml.writeStartElement("SHIPTO");
            xml.writeElement("CONTACTNAME", this.shipToContactName);
            xml.writeEndElement(); // SHIPTO
        }

        xml.writeElement("TERMNAME", this.paymentTerms);
        xml.writeElement("BILLINGTYPE", this.billingType);
        xml.writeElementDate("BEGINDATE", this.beginDate, IaXmlWriter.intacctDateFormat);
        xml.writeElementDate("ENDDATE", this.endDate, IaXmlWriter.intacctDateFormat);
        xml.writeElement("DEPARTMENTID", this.departmentId);
        xml.writeElement("LOCATIONID", this.locationId);
        xml.writeElement("CLASSID", this.classId);
        xml.writeElement("SUPDOCID", this.attachmentsId);
        xml.writeElement("BILLABLEEXPDEFAULT", this.billableEmployeeExpense);
        xml.writeElement("BILLABLEAPPODEFAULT", this.billableApPurchasing);
        xml.writeElement("CURRENCY", this.currency);
        xml.writeElement("SONUMBER", this.salesOrderNo);
        xml.writeElement("PONUMBER", this.purchaseOrderNo);
        xml.writeElement("POAMOUNT", this.purchaseOrderAmount);
        xml.writeElement("PQNUMBER", this.purchaseQuoteNo);
        xml.writeElement("CONTRACTAMOUNT", this.contractAmount);
        xml.writeElement("BILLINGPRICING", this.laborPricingOption);
        xml.writeElement("BILLINGRATE", this.laborPricingDefaultRate);
        xml.writeElement("EXPENSEPRICING", this.expensePricingOption);
        xml.writeElement("EXPENSERATE", this.expensePricingDefaultRate);
        xml.writeElement("POAPPRICING", this.apPurchasingPricingOption);
        xml.writeElement("POAPRATE", this.apPurchasingPricingDefaultRate);
        xml.writeElement("BUDGETAMOUNT", this.budgetedBillingAmount);
        xml.writeElement("BUDGETEDCOST", this.budgetedCost);
        xml.writeElement("BUDGETQTY", this.budgetedDuration);
        xml.writeElement("BUDGETID", this.glBudgetId);
        xml.writeElement("INVOICEMESSAGE", this.invoiceMessage);
        xml.writeElement("INVOICECURRENCY", this.invoiceCurrency);

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // PROJECT
        xml.writeEndElement(); // create

        xml.writeEndElement(); // function
    }
}
