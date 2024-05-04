import "../Auth/Logger.css"
import loggerImg from "../../Assets/Logger.png"
import SocialButton from "./SocialLoginButton";
import { Link } from "react-router-dom";
function Register() {
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
                    <form method="post" action="">
                        {/* tài khoản */}
                        <div class="row">
                            <div class="label">Tài khoản</div>
                            <div class="input">
                                <input type="text" name="UserName" placeholder="Số điện thoại hoặc Email..." id="UserName"></input>
                            </div>
                        </div>
                        {/* mật khẩu */}
                        <div class="row">
                            <div class="label">Mật khẩu</div>
                            <div class="input">
                                <input type="password" name="UserPassword" placeholder="*************" id="UserPassword"></input>
                            </div>
                        </div>
                        {/* xác nhận mật khẩu */}
                        <div class="row">
                            <div class="label">Nhập lại mật khẩu</div>
                            <div class="input">
                                <input type="password" name="ConfirmUserPassword" placeholder="*************" id="ConfirmUserPassword"></input>
                            </div>
                        </div>
                        {/* nút đăng kí */}
                        <div class="row">
                            <button class="logger-btn" type="submit">Đăng kí</button>
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
                    <p class="note">Đã có tài khoản?</p>
                    <Link class="nav" to="/login">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;