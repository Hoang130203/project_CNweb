import styles from '../Layout.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx= classNames.bind(styles);
function Footer() {
    return ( 
        <div className={cx('footer')}>
            <div className={cx('menu')}>
                <div className={cx('column1')}>
                    {/* Customer Hub */}
                    <div className={cx('customerHub')}>
                        <p className={cx('level1')}>Customer Hub</p>
                        <Link to='' className={cx('level2')}>
                            Shop Infomation
                        </Link>
                        <Link to='' className={cx('level2')}>
                            Product List
                        </Link>
                        <Link to='' className={cx('level2')}>
                            Purchase History
                        </Link>
                    </div>
                </div>

                <div className={cx('column2')}>
                    {/* Team Introduction */}
                    <div className={cx('teamIntroduction')}>
                        <p className={cx('level1')}>Introduction To The Team</p>
                        <Link to='' className={cx('level2')}>
                            Đăng xuất
                        </Link>
                    </div>
                </div>

                <div>
                    {/* Customer Hub */}
                    {/* <div className={cx('customerHub')}>
                        <p className={cx('level1')}>Customer Hub</p>
                        <Link to='' className={cx('level2')}>
                            Đăng xuất
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
     );
}

export default Footer;