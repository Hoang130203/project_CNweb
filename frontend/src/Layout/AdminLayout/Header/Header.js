import { useContext } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { IoNotificationsCircle } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';
import Menu from '../Menu';
import { SocketContext } from '../../../Pages/Admin/Context/context';

const cx = classNames.bind(styles);
function Header() {
    const [messages, setMessages, stompClient, username, oldTopicDict, notifications, setNotifications, oldNotifications, setOldNotifications] = useContext(SocketContext)
    return (
        <div className={cx('wrap')}>

            <Link to="/" className={cx('logo')}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <img src='https://cdn.pixabay.com/photo/2023/10/13/03/29/dashboard-8312011_1280.png' width={35}></img>
                    W15Store
                </div>
            </Link>
            <div style={{ display: 'flex', marginRight: '35px' }}>
                <Link to='/admin/notification' >
                    <div className={cx('notification')}>
                        <IoNotificationsCircle className={cx('icon')} style={{ fontSize: '40px' }} />
                        {notifications.length > 0 &&
                            <div className={cx('number')}>{notifications.length}</div>
                        }
                    </div>
                </Link>
                <div className={cx('wrap_menu')}>
                    <HiMenuAlt2 className={cx('menu')} style={{ fontSize: '40px', color: '#b9e1df' }} />
                    <div className={cx('menu_content')}>
                        <Menu />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;