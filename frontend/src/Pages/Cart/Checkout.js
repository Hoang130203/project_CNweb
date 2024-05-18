import React, { useState, useEffect, useContext } from 'react';

import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import RadioButton from '../../components/RadioButton/RadioButton';
import SelectAddress from '../../components/ChangeAddress/SelectAddress';
import Button from '../../components/Button/Button';
import { OrderContext } from '../ContextOrder/OrderContext';
import { convertColor } from '../../Api/OtherFunction';
import { motion } from "framer-motion"
import UserApi from '../../Api/UserApi';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

// Thông tin khách hàng
const CustomerInfo = () => {
    const user = JSON.parse(localStorage.getItem('w15store_user'));
    const name = user?.name; // Tên có sẵn
    const phone = user?.phone; // Số điện thoại có sẵn
    const email = user?.email; // Email có sẵn

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
    const [selectedAddress, setSelectedAddress] = useState(
        JSON.parse(localStorage.getItem('w15store_user'))?.address
    );

    return (
        <div>
            <h3>Địa chỉ nhận hàng</h3>
            <input
                type="text"
                value={selectedAddress}
                readOnly
                style={{ cursor: 'pointer' }}
            />
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
    const [products, setProducts, address, setAddress] = useContext(OrderContext);
    // const [items] = [
    //     { id: 1, name: 'Sản phẩm A', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png', quantity: 2, price: 10 },
    //     { id: 2, name: 'Sản phẩm B', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png', quantity: 1, price: 20 },
    // ];

    const shippingFee = 50000;

    const calculateSubtotal = () => {
        return products?.reduce((total, item) => total + item.cost * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        console.log(products)
        return subtotal + shippingFee - discount;

    };
    const calculateDiscount = () => {
        return products?.reduce((total, item) => total + item.promotion * item.quantity / 100 * item.cost, 0);
    };
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const total = calculateTotal();


    return (
        <div>
            <h3 >Chi tiết đơn hàng</h3>
            <table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Loại</th>
                        <th>Màu</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products?.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={item?.images[0]?.url} alt={item?.name} style={{ width: '50px', marginRight: '10px' }} />
                                    {item?.name}
                                </div>
                            </td>
                            <td>{item?.cost?.toLocaleString()}</td>
                            <td>{item?.size?.name}</td>
                            <td>{convertColor(item?.color?.name)}</td>
                            <td>{item?.quantity}</td>
                            <td>{((item?.cost) * (item?.quantity)).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">Tạm tính</td>
                        <td>{subtotal?.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td colSpan="3">Phí vận chuyển</td>
                        <td>{shippingFee?.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td colSpan="3">Giảm giá</td>
                        <td>-{discount?.toLocaleString()}</td>
                    </tr>
                    <tr style={{ fontSize: '24px' }}>
                        <td colSpan="3" >Tổng cộng</td>
                        <td>{total?.toLocaleString()}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

// Trang checkout
const CheckoutPage = () => {
    const [products, setProducts, address, setAddress] = useContext(OrderContext);
    const [orderId, setOrderId] = useState(null)
    const [show, setShow] = useState(false);
    const shippingFee = 50000;

    const calculateSubtotal = () => {
        return products?.reduce((total, item) => total + item.cost * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        console.log(products)
        return subtotal + shippingFee - discount;

    };
    const calculateDiscount = () => {
        return products?.reduce((total, item) => total + item.promotion * item.quantity / 100 * item.cost, 0);
    };
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const total = calculateTotal();
    const handlePay = async (method) => {
        console.log('Thanh toán qua:', method);
        await UserApi.PostOrder(
            {
                postCarts: products.map((item) => {
                    return {
                        productId: item.id,
                        cost: item.cost - item.promotion / 100 * item.cost,
                        quantity: item.quantity,
                        sizeId: item.size.id,
                        colorId: item.color.id
                    }
                }),
                payment: 0,
                deliveryCost: shippingFee,
                totalCost: total,
            }
        ).then((response) => {
            if (response.status === 200) {
                console.log(response.data?.infoMessage);
                if (response.data?.infoMessage?.includes('thành công')) {
                    toast.success(response.data?.infoMessage?.split('_')[0]);
                    setProducts([]);
                    setShow(true);
                    setOrderId(response.data?.infoMessage?.split('_')[1]);
                } else {
                    toast.error(response.data?.infoMessage);
                }

            }
        }).catch((error) => {
            console.log('Thanh toán thất bại');
            console.log(error);
            toast.error(error.response.data.message);
        });

    }
    const handlePaymoney = async (method) => {
        console.log('Thanh toán qua:', method);
        const order = await UserApi.GetOrder(orderId)
            .then((response) => {
                console.log(response.data);
                return response.data;
            }).catch((error) => {
                console.log(error);
            });
        if (method === 'vnpay') {
            await UserApi.VnPay(order.totalCost, order.id).then((response) => {
                console.log(response);
                console.log('Thanh toán thành công');
                window.location.href = response.data;
            }).catch((error) => {
                console.log('Thanh toán thất bại');
                console.log(error);
                toast.error(error.response.data.message);
            });
        }
    }
    return (
        <div className={cx('wrap')}>
            <motion.div animate={{ opacity: show ? 1 : 0, transition: { duration: 0.5 } }}
            >
                {show && <div className={cx('pop-up')} onClick={() => { setShow(false) }}>
                    <div className={cx('pop-up__content')} onClick={(e) => { e.stopPropagation() }}>
                        <h1>Thanh toán qua</h1>
                        <div className={cx('payment__methods')}>
                            <div className={cx('payment__method')} onClick={() => { handlePaymoney('vnpay') }}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABGlBMVEX////tHCQAWqkAW6rsAAAAV6cAn9wAUqYAod0AVKWludftFyAASKIAS6T6y8wAVKf83t7r8PcATqUqabD85+ftCBXV3uzzg4buOj8AlNMAmtr0jY/Bz+P71tftEx34+/2Qqc8AabP98PD3FRCbzuwAcblaUJTX6/cAgsUAYa4AjM2x2PDG4vQAldgAeb/5wsN5v+f4uLmyw93q9fun0+5IreDwUlbxYWTydnlAdLX5xMXL5fVkt+OBw+hErOD3rrD1nqDuLDL2pKbvR0zxZ2rtJi1jir8AP6BTf7p0lsX0k5WFocpWYKBPjMP3CADwWFx9SIRHO4q3Nl60EUl2ap5LUpiGdaHfLj5QbqtqTY2ZQHPNLUrN2OkANJxpzO3pAAAPG0lEQVR4nO2dCXfaOhbHhTfsAFlonIU2JiGkBExoWqBNG5KmTZtu89o3b+bNmvn+X2N0JUuWZLOEsB/9z2kKkjH6+V7dK8kLCGlpaWlpaWlpaWlpaWlpaWlpaWlpaWlp9dPO2tqz8rwbMUU9MwvZbDH/Y97tmJoO87YByj6Zd0umpMO8EWljNRFjwBVFFAFXElEGXEFEFXDlEJOAK4aYBrhSiOmAK4TYD3BlEPsDPgjx3fuX21Ns5SM0CHB0xKcW6E1lum0dS4MBR0W8tTIg31o8Mw4DHA3xtZ+hyi0c4nDAURDfMMDFQxwFcDjihZXJLChiKqBte5FseyTEpyJgYFl7ixNuUgBtzzw53S85WKX90xPTs4ci3oiA1uuD2bV/qJKAttHad12Hy3X3W9SQ/RHfS4A3CG2/fL8glAlA2zgleO5+4xSrsU/euKeGPQDxnQT4HlV+QV78sAh9MQHotQCodHpk4w4I8uyjUwcoW15fxAMVMOPT3jh/RBXQNvfBeieeLZV6J9iS7r5ppyNuSoAvUSUXLEpETQAeQb9T+EjFxgnEnaNUxE0rJwMGwaIkjQTgCbZUg2cH6qX8TQNXpiEmAP0gfj9fxKQFMQPpbcQzj1oQaVpHzKIbLVydDDcy4AsZcL6IhwXFFeu4C55EOHbLoQkD/20cUWrvxC0lkoYKuO3nMpnFQEymCQHQ8EquC4j0z36dlNsGMydHlAHfoW1LAZwfYsKCXsNxTr3YYxutOozZ6q0GMMY1EqIMuJ4GOC/EBCB0wn0Bg8cYPII7hQCUhqgCbqYBzgcxAWh4OBGaaiGrq+NUEePbLNyMCDgPxJSxKE4Up9By20wkQ2DajxGxA5Ok8fZAAjzoDzh7xJ3kbAJMaFNSTuLZ9bod5QoB0cPDcoxoPrdEgoGAM0d8mzRTnZkQJwiPmg0mGDCtoIwxIpgbj26eHwsAGPBgEOCMEcspE0Kc/urw/2mUMfD4jeQK/M+pc8QGR3T/ogAOtOCsEXcSYQactASt97ChNoxoeFM6bbVgWkHGagQxiqg49f92nBPaPtSCM0bcShJi5wQntU8iE8LwprVBJk+tFET7XxLgpjx9WgDEJOGRS8jsBh154uzvnkQBxztJIJrPxwGcJeK3DdWEJy7phthZiZFw3IkzvK0gbphikAHA9dEAZ4hYTgxocKAh9qIRlcUdmtsTiGMDzhBRTYgQQoHAdJ0WdVaHxJtGI4moBJnthwDODxETOtQ73YiQpD7cO6UUSLb9qgC+ewggfGRG66gyYj8b8izvMUTz+U8B0N9GLx4GmMn4b2ZDKCP27Yc8y0eIUpAJxgHEw4NZLYaLiBBLj4CjxGMpnRBKWR73RRmwgl4+HBAWAuaAGOdDMv7GWSOa7guIOPX/9lMADMYDhMWqOSDakXueuNGYJm2s1vpN6INBbkxAmEjOAREbjYQUm41L1SxvKEEmyFTkcxUPIJwdoIAIwVSeWyQQ5SDzCMCbWRLGiGx+aOD5IQs+EqI0Hww+V9DH8QD9XzMFjBH5HL/lOoksD4hfxSDzGY0N+HrGgBwReFrRtEJOgaS2JA7V/A/KCdGFBuSIOBXStTZPyvI08xvPJwR4OwdAhgiz+kYyy5OBgDQf9PeWDZAhwqy3pSDaRydkLCoEGQD8vmSA3FGd5EDGmCTg3twAI0Sy+qRkeSMF8OkSAjLElIGMAoj9bHcpAfsjmr+vCCBCm39NZvmGbf4hAr4ZH/DDvPmw1v9mm6aU5R3375n4YryM9Ua5dm10BYsAiBF//vGnGVnRNHH2/8c/j8WTS5+WHRAjWscf/vj9XzhpHP357//89/hYvOQAAN+MCfh53mRc61Yu8I9//vx5fHwsX1FBAf0+CMMAF+cqxf5Ln9YFQr/GBMwsEGBfRAB8vRKAfRCt3fEBcwsGmIr4GMBg4QBTEAHwdkxAfwEBE4iPAMwtJqCM6MP67diA8766tK/WLT9qItzgU/mwcoAIHXwi9y8Fu5sIvbSC4TRpgHO/PniItg8OoBMd3I43Ult8QKLNm70xDbgMgC/ATdWrYR8AuDlvgOF60On5ZQR8DOKSAI6PuDSAYyNaC3LD0ygaC3GZAMdCXC7AMRBneZZ+Mnog4vIBPhBxGQEfhLicgA9AtN7Nu6njakTE5QUcEXF216tNQyMgzvBytaloKOKyAw5FXH7AIYjW+3k3bxJa739bzGoAIrQZpC8rBsua6FP0JsWMOet2QVe2x9L6B2XxLbCCFYgxkl68tqzo/HDOt6y9VeMDVV7u3vqw1rh38X7hF0W1tLS0tLS0VkWVi10uperF7lOiFyje5qny6WgTLISeral6dS/+vsArsSYquxfKnkm7Fiq2Hof4yfIjqWe9KrQGT34+xtvcyNt8j2pghlR+UsgqKubv4uZtfYkrvjD0uzwvy0sk92zrwtvHAQpPU/O/K1VPyYQPbpfb41MGdbJHayz60bphqvLyh3zbbxu8OLvGCuPPeF+lPb+1SalRfPTvTNyy1ucySk0F4H1w3vgwqDdbk5oguuPsMJsgNM3iHdv2VVxt8EdJbeV5YUHy0+h45GXnHUfxjYKJM18+N9oun78HymX1n3OxYdcYguF5sTmLh0lCs7DDdnBY5Ni2uOOvxIbZb48GRCh2UyWOgH1yPn/JtpIj0l4KoVH/dlePcVgH++HFhBvxD4BE7gg4wq+CUNsa5gQA0QV/vq8vV3z3ObX47EN5aTCVEHxwrcBpIjtkhW5qZGOWAi8Xgg3lzu+gCSheCFTCSCbHPVd+uqM4s+1LKPTKAqm9L5qCinH/esWPhc3j5hrZOHs4CUCEcmwByb8Qi+GhKyz6SIQ58er6/oTIZLYpEkuQ0GGzMu8u3sdXHmSLUaLcKsjAj9R3HkakG6khurAMIhFKj3YYQMiNSNtdxHD23ROGmI+zQJn7L8sNxEeNwiNzPdd27KbiGTAoZaMAmVC843oA4Q5zyywQPoN32Wc83sYpETswTxnUtNRHC6/QpMRTov8pLoSnkuTY7SwKoZBYBhCWWbuJDe880iN5/rPFZ2R+430WYgvdZkPw48cqfvqB4KafwElvJELxmeMs8Q8gRCyCkKhSiCzEk0NBjJN8aGPUmY9uTA5QSIlCJrDEqEkIc8I96AG7p3UUQkgCxEkB9RXz3Q3xN7F2uJ9m1+gYIH8/SUKeEgMeQ8CuOT5+IYSWeGOMtTuUcKsQm4U4qVEUuWUjxUObLNlLdrK/CRY/jYt732vcN/2PCmGcWLi5BxCyBFhci/qkR1I/H4AXpSHnEz60SfTSSSjDWs7OhFUkJ+WE0thmewjhNy9uLPFN2vN45vekULJVEAnzk0oUTDfcTaPHGnz0hb4WE4oP9KCJvz9hmZLYRWgsjKPZyNpISYlIHNpQs09W26qbQsP9+MwmJ4y7bJT4+xNSE2ZtACROykLLYVpKRGw2QY6KPFWciF7zlPgxJoqngjGhMBsmiX/AyNswvGz0I4Kkhg1RuD8qo7IyN+LEBjOCeEqk8z8YyAXCczgEworYFQ/6EZbvvmSNJ3drkR++JU56/4zonic/pbfxjJGfPKCYEiGAkGmFcPpdIBQvSsDzrX6E0s6jyV4xEp8tbRzOkJD3LxjHHChOKhGKz4UIft0OyPhca2nLG6Y6qy9Pl5CnRBiLwrQiEJ8NJxGKtxsGkGaGEsq5TlBRHLhMmZAsuFA33aQjNnEqLxOiQL4kYRghddKioLRZ4tQJeUr0v6/LPElCdTI1hJCkh8L9TiwzNSVOmbASu+kFTgjBJ7FSIVSe5DWMEGa9cmY4ZCO3rDgHnDIh+sUXTuGFfLWkSkjmVqMSkvwnZ/d4liiCT5tQfoyj/GS4BCH6EIxMSJxUSX089ojl0yYUJw7KolQKoZT4BxNCglfnCvFixmFcOHVC8UGHyjXLSULx2auDCXcKZnJdkMdNw4gLC9MmFO9ZVh5fmEIoPC9pMOEPiCqJkSZfcxNS4vQJ0WeeMWQnRcn8gYSHmSRX9cXNyBJpQf0qvlwjxJoZELKfKEycRCOrcSo2+qRszac/4lCFno8pqOfINvjglJ+5me7cgumG3oqunMGIlqASl8J+pFtHhDu8hYbHgbbo+KWonCQTl/jzUU6MT9EY9hR/nL7y1LJ85fzStsWk3hxZuYDbgSlhuZDn+sJ64hYrlI2Iiwux/kdy5Y8vcUm+jqapFxfKmcTtA6aU2z9fXnymgbcsi9YmCqi2FCXLpmhELS0tLS2t6ai96tmrXBrjQ7Vw4u0Y+pWdsI16l4M2ueymFDZ77Xb65k6//XSb2O496VPjHKQH6tytVq+HEPbaV4mycq/WSdu27Lql6z77qYFXy7s6G62Vj1CbfsX5ZVit4f+b1TDqW/gVakKr2qgcVuFVu1olhx//j48HLoSjUqt2oBBvQS3XroZthxaXa7iY+STewAXCZrVTI2+jilK72sHfWO7gr7jEH6v28Yvx1exRQrcTli5RrxdWqd/gV1eohL/7vIlK1bB3ji6dTgdAy2dheI6PTCe8rqLQDTtnbeRUmz1imxou7rqocx12Sldh9zw8p/akG3QvURiGziW6vgrPqeef4e8p4X1Ww+7VdZPubTqEuO0YCQzaoxhQSgmb0PYz1K3RT9CqKrhoiRRiq3RR5G9X2DTYhg7+YNglkQj2gS57ZOse2UXzquyw7cnf63anCi/bUF+tTocQ+mF4VXajRqK2ywmx/5LmXbODG56dtxHxMozdBkLYuu2wI4XbX6IgsBOAJburuUBYve66VVJB0Alht02OFz2InUkTRmEyIoRWXjVjQvI2IuzG7hOelRkhsSE6P3PdmkIYCoSoRzbo1ZpdpUIi7E2DEJ3hNl1GhOishpMcIYFXqIsxnHYNt+XSQVfYWaGqjP90a81r8EN0TQjbDsv9IXaJag/1OpAayAEjIDWXzIQxIa6/Um143b7Ee8N7nIoNUbtbKvUQBNJmB9WuS26TFONXuNndkoPbGjolMOC5U4Jvb187JQxbxYVlhP0VBw/k9Loudfcrp9Qr41RScqr4L1ARENjgHF3VcEjDG5KKLqkAFwKnJ19xRfe2gAohFpUGDOGIo08/9Y2vWmNIvdNsdgaNTmCD6gyGL9MTztSdgaPwoRtoaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpja//A5CyoVvyMfctAAAAAElFTkSuQmCC" alt="VNPAY" />
                            </div>

                        </div>
                    </div>
                </div>
                }
            </motion.div>
            <h2>Thanh toán</h2>
            <div className={cx('container')}>
                <div className={cx('info__container')}>
                    <CustomerInfo />
                    <ShippingAddress />
                    <PaymentMethod />
                </div>
                <div className={cx('order__container')}>
                    <div>
                        <h3 >Chi tiết đơn hàng</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Loại</th>
                                    <th>Màu</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products?.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={item?.images[0]?.url} alt={item?.name} style={{ width: '50px', marginRight: '10px' }} />
                                                {item?.name}
                                            </div>
                                        </td>
                                        <td>{item?.cost?.toLocaleString()}</td>
                                        <td>{item?.size?.name}</td>
                                        <td>{convertColor(item?.color?.name)}</td>
                                        <td>{item?.quantity}</td>
                                        <td>{((item?.cost) * (item?.quantity)).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3">Tạm tính</td>
                                    <td>{subtotal?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3">Phí vận chuyển</td>
                                    <td>{shippingFee?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3">Giảm giá</td>
                                    <td>-{discount?.toLocaleString()}</td>
                                </tr>
                                <tr style={{ fontSize: '24px' }}>
                                    <td colSpan="3" >Tổng cộng</td>
                                    <td>{total?.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <Button className={'button__buy'} onClick={() => { handlePay() }}>Thanh toán</Button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;