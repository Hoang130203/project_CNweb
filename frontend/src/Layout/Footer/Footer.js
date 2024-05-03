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
                    <div className={cx('customerHub')} style={{paddingLeft: '42%'}}>
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
                    <div className={cx('teamIntroduction')} style={{paddingLeft: '8%', marginBottom: '3%'}}>
                        <p className={cx('level1')}>Introduction To The Team</p>
                        <Link to='' className={cx('level2')}>
                            Team Infomation
                        </Link>
                    </div>

                    {/* Account */}
                    <div className={cx('teamIntroduction')} style={{paddingLeft: '8%', marginBottom: '3%'}}>
                        <p className={cx('level1')}>Account</p>
                        <Link to='' className={cx('level2')}>
                            Manage Account
                        </Link>
                        <Link to='' className={cx('level2')}>
                            Change Password
                        </Link>
                    </div>

                    {/* Customer Service */}
                    <div className={cx('customerHub')} style={{paddingLeft: '8%'}}>
                        <p className={cx('level1')}>Customer Service</p>
                        <Link to='' className={cx('level2')}>
                            Warranty policy
                        </Link>
                        <Link to='' className={cx('level2')}>
                            Loyalty Points Policy
                        </Link>
                        <Link to='' className={cx('level2')}>
                            Promotional Policies
                        </Link>
                    </div>
                </div>

                <div className={cx('column1')}>
                    {/* Contact Information */}
                    <div className={cx('customerHub')}>
                        <p className={cx('level1')}>Contact Information</p>
                        <Link to='' className={cx('level2')}>
                            Contact Phone Number
                        </Link>
                    </div>
                </div>
                
                <div className={cx('column3')}>
                    {/* Other */}
                    {/* <div className={cx('customerHub')}>
                        <p className={cx('level1')}></p>
                        <Link to='' className={cx('level2')}>
                            
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
     );
}

export default Footer;