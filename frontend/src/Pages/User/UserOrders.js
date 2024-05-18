import React, { useEffect } from 'react';
import styles from './User.module.scss';
import classNames from 'classnames/bind';
import products from '../../components/ProductData/ProductData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UserApi from '../../Api/UserApi';

const cx = classNames.bind(styles);

function TotalMoney({ order }) {

  const product = products[0]
  const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
  };
  //test 2

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', height: '35px' }}>
          <p style={{ marginTop: '18px' }}>Phí vận chuyển:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{}} className={cx('new__price')}>{formatPrice(order.deliveryCost)}</p>
        </div>
        <div style={{ display: 'flex', height: '35px' }}>
          <p style={{ marginTop: '18px' }}>Thành tiền:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{}} className={cx('new__price')}>{formatPrice(order.totalCost)}</p>
        </div>

        <div style={{ marginTop: '18px' }}>
          <button style={{ border: 'none', margin: '0px 0px 0px 0px', backgroundColor: 'rgb(226, 58, 58)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }}>Hủy đơn hàng</button>
        </div>
      </div>
    </div>
  )
}

function Product({ product }) {
  const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0.2' }}>
          <img alt='Product' style={{ width: '170px' }} src={product?.product?.images[0]?.url || 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png'} />
        </div>
        <div style={{ flex: '0.95' }}>
          <p style={{ margin: '20px 0px 0px 20px', fontSize: '22px' }}>{product?.product?.name}</p>
          <p style={{ margin: '8px 0px 0px 20px', fontSize: '20px' }}>(Newseal)</p>
          <p style={{ margin: '36px 0px 0px 20px', fontSize: '20px' }}>x{product?.quantity}</p>
        </div>
        <div style={{ flex: '0.55' }}>
          <div className={cx('price__container')} style={{ paddingRight: '0%', display: 'flex', paddingTop: '40%' }}>
            {product.oldPrice && <p style={{}} className={cx('old__price')}>{formatPrice(product.oldPrice)}</p>}
            <p style={{}} className={cx('new__price')}>{formatPrice(product?.cost)}</p>
          </div>
        </div>
      </div>
      <div style={{ margin: '15px 0px 0px 0px' }}>
        <button style={{ border: 'none', margin: '0px 0px 0px 520px', backgroundColor: 'rgb(226, 58, 58)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }}>Đánh giá</button>
        <button style={{ border: 'none', margin: '0px 0px 0px 10px', backgroundColor: 'rgb(81, 191, 228)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }}>Bình luận</button>
      </div>

      <hr style={{ borderTop: '2px solid #B6B6B6', width: 'auto', margin: '18px 0px 0px 0px' }} />
    </div>
  )
}

function Order({ order }) {

  const s = "Thanh toán khi nhận hàng"
  const t = "Thanh toán online"
  return (
    <div className={cx('order')}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: '1' }}>
          <p style={{ display: 'flex', flex: '0.06', color: 'green' }}>#{order.id}</p>
          <p style={{ display: 'flex', flex: '0.31' }}>Hình thức thanh toán: </p>
          <p style={{ display: 'flex', flex: '1', color: 'blue' }}>{order.paymentStatus ? s : t}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{}}>Trạng thái:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{ color: '#888080' }}>{order.status == null ? 'Chờ xác nhận' : order.status == 'CONFIRMED' ? 'Đã xác nhận' : 'Thành công'}</p>
        </div>
      </div>

      <hr style={{ borderTop: '2px solid #B6B6B6', width: 'auto', margin: '18px 0px 0px 0px' }} />
      {
        order.products.map((product, index) => {
          return (
            <Product key={index} product={product} />
          )
        })
      }
      <TotalMoney order={order} />
    </div>
  )
}

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedLink, setSelectedLink] = useState('all');
  useEffect(() => {
    UserApi.GetOrders().then(res => {
      setOrders(res.data)
    }
    )
  }, [])
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className={cx('userOrder')}>
      {/* Title */}
      <div className={cx('title')}>
        <Link
          style={{ textDecoration: selectedLink === 'all' ? 'underline' : 'none', color: selectedLink === 'all' ? '#D37B29' : 'black', fontSize: '22px' }}
          onClick={() => handleLinkClick('all')}
        >
          Tất cả
        </Link>
        <Link
          style={{ textDecoration: selectedLink === 'unconfirmed' ? 'underline' : 'none', color: selectedLink === 'unconfirmed' ? '#D37B29' : 'black', fontSize: '22px' }}
          onClick={() => handleLinkClick('unconfirmed')}
        >
          Chưa xác nhận
        </Link>
        <Link
          style={{ textDecoration: selectedLink === 'shipping' ? 'underline' : 'none', color: selectedLink === 'shipping' ? '#D37B29' : 'black', fontSize: '22px' }}
          onClick={() => handleLinkClick('shipping')}
        >
          Đang vận chuyển
        </Link>
        <Link
          style={{ textDecoration: selectedLink === 'success' ? 'underline' : 'none', color: selectedLink === 'success' ? '#D37B29' : 'black', fontSize: '22px' }}
          onClick={() => handleLinkClick('success')}
        >
          Thành công
        </Link>
        <Link
          style={{ textDecoration: selectedLink === 'cancelled' ? 'underline' : 'none', color: selectedLink === 'cancelled' ? '#D37B29' : 'black', fontSize: '22px' }}
          onClick={() => handleLinkClick('cancelled')}
        >
          Đã hủy
        </Link>
      </div>

      <hr style={{ border: '0.1px solid #B6B6B6', width: 'auto', paddingLeft: '4px', margin: '22px 0px 0px 12px' }} />
      {
        orders.map((order, index) => {
          return (
            <Order key={index} order={order} />
          )
        })
      }
    </div>
  )
}
