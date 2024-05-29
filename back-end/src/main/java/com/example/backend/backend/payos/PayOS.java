package com.example.backend.backend.payos;

import com.example.backend.backend.payos.type.PaymentData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.util.Objects;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.HttpEntity;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.io.entity.StringEntity;

public class PayOS {
    private final String clientId;
    private final String apiKey;
    private final String checksumKey;
    private static final String PAYOS_BASE_URL = "https://api-merchant.payos.vn";

    public PayOS(String clientId, String apiKey, String checksumKey) {
        this.clientId = clientId;
        this.apiKey = apiKey;
        this.checksumKey = checksumKey;
    }

    public JsonNode createPaymentLink(PaymentData paymentData) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String url = "https://api-merchant.payos.vn/v2/payment-requests";
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        paymentData.setSignature(Utils.createSignatureOfPaymentRequest(paymentData, this.checksumKey));
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");
        httpPost.setHeader("Charset", "UTF-8");
        httpPost.setHeader("x-client-id", this.clientId);
        httpPost.setHeader("x-api-key", this.apiKey);
        String paymentDataJson = objectMapper.writeValueAsString(paymentData);
        httpPost.setEntity(new StringEntity(paymentDataJson, StandardCharsets.UTF_8));
        CloseableHttpResponse response = client.execute(httpPost);
        HttpEntity entity = response.getEntity();
        if (entity == null) {
            response.close();
            client.close();
            throw new Exception("Call api failed!");
        } else {
            String responseData = EntityUtils.toString(entity);
            response.close();
            client.close();
            JsonNode res = objectMapper.readTree(responseData);
            if (!Objects.equals(res.get("code").asText(), "00")) {
                throw new PayOSError(res.get("code").asText(), res.get("desc").asText());
            } else {
                String paymentLinkResSignature = Utils.createSignatureFromObj(res.get("data"), this.checksumKey);
                if (!paymentLinkResSignature.equals(res.get("signature").asText())) {
                    throw new Exception((String) Constants.ERROR_MESSAGE.get("DATA_NOT_INTEGRITY"));
                } else {
                    return res.get("data");
                }
            }
        }
    }

    public JsonNode getPaymentLinkInfomation(int orderId) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String url = "https://api-merchant.payos.vn/v2/payment-requests/" + orderId;
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeader("Accept", "application/json");
        httpGet.setHeader("Content-type", "application/json");
        httpGet.setHeader("Charset", "UTF-8");
        httpGet.setHeader("x-client-id", this.clientId);
        httpGet.setHeader("x-api-key", this.apiKey);
        CloseableHttpResponse response = client.execute(httpGet);
        HttpEntity entity = response.getEntity();
        if (entity == null) {
            response.close();
            client.close();
            throw new Exception("Call api failed!");
        } else {
            String responseData = EntityUtils.toString(entity);
            response.close();
            client.close();
            JsonNode res = objectMapper.readTree(responseData);
            if (!Objects.equals(res.get("code").asText(), "00")) {
                throw new PayOSError(res.get("code").asText(), res.get("desc").asText());
            } else {
                String paymentLinkResSignature = Utils.createSignatureFromObj(res.get("data"), this.checksumKey);
                if (!paymentLinkResSignature.equals(res.get("signature").asText())) {
                    throw new Exception((String) Constants.ERROR_MESSAGE.get("DATA_NOT_INTEGRITY"));
                } else {
                    return res.get("data");
                }
            }
        }
    }

    public String confirmWebhook(String webhookUrl) throws Exception {
        if (webhookUrl != null && !webhookUrl.isEmpty()) {
            new ObjectMapper();
            String url = "https://api-merchant.payos.vn/confirm-webhook";
            CloseableHttpClient client = HttpClients.createDefault();
            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");
            httpPost.setHeader("Charset", "UTF-8");
            httpPost.setHeader("x-client-id", this.clientId);
            httpPost.setHeader("x-api-key", this.apiKey);
            httpPost.setEntity(new StringEntity("{\"webhookUrl\":\"" + webhookUrl + "\"}", StandardCharsets.UTF_8));
            CloseableHttpResponse response = client.execute(httpPost);
            int statusCode = response.getCode();
            response.close();
            client.close();
            if (statusCode == 200) {
                return webhookUrl;
            } else if (statusCode == 404) {
                throw new PayOSError((String) Constants.ERROR_CODE.get("INTERNAL_SERVER_ERROR"), (String)Constants.ERROR_MESSAGE.get("INTERNAL_SERVER_ERROR"));
            } else if (statusCode == 401) {
                throw new PayOSError((String) Constants.ERROR_CODE.get("UNAUTHORIZED"), (String) Constants.ERROR_MESSAGE.get("UNAUTHORIZED"));
            } else {
                throw new PayOSError((String) Constants.ERROR_CODE.get("INTERNAL_SERVER_ERROR"), (String)Constants.ERROR_MESSAGE.get("INTERNAL_SERVER_ERROR"));
            }
        } else {
            throw new Exception((String) Constants.ERROR_MESSAGE.get("INVALID_PARAMETER"));
        }
    }

    public JsonNode cancelPaymentLink(int orderId, String cancellationReason) throws Exception {
        String url = "https://api-merchant.payos.vn/v2/payment-requests/" + orderId + "/cancel";
        ObjectMapper objectMapper = new ObjectMapper();
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");
        httpPost.setHeader("Charset", "UTF-8");
        httpPost.setHeader("x-client-id", this.clientId);
        httpPost.setHeader("x-api-key", this.apiKey);
        httpPost.setEntity(new StringEntity("{\"cancellationReason\":\"" + cancellationReason + "\"}", StandardCharsets.UTF_8));
        CloseableHttpResponse response = client.execute(httpPost);
        int statusCode = response.getCode();
        if (statusCode != 200) {
            throw new PayOSError((String) Constants.ERROR_CODE.get("INTERNAL_SERVER_ERROR"), (String) Constants.ERROR_MESSAGE.get("INTERNAL_SERVER_ERROR"));
        } else {
            HttpEntity entity = response.getEntity();
            if (entity == null) {
                response.close();
                client.close();
                throw new Exception("Call api failed!");
            } else {
                String responseData = EntityUtils.toString(entity);
                response.close();
                client.close();
                JsonNode res = objectMapper.readTree(responseData);
                if (!Objects.equals(res.get("code").asText(), "00")) {
                    throw new PayOSError(res.get("code").asText(), res.get("desc").asText());
                } else {
                    String paymentLinkInfoResSignature = Utils.createSignatureFromObj(res.get("data"), this.checksumKey);
                    if (!paymentLinkInfoResSignature.equals(res.get("signature").asText())) {
                        throw new Exception((String) Constants.ERROR_MESSAGE.get("DATA_NOT_INTEGRITY"));
                    } else {
                        return res.get("data");
                    }
                }
            }
        }
    }

    public JsonNode verifyPaymentWebhookData(JsonNode webhookBody) throws Exception {
        JsonNode data = webhookBody.get("data");
        String signature = webhookBody.get("signature").asText();
        if (data.isNull()) {
            throw new Exception((String) Constants.ERROR_MESSAGE.get("NO_DATA"));
        } else if (signature.isEmpty()) {
            throw new Exception((String) Constants.ERROR_MESSAGE.get("NO_SIGNATURE"));
        } else {
            String signData = Utils.createSignatureFromObj(data, this.checksumKey);
            if (!signData.equals(signature)) {
                throw new Exception((String) Constants.ERROR_MESSAGE.get("DATA_NOT_INTEGRITY"));
            } else {
                return data;
            }
        }
    }
}
