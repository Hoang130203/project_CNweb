import { useState } from 'react';
import './css/setting.css'
import { toast } from 'react-toastify';
function Setting() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra xác thực mật khẩu hiện tại
        if (password !== "admin123") {
            toast.error("Mật khẩu không đúng");
            return;
        }
        // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới
        if (newPassword !== confirmNewPassword) {
            toast.error("Mật khẩu mới không khớp");
            return;
        }
        // Thực hiện cập nhật mật khẩu
        toast.success("Đổi mật khẩu thành công");
        setPassword(newPassword);
    };

    return (
        <div>
            <div className="admin-settings">
                <h2>Cài đặt tài khoản admin</h2>
                <div>
                    <h3>Thông tin tài khoản</h3>
                    <p>Tên đăng nhập: {username}</p>
                </div>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Đổi mật khẩu</button>
                </form>
            </div>
        </div>
    );
}

export default Setting;