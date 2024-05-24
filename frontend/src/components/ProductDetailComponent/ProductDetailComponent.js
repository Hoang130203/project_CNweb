import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetailComponent.scss';
import RadioButton from '../RadioButton/RadioButton';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import Button from '../Button/Button';
import Carousel from './Carousel';
import Fancybox from './Fancybox';
import { IoIosStar } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import UserApi from '../../Api/UserApi';
import { convertColor } from '../../Api/OtherFunction';
import { OrderContext } from '../../Pages/ContextOrder/OrderContext';
import { toast } from 'react-toastify';

const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
};

function ProductDetailComponent({ product }) {
    const [products, setProducts, address, setAddress] = useContext(OrderContext);
    const [option, setOption] = useState({ color: '', size: '' });
    const [quantity, setQuantity] = useState(1);

    const handleStorageOptionChange = (e, type) => {
        const value = e.target.value;
        if (type === 'size') {
            console.log(value);
            setOption({ ...option, size: value });
        }
        if (type === 'color') {
            console.log(value);
            setOption({ ...option, color: value });
        }
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        console.log('Selected quantity:', newQuantity);
    };

    const navigate = useNavigate();
    const handleBuy = () => {
        if (option.size.length == 0 || option.color.length == 0) {
            toast.warn('Vui lòng chọn đủ màu sắc và kích thước');
            return;
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
        console.log([...products]);
        navigate('/cart/checkout');
    };
    const handleAddToCart = () => {
        if (option.size.length == 0 || option.color.length == 0) {
            toast.warn('Vui lòng chọn đủ màu sắc và kích thước');
            return;
        }
        const newProduct = {
            productId: product.id,
            cost: product.cost,
            quantity: quantity,
            sizeId: Number(option.size),
            colorId: Number(option.color)
        };
        UserApi.AddToCart(newProduct).then((response) => {
            console.log(response);
            toast.success('Thêm vào giỏ hàng thành công');
        }).catch((error) => {
            console.log(error);
            toast.error('Thêm vào giỏ hàng thất bại');
        });
        // setProducts([...products, newProduct]);
        // console.log([...products]);
    };
    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <div className='wrap_detail'>
            <div className='image__container'>
                <Fancybox
                    options={{
                        Carousel: {
                            infinite: false,
                        },
                    }}
                >
                    <Carousel
                        options={{ infinite: false }}
                    >
                        {
                            product?.images?.map((image, index) => (
                                <div
                                    className="f-carousel__slide"
                                    data-fancybox="gallery"
                                    data-src={image.url}
                                    data-thumb-src={image.url}
                                    key={index}
                                >
                                    <img
                                        alt=""
                                        src={image.url}
                                        width="400"
                                        height="300"
                                    />
                                </div>
                            ))
                        }
                    </Carousel>
                </Fancybox>
            </div>
            <div className='left__container'>
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
                <div className='price__container'>
                    <p className='new__price'>{formatPrice(product.cost - product.cost * product.promotion / 100)}</p>
                    {product?.promotion && <p className='old__price'>{formatPrice(product?.cost)}</p>}
                    <p className='discount'>{product?.promotion}</p>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Phân loại</p>
                    <div className='type__box'>
                        {
                            product?.sizes?.map((size, index) => (
                                <div key={index}>
                                    <input
                                        name='size'
                                        type="radio"
                                        value={size.id}
                                        onChange={(e) => { handleStorageOptionChange(e, 'size'); }}
                                        id={`size-${index}`}
                                    />
                                    <label htmlFor={`size-${index}`}>{size.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Màu sắc</p>
                    <div className='type__box'>
                        {
                            product?.colors?.map((color, index) => (
                                <div key={index}>
                                    <input
                                        name='color'
                                        type="radio"
                                        value={color.id}
                                        onChange={(e) => { handleStorageOptionChange(e, 'color'); }}
                                        id={`color-${index}`}
                                    />
                                    <label htmlFor={`color-${index}`}>{convertColor(color.name)}</label>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className='type__container'>
                    <p className='type__title'>Số lượng</p>
                    <QuantitySelector initialQuantity={1} onQuantityChange={handleQuantityChange} />
                </div>
                <div className='button__container'>
                    <Button className='button__buy' onClick={handleBuy}>Mua ngay</Button>
                    <Button icon={<FaCartPlus />} className='button__cart' onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailComponent;
