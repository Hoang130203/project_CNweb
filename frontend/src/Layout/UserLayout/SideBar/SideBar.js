import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

import { Link, NavLink, useNavigate } from 'react-router-dom';

import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SideBar() {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('w15store_user')))
    }, [])
    return (
        <div className={cx('wrap')}>
            <div className={cx('content')}>
                <div className={cx('userInfo')}>
                    <div className={cx('avatar')}>
                        <img src={user?.avatar || "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"} alt="avatar" />
                    </div>
                    <div className={cx('name')}>
                        <h3>{user?.name}</h3>
                        <span>{user?.email}</span>
                    </div>
                </div>
                <div className={cx('nav_router')}>
                    <NavLink to="/user/profile" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <ImProfile style={{ marginRight: '5px' }} />
                        Hồ sơ
                    </NavLink>
                    <NavLink to="/user/orders" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <FaCartShopping style={{ marginRight: '5px' }} />
                        Đơn mua</NavLink>
                    <NavLink to="/user/notification" className={(nav) => cx('nav_item', { active: nav.isActive })}>
                        <MdOutlineNotificationsActive style={{ marginRight: '5px' }} />
                        Thông báo</NavLink>
                </div>
            </div>
        </div>
    );
}

export default SideBar;