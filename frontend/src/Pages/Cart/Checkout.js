import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import RadioButton from '../../components/RadioButton/RadioButton';
import SelectAddress from '../../components/ChangeAddress/SelectAddress';
import Button from '../../components/Button/Button';

const cx = classNames.bind(styles);

// Thông tin khách hàng
const CustomerInfo = () => {
    const name = 'Nguyễn Văn A'; // Tên có sẵn
    const phone = '0912345678'; // Số điện thoại có sẵn
    const email = 'customer@example.com'; // Email có sẵn

    return (
        <div>
            <h3>Thông tin khách hàng</h3>
            <div className={cx('info-row')}>
                <div>
                    <span className={cx('label')}>Tên:</span>
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        value={name}
                        
                    />
                </div>
                <div>
                    <span className={cx('label')}>Số điện thoại:</span>
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={phone}
                        
                    />
                </div>
            </div>
            <div className={cx('info-row')}>
                <span className={cx('label')}>Email:</span>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    
                />
            </div>
        </div>
    );
};

// Địa chỉ nhận hàng
const ShippingAddress = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);

    const addressList = React.useMemo(() => [
        { address: 'Số 6, Ngạch 12/36 Phố Nguyễn Văn Trỗi, Phường Phương Liệt, Quận Thanh Xuân, Hà Nội', isDefault: true },
        { address: 'Thôn Phú Trì, Xã Kim Hoa, Huyện Mê Linh, Hà Nội', isDefault: false },
    ], []);

    useEffect(() => {
        const defaultAddress = addressList.find((address) => address.isDefault);
        if (defaultAddress) {
            setSelectedAddress(defaultAddress);
        }
    }, [addressList]);

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
        setShowPopup(true);
    };
    console.log('selectedAddress', selectedAddress);

    return (
        <div>
            <h3>Địa chỉ nhận hàng</h3>
            <input
                type="text"
                value={selectedAddress?.address || ''}
                readOnly
                style={{ cursor: 'pointer' }}
                onClick={handleShowPopup}
            />
            {showPopup && (
                <SelectAddress
                    onClose={() => setShowPopup(false)}
                    onSelectAddress={handleSelectAddress}
                    addressList={addressList}
                    selected={selectedAddress}
                />
            )}
        </div>
    );
};


// Phương thức thanh toán
const PaymentMethod = () => {
    const handlePaymentOptionChange = (option) => {
        console.log('Selected option:', option);
    };
    return (
        <div>
            <h3>Phương thức thanh toán</h3>
            <div className='payment__options'>
                <RadioButton
                    type="radio"
                    options={['Thanh toán khi nhận hàng', 'Thanh toán qua thẻ']}
                    onOptionChange={handlePaymentOptionChange}
                />
            </div>
        </div>
    );
};

// Chi tiết đơn hàng
const OrderDetails = () => {
    const items = [
        { id: 1, name: 'Sản phẩm A', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png', quantity: 2, price: 10 },
        { id: 2, name: 'Sản phẩm B', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png', quantity: 1, price: 20 },
    ];

    const shippingFee = 5;
    const discount = 10;

    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        return subtotal + shippingFee - discount;
    };

    const subtotal = calculateSubtotal();
    const total = calculateTotal();

    return (
        <div>
            <h3 >Chi tiết đơn hàng</h3>
            <table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                                    {item.name}
                                </div>
                            </td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">Tạm tính</td>
                        <td>{subtotal}</td>
                    </tr>
                    <tr>
                        <td colSpan="3">Phí vận chuyển</td>
                        <td>{shippingFee}</td>
                    </tr>
                    <tr>
                        <td colSpan="3">Giảm giá</td>
                        <td>-{discount}</td>
                    </tr>
                    <tr style={{ fontSize: '24px' }}>
                        <td colSpan="3" >Tổng cộng</td>
                        <td>{total}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

// Trang checkout
const CheckoutPage = () => {
    return (
        <div className={cx('wrap')}>
            <h2>Thanh toán</h2>
            <div className={cx('container')}>
                <div className={cx('info__container')}>
                    <CustomerInfo />
                    <ShippingAddress />
                    <PaymentMethod />
                </div>
                <div className={cx('order__container')}>
                    <OrderDetails />
                    <Button className={'button__buy'}>Thanh toán</Button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;