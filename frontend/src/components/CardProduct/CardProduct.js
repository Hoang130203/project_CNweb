import classNames from 'classnames/bind';
import styles from './CardProduct.module.scss';

const cx = classNames.bind(styles);

const CardProduct = ({ image, name, discount, oldPrice, newPrice }) => (
    <div className={cx("card__product")}>
        <div className={cx("product__image")}>
            <img src={image} alt={name} />
        </div>
        <div className={cx("product__name")}>
            <h3>{name}</h3>
        </div>
        <div className={cx("product__price")} style={{ textAlign: 'center' }}>
            <span className={cx("new__price")}>{newPrice}</span><br />
            {oldPrice ? (
                <div className={cx("old__price")}>{oldPrice}</div>
            ) : (
                <div className={cx("old__price no__line")}>&nbsp;</div> // This is a non-breaking space
            )}
            {discount && (
                <div className={cx("discount")}>
                    <p className={cx("discount__detail")}>
                        {discount}
                    </p>
                </div>
            )}
        </div>
    </div>
);

export default CardProduct;
