import styles from './Layout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
function DefaultLayout({ children }) {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div style={{ minHeight: '600px'}}>
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;