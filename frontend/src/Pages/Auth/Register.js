import "../Auth/Logger.css";
import loggerImg from "../../Assets/Logger.png";
import SocialButton from "./SocialLoginButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserApi from "../../Api/UserApi";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Đăng kí";
    }, []);

    const handleUsernameBlur = () => {
        if (username.trim() === "") {
            setUsernameError("Vui lòng không bỏ trống");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!emailRegex.test(username) && !phoneRegex.test(username)) {
                setUsernameError("Vui lòng kiểm tra lại email hoặc số điện thoại");
            } else {
                setUsernameError("");
            }
        }
    };

    const handlePasswordBlur = () => {
        if (password.trim() === "") {
            setPasswordError("Vui lòng không bỏ trống");
        } else {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (!passwordRegex.test(password)) {
                setPasswordError("Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số");
            } else {
                setPasswordError("");
            }
        }
    };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Vui lòng không bỏ trống");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp");
    } else {
      setConfirmPasswordError("");
    }
  };

    const handleSubmit = async (e) => {
        if (password !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp");
            return;
        }
        e.preventDefault();
        try {
            const res = await UserApi.Register(username, password, "", "").then(
                (res) => {
                    if (res.status === 200 || res.status === 201) {
                        toast.success("Đăng kí thành công");
                        navigate("/login");
                    } else {
                        toast.error("Đăng kí thất bại");
                    }
                }
            );
            console.log(res);
        } catch (error) {
            toast.error("Đăng kí thất bại");
            console.log(error);
        }
    };

    return (
        <div className="container">
            {/* ảnh nền */}
            <div className="ad-block">
                <img src={loggerImg}></img>
            </div>
            {/* phần đăng kí */}
            <div className="logger">
                <h1>Đăng kí</h1>
                {/* form đăng kí */}
                <div className="internal">
                    {/* tài khoản */}
                    <div className="row">
                        <div className="label">Tài khoản</div>
                        <div className="input">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={handleUsernameBlur}
                                name="UserName"
                                placeholder="Số điện thoại hoặc Email..."
                                id="UserName"
                            ></input>
                            {usernameError && <div className="error">{usernameError}</div>}
                        </div>
                    </div>
                    {/* mật khẩu */}
                    <div className="row">
                        <div className="label">Mật khẩu</div>
                        <div className="input">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handlePasswordBlur}
                                name="UserPassword"
                                placeholder="*************"
                                id="UserPassword"
                            ></input>
                            {passwordError && <div className="error">{passwordError}</div>}
                        </div>
                    </div>
                    {/* xác nhận mật khẩu */}
                    <div className="row">
                        <div className="label">Nhập lại mật khẩu</div>
                        <div className="input">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={handleConfirmPasswordBlur}
                                name="ConfirmUserPassword"
                                placeholder="*************"
                                id="ConfirmUserPassword"
                            ></input>
                            {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
                        </div>
                    </div>
                    {/* nút đăng kí */}
                    <div className="row">
                        <button className="logger-btn" onClick={handleSubmit}>
                            Đăng kí
                        </button>
                    </div>
                </div>
                {/* Hoặc */}
                <div className="break-line">
                    <em className="break-caption">Hoặc</em>
                </div>
                {/* --------------------------------------- */}
                {/* Đăng nhập bằng liên kết */}
                <SocialButton />
                {/* Chuyển hướng đăng nhập */}
                <div className="other">
                    <p className="note">Đã có tài khoản?</p>
                    <Link className="nav" to="/login">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;