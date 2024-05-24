import classNames from 'classnames/bind';
import styles from './CardProduct.module.scss';
import { Link } from 'react-router-dom';



const cx = classNames.bind(styles);

const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
};

const CardProduct = ({ image, name, discount, oldPrice, newPrice, id, rating }) => (
    <Link to={`/product-detail/${id}`} className={cx("card__product")} style={{ color: 'inherit', textDecoration: 'inherit' }}>
        <div className={cx("product__image")}>
            <div className={cx("bg_image")}></div>
            <img src={image} alt={name} />
        </div>
        <div className={cx("info__wrap")}>
            <div className={cx("product__name")}>
                <h3>{name}</h3>
            </div>
            <div className={cx("product__price")} style={{ textAlign: "center" }}>
                <span className={cx("new__price")}>{formatPrice(newPrice)}</span>
                <br />
                {oldPrice ? (
                    <div className={cx("old__price")}>{formatPrice(oldPrice)}</div>
                ) : (
                    <div className={cx("old__price no__line")}>&nbsp;</div>
                )}
                {discount && (
                    <div className={cx("discount")}>
                        <p className={cx("discount__detail")}>{discount}</p>
                    </div>
                )}
            </div>
            <div className={cx("stars")}>
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={cx("star")}>
                        {index < rating ? '★' : '☆'}
                    </span>
                ))}
            </div>
        </div>
    </Link>
);

export default CardProduct;
