import styles from './Layout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ChatBox from '../components/ChatBox/ChatBox';
import { OrderProvider } from '../Pages/ContextOrder/OrderContext';
import { NotificationProvider } from '../Pages/ContextOrder/NotificationContext';
function DefaultLayout({ children }) {
    return (
        <NotificationProvider>
            <OrderProvider>
                <div>
                    <div>
                        <Header />
                    </div>
                    <div style={{ minHeight: '1000px' }}>
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