import styles from './Layout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ChatBox from '../components/ChatBox/ChatBox';
import { OrderProvider } from '../Pages/ContextOrder/OrderContext';
function DefaultLayout({ children }) {
    return (
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
    );
}

export default DefaultLayout;