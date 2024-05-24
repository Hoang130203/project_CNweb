import { useState } from 'react';
import './css/setting.css'
import { toast } from 'react-toastify';
import UserApi from '../../Api/UserApi';
function Setting() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSavePassword = async () => {

        // Sau khi đổi mật khẩu thành công, đóng popup

    }
    const handleSubmit = () => {
        if (newPassword !== confirmNewPassword) {
            toast.error("Mật khẩu mới không khớp");
            return;
        }
        // Xử lý logic đổi mật khẩu
        UserApi.ChangePassword(password, newPassword).then(res => {
            console.log(res.data);
            if (res.data == newPassword) {
                toast.success("Đổi mật khẩu thành công");
            } else {
                toast.error("Sai mật khẩu cũ");
            }
        });
    };

    return (
        <div>
            <div className="admin-settings">
                <h2>Cài đặt tài khoản admin</h2>
                <div>
                    <h3>Thông tin tài khoản</h3>
                    <p>Tên đăng nhập: {username}</p>
                </div>
                <div >
                    <h3>Đổi mật khẩu</h3>
                    <div>
                        <label>Mật khẩu hiện tại:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Mật khẩu mới:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Xác nhận mật khẩu mới:</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit}>Đổi mật khẩu</button>
                </div>
            </div>
        </div>
    );
}

export default Setting;