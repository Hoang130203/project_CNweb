package com.example.backend.backend.payos;


import com.example.backend.backend.payos.type.PaymentData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.Map.Entry;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;


public class Utils {
    public Utils() {
    }

    private static String convertObjToQueryStr(JsonNode object) {
        StringBuilder stringBuilder = new StringBuilder();
        object.fields().forEachRemaining((entry) -> {
            String key = (String)entry.getKey();
            JsonNode value = (JsonNode)entry.getValue();
            String valueAsString;
            if (!value.isNull() && !Objects.equals(value.asText(), "null")) {
                if (value.isArray()) {
                    List<JsonNode> valueAsStringList = new ArrayList();
                    Iterator var6 = value.iterator();

                    while(var6.hasNext()) {
                        JsonNode item = (JsonNode)var6.next();
                        valueAsStringList.add(sortObjDataByKey(item));
                    }

                    valueAsString = String.valueOf(valueAsStringList);
                } else if (value.isTextual()) {
                    valueAsString = value.asText();
                } else {
                    valueAsString = value.toString();
                }
            } else {
                valueAsString = "";
            }

            if (!stringBuilder.toString().isEmpty()) {
                stringBuilder.append('&');
            }

            stringBuilder.append(key).append('=').append(valueAsString);
        });
        return stringBuilder.toString();
    }

    private static JsonNode sortObjDataByKey(JsonNode object) {
        if (!object.isObject()) {
            return object;
        } else {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode orderedObject = objectMapper.createObjectNode();
            Iterator<Map.Entry<String, JsonNode>> fieldsIterator = object.fields();
            TreeMap<String, JsonNode> sortedMap = new TreeMap<>();

            while (fieldsIterator.hasNext()) {
                Map.Entry<String, JsonNode> field = fieldsIterator.next();
                sortedMap.put(field.getKey(), field.getValue());
            }

            sortedMap.forEach(orderedObject::set);
            return orderedObject;
        }
    }

    private static String generateHmacSHA256(String dataStr, String key) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256Hmac.init(secretKey);
        byte[] hmacBytes = sha256Hmac.doFinal(dataStr.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexStringBuilder = new StringBuilder();
        byte[] var6 = hmacBytes;
        int var7 = hmacBytes.length;

        for(int var8 = 0; var8 < var7; ++var8) {
            byte b = var6[var8];
            hexStringBuilder.append(String.format("%02x", b));
        }

        return hexStringBuilder.toString();
    }

    public static String createSignatureFromObj(JsonNode data, String key) throws NoSuchAlgorithmException, InvalidKeyException {
        JsonNode sortedDataByKey = sortObjDataByKey(data);
        String dataQueryStr = convertObjToQueryStr(sortedDataByKey);
        return generateHmacSHA256(dataQueryStr, key);
    }

    public static String createSignatureOfPaymentRequest(PaymentData data, String key) throws NoSuchAlgorithmException, InvalidKeyException {
        int amount = data.getAmount();
        String cancelUrl = data.getCancelUrl();
        String description = data.getDescription();
        String orderCode = Integer.toString(data.getOrderCode());
        String returnUrl = data.getReturnUrl();
        String dataStr = "amount=" + amount + "&cancelUrl=" + cancelUrl + "&description=" + description + "&orderCode=" + orderCode + "&returnUrl=" + returnUrl;
        return generateHmacSHA256(dataStr, key);
    }
}
