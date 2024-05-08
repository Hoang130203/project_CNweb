import Header from '../Header/Header';

import styles from './CartLayout.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CartLayout ({ children }) {
    return (
        <div className={cx('wrap')}> 
            <div>
                <Header />
            </div>
            <div style={{ minHeight: '1000px'}}>
                {children}
            </div>
        </div>
    );
}

export default CartLayout;