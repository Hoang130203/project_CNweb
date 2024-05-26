import { NavLink } from "react-router-dom";

import classNames from 'classnames/bind';
import styles from './SideBar/SideBar.module.scss';
const cx = classNames.bind(styles);
function Menu() {

    return (
        <div className={cx('nav_router')}>
            <NavLink to="/admin/dashboard" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                Thống kê
            </NavLink>
            <NavLink to="/admin/products" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                Sản phẩm</NavLink>
            <NavLink to="/admin/orders" className={(nav) => cx('nav_item', { active: nav.isActive })}>

                Đơn hàng</NavLink>
            <NavLink to="/admin/users" className={(nav) => cx('nav_item', { active: nav.isActive })}>

                Người dùng</NavLink>
            <NavLink to="/admin/chat" className={(nav) => cx('nav_item', { active: nav.isActive })}>

                Chat</NavLink>
            <NavLink to="/admin/livestream" className={(nav) => cx('nav_item', { active: nav.isActive })}>

                Live stream</NavLink>
            <NavLink to="/admin/notification" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                Thông báo</NavLink>
            <NavLink to="/admin/setting" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                Cài đặt tài khoản</NavLink>
            <hr className={cx('hr')}></hr>
            <div className={cx('nav_item')} >
                Đăng xuất
            </div>
        </div>
    );
}

export default Menu;