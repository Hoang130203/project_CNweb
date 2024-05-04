import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

function SocialButton() {
    const navigate = useNavigate();
    return (
        <div class="external">
            <div class="button">
                <LoginSocialFacebook
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID || "980183533498615"}
                    onResolve={(res) => {
                        console.log(res.data);
                        toast.success('Đăng nhập thành công, xin chào ' + res.data.name)
                        localStorage.setItem('w15store_avatar', res.data.picture?.data?.url)
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 1000)

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
                        console.log(res);
                        toast.success('Đăng nhập thành công, xin chào ' + res.data.name)
                        localStorage.setItem('w15store_avatar', res.data.picture)

                        setTimeout(() => {
                            window.location.href = '/'
                        }
                            , 1000)
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