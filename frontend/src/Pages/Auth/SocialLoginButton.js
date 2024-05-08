import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import UserApi from "../../Api/UserApi";

function SocialButton() {
    const navigate = useNavigate();
    const ResolveFacebook = (res) => {
        console.log(res.data);
        localStorage.setItem('w15store_avatar', res.data.picture?.data?.url)
        UserApi.AuthProvider(res?.data.id, res?.data.name, res?.data?.email || '', res?.data.picture?.data?.url)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    toast.success('Đăng nhập thành công, xin chào ' + res.data.name)
                    localStorage.setItem("w15store_user", JSON.stringify(res.data));
                    localStorage.setItem("w15store_avatar", res.data?.avatar);
                    let isAdmin = false;
                    localStorage.setItem("w15store_admin", 'false');

                    for (let i = 0; i < res.data?.roles?.length; i++) {
                        if (res.data.roles[i].role.name == "ROLE_ADMIN") {
                            localStorage.setItem("w15store_admin", "true");
                            isAdmin = true;
                            break;
                        }
                    }
                    setTimeout(() => {
                        if (isAdmin)
                            window.location.href = "/admin/dashboard";
                        else
                            window.location.href = "/";
                    }, 1000);
                }
                else
                    toast.error('Đăng nhập thất bại')
            })
    }
    const ResolveGoogle = (res) => {
        console.log(res);
        localStorage.setItem('w15store_avatar', res.data.picture)
        UserApi.AuthProvider(res?.data.sub, res?.data.name, res?.data?.email || '', res?.data.picture)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    toast.success('Đăng nhập thành công, xin chào ' + res.data.name)
                    localStorage.setItem("w15store_user", JSON.stringify(res.data));
                    localStorage.setItem("w15store_avatar", res.data?.avatar);
                    let isAdmin = false;
                    localStorage.setItem("w15store_admin", 'false');

                    for (let i = 0; i < res.data?.roles?.length; i++) {
                        if (res.data.roles[i].role.name == "ROLE_ADMIN") {
                            localStorage.setItem("w15store_admin", "true");
                            isAdmin = true;
                            break;
                        }
                    }
                    setTimeout(() => {
                        if (isAdmin)
                            window.location.href = "/admin/dashboard";
                        else
                            window.location.href = "/";
                    }, 1000);
                }
                else
                    toast.error('Đăng nhập thất bại')
            })
    }
    return (
        <div class="external">
            <div class="button">
                <LoginSocialFacebook
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID || "980183533498615"}
                    onResolve={(res) => {
                        ResolveFacebook(res)
                        // axios.post('http://localhost:8080/api/auth/processToken',
                        //     {
                        //         token: res.data.accessToken,
                        //         id: res?.data.id,
                        //         email: res?.data.email,
                        //         name: res?.data.name,
                        //         avatar: res?.data.picture?.data?.url,
                        //         hasProvider: true
                        //     },
                        //     {
                        //         withCredentials: true,
                        //         headers: {
                        //             'Content-Type': 'application/json' // Đảm bảo định dạng dữ liệu gửi đi là JSON
                        //         }
                        //     })
                    }}
                    onReject={(err) => {
                        console.log(err);
                    }}
                >
                    <button class="logger-external" title="Đăng nhập qua Facebook" id="Facebook">Đăng nhập bằng Facebook</button>
                </LoginSocialFacebook>
            </div>
            <div class="button">
                <LoginSocialGoogle
                    client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
                    onResolve={(res) => {
                        ResolveGoogle(res)
                    }}
                    onReject={(err) => {
                        console.log(err);
                    }}
                >
                    <button class="logger-external" title="Đăng nhập qua Google" type="submit" id="Google">Đăng nhập bằng Google</button>
                </LoginSocialGoogle>

            </div>
        </div>
    );
}

export default SocialButton;