import classNames from 'classnames/bind';
import styles from '../Layout.module.scss'
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)
function Header() {
    return (
        <div className={cx('header')}>
            <div style={{ color: '#fff', padding: '5px' }}>
                <Link to='/' style={{ color: '#fff', marginRight: '30px' }}>Home</Link>
                <Link to='/hot' style={{ color: '#fff', marginRight: '30px' }}>Hot</Link>
                <Link to='/new' style={{ color: '#fff', marginRight: '30px' }}>New</Link>
                <Link to='/type' style={{ color: '#fff', marginRight: '30px' }}>Thể loại(làm cái dropdown menu)</Link>
                <Link to='/following' style={{ color: '#fff', marginRight: '30px' }}>Theo dõi</Link>
            </div>
            <div >
                <Link to='/login' style={{ color: '#fff', marginRight: '30px' }}>Login</Link>
                <Link to='/register' style={{ color: '#fff' }}>Register</Link>
            </div>
        </div>
    );
}

export default Header;