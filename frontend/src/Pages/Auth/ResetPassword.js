import { Link } from "react-router-dom";
import UserApi from "../../Api/UserApi";
import { useState } from "react";
import { toast } from "react-toastify";
// import './Login.css'
function ResetPassword() {
    const [email, setEmail] = useState('');
    const [account, setAccount] = useState('');
    const handleSubmit = () => {
        UserApi.ResetPassword(email, account).then(res => {
            if (res.data.infoMessage == 'success') {
                toast.success('Mật khẩu mới đã được gửi vào email của bạn');
            } else {
                toast.error('Tài khoản hoặc email không đúng');
            }
            console.log(res.data);
        }).catch(err => {
            console.log(err);
            toast.error('Tài khoản hoặc email không đúng');
        }
        )
    }
    return (

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '160px', height: '100%', alignItems: 'center' }}>
            <div>
                <Link to='/login' class="nav">Quay lại trang đăng nhập</Link>
            </div>
            <div >
                <h2 className="title">Quên mật khẩu</h2>
            </div>
            <div className="reset_row">
                <input type="text" value={account} onChange={(e) => { setAccount(e.target.value) }} placeholder="Nhập tài khoản của bạn" style={{ width: '290px', height: '30px', fontSize: '20px', borderRadius: '10px', margin: '10px 0px', padding: '3px 10px' }} />
            </div>
            <div className="reset_row">
                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Nhập email của bạn" style={{ width: '290px', height: '30px', fontSize: '20px', borderRadius: '10px', margin: '10px 0px', padding: '3px 10px' }} />
            </div>
            <div className="reset_row">
                <button onClick={handleSubmit} className="logger-btn" type="submit" style={{ width: '250px', height: '30px', fontSize: '20px', borderRadius: '10px', margin: '10px 0px', padding: '3px 10px' }} >Gửi mật khẩu mới </button>

            </div>
        </div>
    );
}

export default ResetPassword;