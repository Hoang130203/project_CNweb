import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.scss';
import { MdDashboard } from "react-icons/md";
import { ImMobile } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { SiAdminer } from "react-icons/si";
import { IoMdLogOut } from "react-icons/io";
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../Pages/Admin/Context/context';

const cx = classNames.bind(styles);
function SideBar() {
    const navigate = useNavigate()
    const [messages] = useContext(SocketContext);
    const [showMessageNotification, setShowMessageNotification] = useState(false);
    useEffect(() => {
        if (window.location.pathname === '/admin/chat' || messages.length === 0) {
            setShowMessageNotification(false);
        } else {
            setShowMessageNotification(true);
        }
    }, [messages])
    const handleLogout = () => {
        // localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <div className={[cx('wrap'), 'no_select'].join(' ')}>
            <div className={cx('content')}>
                <div className={cx('head')}>
                    <SiAdminer style={{ marginRight: '5px' }} />
                    Trang quản trị
                </div>
                <div className={cx('nav_router')}>
                    <NavLink to="/admin/dashboard" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <MdDashboard style={{ marginRight: '5px' }} />
                        Thống kê
                    </NavLink>
                    <NavLink to="/admin/products" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <ImMobile style={{ marginRight: '5px' }} />
                        Sản phẩm</NavLink>
                    <NavLink to="/admin/orders" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <FaCartShopping style={{ marginRight: '5px' }} />
                        Đơn hàng</NavLink>
                    <NavLink to="/admin/users" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <FaUsersGear style={{ marginRight: '5px' }} />
                        Người dùng</NavLink>
                    <NavLink to="/admin/chat" className={(nav) => cx('nav_item', { active: nav.isActive })} onClick={() => { setShowMessageNotification(false) }}>
                        <FaFacebookMessenger style={{ marginRight: '5px' }} />
                        Chat
                        <div className={cx('notification')} style={{ display: showMessageNotification ? '' : 'none' }}></div>
                    </NavLink>
                    <NavLink to="/admin/notification" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <MdOutlineNotificationsActive style={{ marginRight: '5px' }} />
                        Thông báo</NavLink>
                    <NavLink to="/admin/setting" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <TbInfoHexagonFilled style={{ marginRight: '5px' }} />
                        Cài đặt tài khoản</NavLink>
                    <hr className={cx('hr')}></hr>
                    <div className={cx('nav_item')} onClick={handleLogout}>
                        <IoMdLogOut style={{ marginRight: '5px' }} />
                        Đăng xuất
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;