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
}
export default new AdminApi();