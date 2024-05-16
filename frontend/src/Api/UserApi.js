import axios from "axios";

export const headers = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // "ngrok-skip-browser-warning": "69420",
    },
    "Access-Control-Allow-Origin": "*",
}
export const base_api = 'http://localhost:8081'
// export const base_api = 'https://blessed-absolute-dragon.ngrok-free.app'

class UserApi {
    PostImage(img) {

        const data = new FormData();
        data.append('file', img);
        data.append('upload_preset', 'xosulpvx');
        data.append('cloud_name', 'dxmczmcpn');
        data.append('folder', 'Home');
        return axios.post('https://api.cloudinary.com/v1_1/dxmczmcpn/image/upload', data);
    }


    Login(userName, password) {
        return axios.post(`${base_api}/api/auth/login`, {
            "account": userName,
            "password": password
        }, headers)
    }
    Register(userName, password, email, name) {
        return axios.post(`${base_api}/api/auth/register`, {
            "account": userName,
            "password": password,
            "email": email || "",
            "name": name || ""
        }, headers)
    }
    AuthProvider(id, name, email, avatar) {
        return axios.post(`${base_api}/api/auth/providerAuth`, {
            "id": id,
            "name": name,
            "email": email,
            "avatar": avatar,
            "hasProvider": true
        }, headers)
    }
    GetUserID() {
        return axios.get(`${base_api}/api/userId`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
    GetOldMessages() {
        return axios.get(`${base_api}/oldMessage`, headers)
    }

    GetNewProducts() {
        return axios.get(`${base_api}/api/product/TopNewest`, headers)
    }
}
export default new UserApi();   