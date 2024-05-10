import styles from './Layout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ChatBox from '../components/ChatBox/ChatBox';
function DefaultLayout({ children }) {
    return (
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
    );
}

export default DefaultLayout;