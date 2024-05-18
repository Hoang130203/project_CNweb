import { OrderProvider } from '../../Pages/ContextOrder/OrderContext';
import Header from '../Header/Header';

import styles from './CartLayout.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CartLayout({ children }) {
    return (
        <OrderProvider>
            <div className={cx('wrap')}>
                <div>
                    <Header />
                </div>
                <div style={{ minHeight: '1000px' }}>
                    {children}
                </div>
            </div>
        </OrderProvider>
    );
}

export default CartLayout;