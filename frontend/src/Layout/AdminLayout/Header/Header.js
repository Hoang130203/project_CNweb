import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);
function Header() {
    return (
        <div className={cx('wrap')}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                <img src='https://cdn.pixabay.com/photo/2023/10/13/03/29/dashboard-8312011_1280.png' width={35}></img>
                <Link to="/dashboard" className={cx('logo')}>W15Store</Link>
            </div>
        </div>
    );
}

export default Header;