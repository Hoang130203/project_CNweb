import { useParams } from 'react-router-dom';
import './ProductDetailComponent.scss';
import products from '../ProductData/ProductData';

import RadioButton from '../RadioButton/RadioButton';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import Button from '../Button/Button';

import Carousel from './Carousel';
import Fancybox from './Fancybox';

import { IoIosStar } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";

const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
};

function ProductDetailComponent() {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const handleStorageOptionChange = (option) => {
        console.log('Selected option:', option);
    };
    const handleQuantityChange = (newQuantity) => {
        console.log('Selected quantity:', newQuantity);
    };

    return (
        <>
            <div className='image__container'>
                <Fancybox
                    // Sample options
                    options={{
                        Carousel: {
                            infinite: false,
                        },
                    }}
                >
                    <Carousel
                        // Sample options
                        options={{ infinite: false }}
                    >
                        <div
                            className="f-carousel__slide"
                            data-fancybox="gallery"
                            data-src="https://lipsum.app/id/60/1600x1200"
                            data-thumb-src="https://lipsum.app/id/60/200x150"
                        >
                            <img
                                alt=""
                                src="https://lipsum.app/id/60/400x300"
                                width="400"
                                height="300"
                            />
                        </div>
                        <div
                            className="f-carousel__slide"
                            data-fancybox="gallery"
                            data-src="https://lipsum.app/id/61/1600x1200"
                            data-thumb-src="https://lipsum.app/id/61/200x150"
                        >
                            <img
                                alt=""
                                src="https://lipsum.app/id/61/400x300"
                                width="400"
                                height="300"
                            />
                        </div>
                        <div
                            className="f-carousel__slide"
                            data-fancybox="gallery"
                            data-src="https://lipsum.app/id/62/1600x1200"
                            data-thumb-src="https://lipsum.app/id/62/200x150"
                        >
                            <img
                                alt=""
                                src="https://lipsum.app/id/62/400x300"
                                width="400"
                                height="300"
                            />
                        </div>
                        <div
                            className="f-carousel__slide"
                            data-fancybox="gallery"
                            data-src="https://lipsum.app/id/63/1600x1200"
                            data-thumb-src="https://lipsum.app/id/63/200x150"
                        >
                            <img
                                alt=""
                                src="https://lipsum.app/id/63/400x300"
                                width="400"
                                height="300"
                            />
                        </div>
                        <div
                            className="f-carousel__slide"
                            data-fancybox="gallery"
                            data-src="https://lipsum.app/id/64/1600x1200"
                            data-thumb-src="https://lipsum.app/id/64/200x150"
                        >
                            <img
                                alt=""
                                src="https://lipsum.app/id/64/400x300"
                                width="400"
                                height="300"
                            />
                        </div>
                    </Carousel>
                </Fancybox>
            </div>
            <div className='left__container'>
                <h1>{product.name}</h1>
                <div className="product__rating">
                    <p className='rating'>{product.rating}</p>
                    <p>
                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" />
                        ))}
                        {[...Array(5 - Math.floor(product.rating))].map((_, index) => (
                            <IoIosStar key={index + Math.floor(product.rating)} />
                        ))}
                    </p>
                    <p class="rate__total">
                        27
                        <span> đánh giá</span>
                    </p>
                    <p className='sale__count'>{product.salesCount}
                        <span> đã bán</span>
                    </p>
                </div>
                <div className='price__container'>
                    <p className='new__price'>{formatPrice(product.newPrice)}</p>
                    {product.oldPrice && <p className='old__price'>{formatPrice(product.oldPrice)}</p>}
                    <p className='discount'>{product.discount}</p>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Phân loại</p>
                    <div className='type__box'>
                        <RadioButton
                            type="radio"
                            options={['4GB', '8GB', '16GB', '32GB', '40GB', '80GB', '160GB', '320GB']}
                            onOptionChange={handleStorageOptionChange}
                        />
                    </div>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Màu sắc</p>
                    <div className='type__box'>
                        <RadioButton
                            type="radio"
                            options={['Đen', 'Trắng', 'Xanh', 'Đỏ', 'Vàng', 'Hồng', 'Xám', 'Nâu']}
                            onOptionChange={handleStorageOptionChange}
                        />
                    </div>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Số lượng</p>
                    <QuantitySelector initialQuantity={2} onQuantityChange={handleQuantityChange} />
                </div>
                <div className='button__container'>
                    <Button className='button__buy'>Mua ngay</Button>
                    <Button icon={<FaCartPlus />} className='button__cart'>Thêm vào giỏ hàng</Button>
                </div>
            </div>
        </>
    );
}


export default ProductDetailComponent;