package com.ccma.comscore;

import com.comscore.streaming.AdvertisementType;
import com.comscore.streaming.ContentType;

public class TypeParser {

    public static int parseContent(String contentTypeString) {
        if (contentTypeString == null || contentTypeString.isEmpty()) {
            return ContentType.OTHER; // O manejar un valor por defecto
        }

        switch (contentTypeString.toLowerCase()) {
            case "premium_short_form_ondemanda":
                return ContentType.SHORT_FORM_ON_DEMAND;
            case "premium_long_form_ondemand":
                return ContentType.LONG_FORM_ON_DEMAND;
            case "live":
                return ContentType.LIVE;
            case "user_generated_short_form_ondemand":
                return ContentType.USER_GENERATED_SHORT_FORM_ON_DEMAND;
            case "user_generated_long_form_ondemand":
                return ContentType.USER_GENERATED_LONG_FORM_ON_DEMAND;
            case "user_generated_live":
                return ContentType.USER_GENERATED_LIVE;
            case "bumper":
                return ContentType.BUMPER;
            default:
                return ContentType.OTHER;
        }
    }
    public static int parseAdvertisement(String advertisementTypeString) {
        if (advertisementTypeString == null || advertisementTypeString.isEmpty()) {
            return AdvertisementType.OTHER; // O manejar un valor por defecto
        }

        switch (advertisementTypeString.toUpperCase()) {
            case "ON_DEMAND_PRE_ROLL":
                return AdvertisementType.ON_DEMAND_PRE_ROLL;
            case "ON_DEMAND_MID_ROLL":
                return AdvertisementType.ON_DEMAND_MID_ROLL;
            case "ON_DEMAND_POST_ROLL":
                return AdvertisementType.ON_DEMAND_POST_ROLL;
            case "LIVE":
                return AdvertisementType.LIVE;
            case "BRANDED_ON_DEMAND_PRE_ROLL":
                return AdvertisementType.BRANDED_ON_DEMAND_PRE_ROLL;
            case "BRANDED_ON_DEMAND_MID_ROLL":
                return AdvertisementType.BRANDED_ON_DEMAND_MID_ROLL;
            case "BRANDED_ON_DEMAND_POST_ROLL":
                return AdvertisementType.BRANDED_ON_DEMAND_POST_ROLL;
            case "BRANDED_AS_CONTENT":
                return AdvertisementType.BRANDED_AS_CONTENT;
            case "BRANDED_DURING_LIVE":
                return AdvertisementType.BRANDED_DURING_LIVE;
            default:
                return AdvertisementType.OTHER;
        }
    }

}

