package com.example.backend.backend.payos;

import java.util.HashMap;
import java.util.Map;

public class Constants {
    public static final Map<String, String> ERROR_MESSAGE = new HashMap();
    public static final Map<String, String> ERROR_CODE = new HashMap();
    public static final String PAYOS_BASE_URL = "https://api-merchant.payos.vn";

    public Constants() {
    }

    static {
        ERROR_MESSAGE.put("NO_SIGNATURE", "No signature.");
        ERROR_MESSAGE.put("NO_DATA", "No data.");
        ERROR_MESSAGE.put("INVALID_SIGNATURE", "Invalid signature.");
        ERROR_MESSAGE.put("DATA_NOT_INTEGRITY", "The data is unreliable because the signature of the response does not match the signature of the data");
        ERROR_MESSAGE.put("WEBHOOK_URL_INVALID", "Webhook URL invalid.");
        ERROR_MESSAGE.put("UNAUTHORIZED", "Unauthorized.");
        ERROR_MESSAGE.put("INTERNAL_SERVER_ERROR", "Internal Server Error.");
        ERROR_MESSAGE.put("INVALID_PARAMETER", "Invalid Parameter.");
        ERROR_CODE.put("INTERNAL_SERVER_ERROR", "20");
        ERROR_CODE.put("UNAUTHORIZED", "401");
    }
}
