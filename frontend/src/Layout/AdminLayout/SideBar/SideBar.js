import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss';
const cx = classNames.bind(styles);
function SideBar() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('content')}>
                Trang Admin

                <div className={cx('nav_router')}>
                    <Link to="/dashboard" className={cx('nav_item')}>Dashboard</Link>
                    <Link to="/products" className={cx('nav_item')}>Sản phẩm</Link>
                    <Link to="/orders" className={cx('nav_item')}>Đơn hàng</Link>
                </div>


            </div>
        </div>
    );
}

export default SideBar;