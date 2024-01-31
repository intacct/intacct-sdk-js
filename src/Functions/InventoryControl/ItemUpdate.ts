/**
 * @module Intacct/SDK/Functions/InventoryControl
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
import AbstractItem from "./AbstractItem";

export default class ItemUpdate extends AbstractItem {

    public writeXml(xml: IaXmlWriter): void {
        xml.writeStartElement("function");
        xml.writeAttribute("controlid", this.controlId, true);

        xml.writeStartElement("update");
        xml.writeStartElement("ITEM");

        xml.writeElement("ITEMID", this.itemId, true);

        xml.writeElement("NAME", this.itemName);

        if (this.active === true) {
            xml.writeElement("STATUS", "active");
        } else if (this.active === false) {
            xml.writeElement("STATUS", "inactive");
        }

        xml.writeElement("PRODUCTLINEID", this.produceLineId);
        xml.writeElement("COST_METHOD", this.costMethod);
        xml.writeElement("EXTENDED_DESCRIPTION", this.extendedDescription);
        xml.writeElement("PODESCRIPTION", this.purchasingDescription);
        xml.writeElement("SODESCRIPTION", this.salesDescription);
        xml.writeElement("UOMGRP", this.unitOfMeasure);
        xml.writeElement("NOTE", this.note);
        xml.writeElement("SHIP_WEIGHT", this.shippingWeight);
        xml.writeElement("GLGROUP", this.itemGlGroupName);
        xml.writeElement("STANDARD_COST", this.standardCost);
        xml.writeElement("BASEPRICE", this.basePrice);
        xml.writeElement("TAXABLE", this.taxable);
        xml.writeElement("TAXGROUP", this.itemTaxGroupName);
        xml.writeElement("DEFAULTREVRECTEMPLKEY", this.defaultRevRecTemplateId);
        xml.writeElement("INCOMEACCTKEY", this.revenueGlAccountNo);
        xml.writeElement("INVACCTKEY", this.inventoryGlAccountNo);
        xml.writeElement("EXPENSEACCTKEY", this.expenseGlAccountNo);
        xml.writeElement("COGSACCTKEY", this.cogsGlAccountNo);
        xml.writeElement("OFFSETOEGLACCOUNTKEY", this.arGlAccountNo);
        xml.writeElement("OFFSETPOGLACCOUNTKEY", this.apGlAccountNo);
        xml.writeElement("DEFERREDREVACCTKEY", this.deferredRevGlAccountNo);
        xml.writeElement("VSOECATEGORY", this.vsoeCategory);
        xml.writeElement("VSOEDLVRSTATUS", this.vsoeDefaultDeliveryStatus);
        xml.writeElement("VSOEREVDEFSTATUS", this.vsoeDefaultDeferralStatus);
        xml.writeElement("REVPOSTING", this.kitRevenuePosting);
        xml.writeElement("REVPRINTING", this.kitPrintFormat);
        xml.writeElement("SUBSTITUTEID", this.substituteItemId);
        xml.writeElement("ENABLE_SERIALNO", this.serialTrackingEnabled);
        xml.writeElement("SERIAL_MASKKEY", this.serialNumberMask);
        xml.writeElement("ENABLE_LOT_CATEGORY", this.lotTrackingEnabled);
        xml.writeElement("LOT_CATEGORYKEY", this.lotCategory);
        xml.writeElement("ENABLE_BINS", this.binTrackingEnabled);
        xml.writeElement("ENABLE_EXPIRATION", this.expTrackingEnabled);
        xml.writeElement("UPC", this.upc);
        xml.writeElement("INV_PRECISION", this.unitCostPrecisionInventory);
        xml.writeElement("SO_PRECISION", this.unitCostPrecisionSales);
        xml.writeElement("PO_PRECISION", this.unitCostPrecisionPurchasing);
        xml.writeElement("HASSTARTENDDATES", this.itemStartEndDateEnabled);
        xml.writeElement("TERMPERIOD", this.periodsMeasuredIn);
        xml.writeElement("TOTALPERIODS", this.numberOfPeriods);
        xml.writeElement("COMPUTEFORSHORTTERM", this.proratePriceAllowed);
        xml.writeElement("RENEWALMACROID", this.defaultRenewalMacroId);

        if (this.warehouseId != null) {
            xml.writeStartElement("WAREHOUSEINFO");
            xml.writeStartElement("ITEMWAREHOUSEINFO");
            xml.writeElement("WAREHOUSEID", this.warehouseId);
            xml.writeEndElement(); // ITEMWAREHOUSEINFO
            xml.writeEndElement(); // WAREHOUSEINFO
        }

        xml.writeCustomFieldsImplicit(this.customFields);

        xml.writeEndElement(); // ITEM
        xml.writeEndElement(); // update

        xml.writeEndElement(); // function
    }
}
