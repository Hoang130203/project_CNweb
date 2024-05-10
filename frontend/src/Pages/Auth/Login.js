import "../Auth/Logger.css"
import loggerImg from "../../Assets/Logger.png"
import SocialButton from "./SocialLoginButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserApi from "../../Api/UserApi";
import { toast } from "react-toastify";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await UserApi.Login(username, password)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        toast.success("Đăng nhập thành công");
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
                        toast.error("Đăng nhập thất bại");
                }).catch((err) => {
                    toast.error("Đăng nhập thất bại");
                })
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div class="container">
            {/* ảnh nền */}
            <div class="ad-block">
                <img src={loggerImg}></img>
            </div>
            {/* phần đăng kí */}
            <div class="logger">
                <h1>Đăng nhập</h1>
                {/* form đăng kí */}
                <div class="internal login">
                    <form method="post" action="">
                        {/* tài khoản */}
                        <div class="row">
                            <div class="label">Tài khoản</div>
                            <div class="input">
                                <input type="text" name="UserName" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="Số điện thoại hoặc Email..." id="UserName"></input>
                            </div>
                        </div>
                        {/* mật khẩu */}
                        <div class="row">
                            <div class="label">Mật khẩu</div>
                            <div class="input">
                                <input type="password" value={password} name="UserPassword" onChange={(e) => { setPassword(e.target.value) }} placeholder="*************" id="UserPassword"></input>
                            </div>
                        </div>
                        {/* nút đăng nhập */}
                        <div class="row">
                            <button class="login-btn" onClick={handleSubmit}>Đăng nhập</button>
                        </div>

                    </form>
                </div>
                {/* Hoặc */}
                <div class="break-line">
                    <em class="break-caption">Hoặc</em>
                </div>
                {/* --------------------------------------- */}
                {/* Đăng nhập bằng liên kết */}
                <SocialButton />
                {/* Chuyển hướng đăng nhập */}
                <div class="other">
                    <p class="note">Chưa có tài khoản?</p>
                    <Link class="nav" to="/register">Đăng kí</Link>
                </div>
                <div class="other">
                    <Link to='/reset_password' class="nav">Quên mật khẩu?</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;