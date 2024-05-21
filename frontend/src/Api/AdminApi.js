import { base_api } from "./UserApi";
import { headers } from "./UserApi";
import axios from "axios";

class AdminApi {

    GetOldMessages() {
        return axios.get(`${base_api}/oldMessageAdmin`, headers)
    }
    CreateProduct(product) {
        return axios.post(`${base_api}/api/admin/product`, product, headers)
    }
    GetAllSizes() {
        return axios.get(`${base_api}/api/admin/sizes`, headers)
    }
    GetAllProducts() {
        return axios.get(`${base_api}/api/admin/products`, headers)
    }
    PutBaseInfoProduct(product) {
        return axios.put(`${base_api}/api/admin/product`, product, headers)
    }
    PutQuantityProduct(productQuantities) {
        return axios.put(`${base_api}/api/admin/quantity`, productQuantities, headers)
    }
    PutImageProduct(productImages) {
        return axios.put(`${base_api}/api/admin/images`, productImages, headers)
    }
    GetUserDashboardBase() {
        return axios.get(`${base_api}/api/admin/userDashboardBase`, headers)
    }
    GetCurrentTransaction() {
        return axios.get(`${base_api}/api/admin/currentTransaction`, headers)
    }
    GetALlUsers() {
        return axios.get(`${base_api}/api/admin/users`, headers)
    }
    GetAllOrders() {
        return axios.get(`${base_api}/api/admin/orders`, headers)
    }
    PutOrderStatus(orderId, status) {
        return axios.put(`${base_api}/api/admin/order?id=${orderId}&status=${status}`, {}, headers)
    }
}
export default new AdminApi();