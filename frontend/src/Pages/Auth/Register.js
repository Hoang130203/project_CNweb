import "../Auth/Logger.css"
import loggerImg from "../../Assets/Logger.png"
import SocialButton from "./SocialLoginButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserApi from "../../Api/UserApi";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Đăng kí';
    }, []);
    const handleSubmit = async (e) => {
        if (password !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp");
            return;
        }
        e.preventDefault();
        try {
            const res = await UserApi.Register(username, password, "", "")
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        toast.success("Đăng kí thành công");
                        navigate("/login")
                    }
                    else
                        toast.error("Đăng kí thất bại");
                })
            console.log(res);
        }
        catch (error) {
            toast.error("Đăng kí thất bại");
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
                <h1>Đăng kí</h1>
                {/* form đăng kí */}
                <div class="internal">
                    {/* tài khoản */}
                    <div class="row">
                        <div class="label">Tài khoản</div>
                        <div class="input">
                            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} name="UserName" placeholder="Số điện thoại hoặc Email..." id="UserName"></input>
                        </div>
                    </div>
                    {/* mật khẩu */}
                    <div class="row">
                        <div class="label">Mật khẩu</div>
                        <div class="input">
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} name="UserPassword" placeholder="*************" id="UserPassword"></input>
                        </div>
                    </div>
                    {/* xác nhận mật khẩu */}
                    <div class="row">
                        <div class="label">Nhập lại mật khẩu</div>
                        <div class="input">
                            <input type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} name="ConfirmUserPassword" placeholder="*************" id="ConfirmUserPassword"></input>
                        </div>
                    </div>
                    {/* nút đăng kí */}
                    <div class="row">
                        <button class="logger-btn" onClick={handleSubmit}>Đăng kí</button>
                    </div>

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
                    <p class="note">Đã có tài khoản?</p>
                    <Link class="nav" to="/login">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;