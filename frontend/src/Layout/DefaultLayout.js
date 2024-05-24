import styles from './Layout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ChatBox from '../components/ChatBox/ChatBox';
import { OrderProvider } from '../Pages/ContextOrder/OrderContext';
import { NotificationProvider } from '../Pages/ContextOrder/NotificationContext';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <NotificationProvider>
            <OrderProvider>
                <div>
                    <div>
                        <Header />
                    </div>
                    <div style={{ minHeight: '1000px' }} >
                        <div className={cx('bg_content')} onClick={(e) => { e.stopPropagation() }}> </div>
                        {children}
                    </div>
                    <div>
                        <Footer />
                    </div>
                    <ChatBox />

                </div>
            </OrderProvider>
        </NotificationProvider>
    );
}

export default DefaultLayout;