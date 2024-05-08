import React, { useEffect } from 'react';
import styles from './ShoppingList.scss';
import classNames from 'classnames/bind';
import products from '../../components/ProductData/ProductData';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TotalMoney() {

  const product = products[0]
  const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', height: '35px' }}>
          <p style={{ marginTop: '18px' }}>Phí vận chuyển:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{}} className={cx('new__price')}>{formatPrice(product.newPrice)}</p>
        </div>
        <div style={{ display: 'flex', height: '35px' }}>
          <p style={{ marginTop: '18px' }}>Thành tiền:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{}} className={cx('new__price')}>{formatPrice(product.newPrice)}</p>
        </div>

        <div style={{ marginTop: '18px' }}>
          <button style={{ border: 'none', margin: '0px 0px 0px 0px', backgroundColor: 'rgb(226, 58, 58)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }}>Hủy đơn hàng</button>
        </div>
      </div>
    </div>
  )
}

function Product() {
  const product = products[0]
  const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0.2' }}>
          <img alt='Product' style={{ width: '170px' }} src='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png' />
        </div>
        <div style={{ flex: '0.95' }}>
          <p style={{ margin: '20px 0px 0px 20px', fontSize: '22px' }}>{product.name}</p>
          <p style={{ margin: '8px 0px 0px 20px', fontSize: '20px' }}>(Newseal)</p>
          <p style={{ margin: '36px 0px 0px 20px', fontSize: '20px' }}>x2</p>
        </div>
        <div style={{ flex: '0.55' }}>
          <div className={cx('price__container')} style={{ paddingRight: '0%', display: 'flex', paddingTop: '40%' }}>
            {product.oldPrice && <p style={{}} className={cx('old__price')}>{formatPrice(product.oldPrice)}</p>}
            <p style={{}} className={cx('new__price')}>{formatPrice(product.newPrice)}</p>
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

function Order() {

  const s = "Thanh toán khi nhận hàng"

  return (
    <div className={cx('order')}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: '1' }}>
          <p style={{ display: 'flex', flex: '0.06' }}>#1</p>
          <p style={{ display: 'flex', flex: '0.31' }}>Hình thức thanh toán: </p>
          <p style={{ display: 'flex', flex: '1', color: 'blue' }}>{s}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{}}>Trạng thái:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{ color: '#888080' }}>Chờ xác nhận</p>
        </div>
      </div>

      <hr style={{ borderTop: '2px solid #B6B6B6', width: 'auto', margin: '18px 0px 0px 0px' }} />

      <Product />
      <Product />
      <TotalMoney />
    </div>
  )
}

export default function ShoppingList() {

  const [selectedLink, setSelectedLink] = useState('all');

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heheDiv = document.getElementById('hehe');
      const distanceFromTop = heheDiv.getBoundingClientRect().top;

      if (distanceFromTop < 0) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div>
      <div className={cx('shoppingList')}>
        <div className={cx('userOrder')}>
          <Order />
          <Order />
          <Order />
          <Order />

          <div id='hehe' className={cx('order')} style={{ display: 'flex', position: isSticky ? 'sticky' : 'static', bottom: '10px'  }}>
            <div style={{ flex: '1', paddingLeft: '30px', display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '24px', marginBottom: '0px' }}>Tạm tính</p>
              <p style={{ fontSize: '20px', fontWeight: '400', lineHeight: '58px', color: '#FF0C0C' }}>50000đ</p>
            </div>

            <div style={{ flex: '0.2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button style={{ border: 'none', margin: '0px 0px 0px 0px', backgroundColor: 'rgb(226, 58, 58)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }}>Mua ngay (2)</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
