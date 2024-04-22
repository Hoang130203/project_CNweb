import "../Auth/Logger.css"
import loggerImg from "../../Assets/Logger.png"
function Login() {
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
                        {/* nút đăng nhập */}
                        <div class="row">
                            <button class="login-btn" type="submit">Đăng nhập</button>
                        </div>

                    </form>
                </div>
                {/* Hoặc */}
                <div class="break-line">
                    <em class="break-caption">Hoặc</em>
                </div>
                {/* --------------------------------------- */}
                {/* Đăng nhập bằng liên kết */}
                <div class="external">
                    <form method="post">
                        <div class="button">
                            <button class="logger-external" title="Đăng nhập qua Facebook" type="submit" id="Facebook">Đăng nhập bằng Facebook</button>
                        </div>

                        <div class="button">
                            <button class="logger-external" title="Đăng nhập qua Google" type="submit" id="Google">Đăng nhập bằng Google</button>
                        </div>
                    </form>
                </div>
                {/* Chuyển hướng đăng nhập */}
                <div class="other">
                    <p class="note">Chưa có tài khoản?</p>
                    <a class="nav" href="../register">Đăng kí</a>
                </div>
            </div>
        </div>      
     );
}

export default Login;