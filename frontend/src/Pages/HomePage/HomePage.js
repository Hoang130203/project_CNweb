import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import phoneImg from '../../Assets/Phone.png';
import laptopImg from '../../Assets/Laptop.png';
import watchImg from '../../Assets/Watch.png';
import accessoryImg from '../../Assets/Accessory.png';
import CardProduct from '../../components/CardProduct/CardProduct';
import products from '../../components/ProductData/ProductData';


const cx = classNames.bind(styles);
function HomePage() {

    return (
        <div className={cx('homepage')} >
            <h1>
                Hãy mua ngay để nhận ưu đãi tốt nhất!
            </h1>
            <div className={cx('option')} >
                <div className={cx('option__item')} >
                    <img src={phoneImg} alt='option' />
                    <h3>Điện Thoại</h3>
                </div>
                <div className={cx('option__item')} >
                    <img src={laptopImg} alt='option' />
                    <h3>Laptop</h3>
                </div>
                <div className={cx('option__item')} >
                    <img src={watchImg} alt='option' />
                    <h3>Đồng Hồ</h3>
                </div>
                <div className={cx('option__item')} >
                    <img src={accessoryImg} alt='option' />
                    <h3>Phụ Kiện</h3>
                </div>
            </div>
            <div className={cx('item__container')} >
                <h2>Sản phẩm mới nhất</h2>
                <div className={cx('item')} >
                    {products.map((product) => (
                        <CardProduct
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            discount={product.discount}
                            oldPrice={product.oldPrice}
                            newPrice={product.newPrice}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;