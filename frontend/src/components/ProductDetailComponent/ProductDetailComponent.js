import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetailComponent.scss';
import RadioButton from '../RadioButton/RadioButton';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import Button from '../Button/Button';
import Carousel from './Carousel';
import Fancybox from './Fancybox';
import { IoIosStar } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import UserApi from '../../Api/UserApi';
import { convertColor } from '../../Api/OtherFunction';
import { OrderContext } from '../../Pages/ContextOrder/OrderContext';
import { toast } from 'react-toastify';
import { LoadingContext } from '../..';

const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
};

function ProductDetailComponent({ product }) {
    const [loading, setLoading] = useContext(LoadingContext);
    const [products, setProducts, address, setAddress] = useContext(OrderContext);
    const [option, setOption] = useState({ color: '', size: '' });
    const [quantity, setQuantity] = useState(1);

    const convertOption = useCallback((option, type) => {
        if (type === 'size') {
            return option.name;
        } else if (type === 'color') {
            return convertColor(option.name);
        }
        return '';
    }, []);

    const handleStorageOptionChange = useCallback((selectedOption, type) => {
        if (type === 'size') {
            const selectedSize = product?.sizes?.find((size) => size.name === selectedOption);
            setOption((prevOption) => ({ ...prevOption, size: selectedSize?.id }));
        }
        if (type === 'color') {
            const selectedColor = product?.colors?.find((color) => convertColor(color.name) === selectedOption);
            setOption((prevOption) => ({ ...prevOption, color: selectedColor?.id }));
        }
    }, [product]);

    const handleQuantityChange = useCallback((newQuantity) => {
        setQuantity(newQuantity);
    }, []);

    const navigate = useNavigate();

    const handleBuy = () => {
        if (!option.size || !option.color) {
            toast.warn('Vui lòng chọn đủ màu sắc và kích thước');
            return;
        }
        let isUser = false
        let roles = JSON.parse(localStorage.getItem('w15store_user'))?.roles
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].role?.id == 1) {
                isUser = true
            }
        }
        if (!isUser) {
            toast.warn('Chỉ có người dùng mới có thể mua hàng, hãy đăng nhập với tư cách người dùng')
            return
        }
        const newProduct = {
            id: product.id,
            name: product.name,
            cost: product.cost,
            promotion: product.promotion,
            quantity: quantity,
            size: { id: Number(option.size), name: product.sizes.find(size => size.id == option.size).name },
            color: { id: Number(option.color), name: product.colors.find(color => color.id == option.color).name },
            images: product.images
        };
        setProducts([newProduct]);
        navigate('/cart/checkout');
    };

    const handleAddToCart = () => {
        if (!option.size || !option.color) {
            toast.warn('Vui lòng chọn đủ màu sắc và kích thước');
            return;
        }
        let isUser = false
        let roles = JSON.parse(localStorage.getItem('w15store_user'))?.roles
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].role?.id == 1) {
                isUser = true
            }
        }
        if (!isUser) {
            toast.warn('Chỉ có người dùng mới có thể mua hàng, hãy đăng nhập với tư cách người dùng')
            return
        }
        const newProduct = {
            productId: product.id,
            cost: product.cost,
            quantity: quantity,
            sizeId: Number(option.size),
            colorId: Number(option.color)
        };
        setLoading(true);
        UserApi.AddToCart(newProduct).then((response) => {
            toast.success('Thêm vào giỏ hàng thành công');
        }).catch((error) => {
            toast.error('Thêm vào giỏ hàng thất bại');
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        console.log(products);
    }, [products]);

    const carouselContent = useMemo(() => (
        <Fancybox options={{ Carousel: { infinite: false } }}>
            <Carousel options={{ infinite: false }}>
                {product?.images?.map((image, index) => (
                    <div
                        className="f-carousel__slide"
                        data-fancybox="gallery"
                        data-src={image.url}
                        data-thumb-src={image.url}
                        key={index}
                    >
                        <img alt="" src={image.url} width="400" height="300" />
                    </div>
                ))}
            </Carousel>
        </Fancybox>
    ), [product?.images]);

    return (
        <div className='flex_box'>
            <div className='top_container'>
                <h1>{product?.name}</h1>
                <div className="product__rating">
                    {product?.rate} sao
                    <p className='rating'> {product?.rating}</p>
                    <p>
                        {[...Array(Math.floor(product?.rate || 0))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" />
                        ))}
                        {[...Array(5 - Math.floor(product?.rate || 0))].map((_, index) => (
                            <IoIosStar key={index + Math.floor(product?.rating)} />
                        ))}
                    </p>
                    <p className="rate__total">
                        {product?.rates?.length}
                        <span> đánh giá</span>
                    </p>
                    <p className='sale__count'>{product?.saleCount || 0}
                        <span> đã bán</span>
                    </p>
                </div>
            </div>
            <div className='image__container'>
                {carouselContent}
            </div>
            <div className='left__container'>
                <div className='hidden_block'>
                    <h1>{product?.name}</h1>
                    <div className="product__rating">
                        {product?.rate} sao
                        <p className='rating'> {product?.rating}</p>
                        <p>
                            {[...Array(Math.floor(product?.rate || 0))].map((_, index) => (
                                <IoIosStar key={index} color="#FFCB45" />
                            ))}
                            {[...Array(5 - Math.floor(product?.rate || 0))].map((_, index) => (
                                <IoIosStar key={index + Math.floor(product?.rating)} />
                            ))}
                        </p>
                        <p className="rate__total">
                            {product?.rates?.length}
                            <span> đánh giá</span>
                        </p>
                        <p className='sale__count'>{product?.saleCount || 0}
                            <span> đã bán</span>
                        </p>
                    </div>
                </div>
                <div className='price__container'>
                    <p className='new__price'>{formatPrice(product.cost - product.cost * product.promotion / 100)}</p>
                    {product?.promotion && <p className='old__price'>{formatPrice(product?.cost)}</p>}
                    <p className='discount'>{product?.promotion}</p>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Phân loại</p>
                    <div className='type__box'>
                        <RadioButton
                            type="radio"
                            options={product?.sizes?.map((size) => convertOption(size, 'size')) || []}
                            onOptionChange={(selectedOption) => handleStorageOptionChange(selectedOption, 'size')}
                        />
                    </div>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Màu sắc</p>
                    <div className='type__box'>
                        <RadioButton
                            type="radio"
                            options={product?.colors?.map((color) => convertOption(color, 'color')) || []}
                            onOptionChange={(selectedOption) => handleStorageOptionChange(selectedOption, 'color')}
                        />
                    </div>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Số lượng</p>
                    <QuantitySelector initialQuantity={1} onQuantityChange={handleQuantityChange} />
                </div>
                <div className='button__container'>
                    <Button className='button__buy' onClick={handleBuy}>Mua ngay</Button>
                    <Button icon={<FaCartPlus />} className='button__cart' onClick={handleAddToCart}>Thêm vào giỏ</Button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailComponent;
