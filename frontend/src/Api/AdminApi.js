import { base_api } from "./UserApi";
import { headers } from "./UserApi";
import axios from "axios";

class AdminApi {

    GetOldMessages() {
        return axios.get(`${base_api}/oldMessageAdmin`, headers)
    }
}
export default new AdminApi();