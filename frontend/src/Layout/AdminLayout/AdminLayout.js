import SideBar from "./SideBar/SideBar";
import styles from './AdminLayout.module.scss'
import classNames from 'classnames/bind';
import Header from "./Header/Header";
import { SocketProvider } from "../../Pages/Admin/Context/context";
const cx = classNames.bind(styles);
function AdminLayout({ children }) {
    return (
        <div className={cx('wrap')}>
            <SocketProvider>
                <div style={{ width: '100%', height: '60px', position: 'fixed', top: 0, left: 0, zIndex: '60' }}></div>
                <Header />
                <SideBar />
                <div className={cx('children')}>
                    <div className={cx('content')}>
                        {children}
                    </div>
                </div>
            </SocketProvider>
        </div>
    );
}

export default AdminLayout;