import { Link } from "react-router-dom";

function ResetPassword() {
    return (

        <div class="container">
            <div>
                <Link to='/login' class="nav">Quay lại trang đăng nhập</Link>
            </div>
            <div class="row">
                <button class="logger-btn" type="submit">Gửi mã xác nhận</button>

            </div>
        </div>
    );
}

export default ResetPassword;