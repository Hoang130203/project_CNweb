import "../Auth/Login.css"
function Login() {
    return ( 
<div class="container">
    <div class="ad-block"></div>

    <div class="login">
        <h1 class="title">Đăng nhập</h1>
        {/*Đăng nhập bằng tài khoản*/}
        <div class="internal">
            <form method="post" action="">
                
                <div class="row">
                    <div class="label">Tài khoản</div>
                    <div class="input">
                        <input type="text" name="UserName" placeholder="Số điện thoại hoặc Email..." id="UserName"></input>
                    </div>
                </div>
                
                <div class="row">
                    <div class="label">Mật khẩu</div>
                    <div class="input">
                        <input type="password" name="UserPassword" placeholder="*************" id="UserPassword"></input>
                    </div>
                </div>

                <div class="button">
                    <button class="login-btn" type="submit">Đăng nhập</button>
                </div>

                <div class="break-line">
                    <span class="break-caption">Hoặc</span>
                </div>
            </form>
        </div>
            
    {/* Đăng nhập bằng liên kết */}
        <div class="external">
            <form method="post">
                <div class="button">
                    <button class="login-ex" title="Đăng nhập qua Facebook" type="submit" id="Facebook">Đăng nhập bằng Facebook</button>
                </div>

                <div class="button">
                    <button class="login-ex" title="Đăng nhập qua Google" type="submit" id="Google">Đăng nhập bằng Google</button>
                </div>

            </form>
        </div>

        <div class="for-register">
            <p class="register-note">Chưa có tài khoản?</p>
            <a class="register-btn" href="../register">Đăng kí</a>
        </div>

    </div>
</div>
     );
}

export default Login;