import React, { useContext, useEffect } from 'react';
import styles from './ShoppingList.scss';
import classNames from 'classnames/bind';
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserApi from '../../Api/UserApi';
import { OrderContext } from '../ContextOrder/OrderContext';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

export default function ShoppingList() {
  const [carts, setCarts] = useState([]);
  const [selectedLink, setSelectedLink] = useState('all');
  const [products, setProducts] = useContext(OrderContext);
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {

    setProducts([]);
    UserApi.GetCart().then((response) => {
      setCarts(response.data);
    }).catch((error) => {
      console.log(error);
    }
    );
  }, []);
  const handleRemoveFromCart = (product) => {
    if (products.length === 0) {
      UserApi.RemoveFromCart([{ productId: product.product.id, colorId: product.color.id, sizeId: product.size.id }]).then((response) => {
        if (response.status === 200) {
          console.log('Xóa thành công');
          toast.success('Xóa thành công 1 sản phẩm khỏi giỏ hàng');
          setCarts(carts.filter(item => item !== product));
        }
      }).catch((error) => {
        toast.error('Xóa thất bại');
        console.log(error);
      });
      return;
    }
    let productToDeletes = []
    for (let i = 0; i < products.length; i++) {
      productToDeletes.push({ productId: products[i].product.id, colorId: products[i].color.id, sizeId: products[i].size.id });
    }
    // console.log(productToDeletes);
    // console.log(products);
    UserApi.RemoveFromCart(productToDeletes).then((response) => {
      if (response.status === 200) {
        console.log('Xóa thành công');
        toast.success('Xóa thành công ' + products.length + ' sản phẩm khỏi giỏ hàng');
        setProducts([]);
        setCarts(carts.filter(item => !products.includes(item)));
      }
    })
    // UserApi.RemoveFromCart(productToDeletes).then((response) => {
    //   if (response.status === 200) {
    //     console.log('Xóa thành công');
    //     toast.success('Xóa thành công ' + products.length + ' sản phẩm khỏi giỏ hàng');
    //     setCarts(carts.filter(item => !products.includes(item)));
    //     setProducts([]);
    //   }
    // }).catch((error) => {
    //   toast.error('Xóa thất bại');
    //   console.log(productToDeletes);
    //   console.log(error);
    // });
  };

  const handleQuantityChange = (uniqueKey, change) => {
    const item = carts.find(item => getItemUniqueKey(item) === uniqueKey);
    if (item) {
      if (item.quantity + change <= 0) {
        handleRemoveFromCart(item);
      } else {

        // updateCart({ id: item.id, quantity: item.quantity + change });
        let newCarts = [...carts];
        const index = newCarts.findIndex(item => getItemUniqueKey(item) === uniqueKey);
        if (index !== -1) {
          newCarts[index] = { ...newCarts[index], quantity: newCarts[index].quantity + change };
          setCarts(newCarts);
          setProducts(
            products.map(product => {
              if (getItemUniqueKey(product) === uniqueKey) {
                return { ...product, quantity: product.quantity + change };
              }
              return product;
            }
            ))
        }
      }
    }
  };

  const handleSelected = (item) => {
    const uniqueKey = getItemUniqueKey(item);
    const index = products.findIndex(product => getItemUniqueKey(product) === uniqueKey);
    if (index === -1) {
      setProducts([...products, item]);
      console.log([...products, item]);
    } else {
      setProducts(products.filter(product => getItemUniqueKey(product) !== uniqueKey));
      console.log(products.filter(product => getItemUniqueKey(product) !== uniqueKey));
    }
  };

  const getItemUniqueKey = (item) => {
    return `${item.product.id}_${item.color.id}_${item.size.id}`;
  };
  const handleBuy = () => {
    if (products.length === 0) {
      toast.warn('Vui lòng chọn sản phẩm để mua');
      return;
    }
    let productLists = [];
    for (let i = 0; i < products.length; i++) {
      productLists.push({
        id: products[i].product.id,
        name: products[i].product.name,
        cost: products[i].product.cost,
        promotion: products[i].product.promotion,
        quantity: products[i].quantity,
        size: products[i].size,
        color: products[i].color,
        images: products[i].product.images
      });
    }
    setProducts(productLists);
    navigate('/cart/checkout');
  }
  return (
    <div>
      <div className={cx('shoppingList')}>
        <div className={cx('cart-items')}>
          {carts.map((item) => {
            const uniqueKey1 = getItemUniqueKey(item);
            return (
              <div key={item?.product?.id + item?.color?.id + item?.size?.id} className={cx("cart-item")}>

                <input type="checkbox" onChange={() => handleSelected(item)} style={{ width: '20px', height: '20px', marginRight: '20px', cursor: 'pointer' }}
                />
                <div className={cx('image-wrap')}>
                  <img src={item.product?.images[0]?.url} alt={item?.product?.name} className={cx('image')} />
                </div>
                <div className={cx("cart-item-details")}>
                  <h2>{item.product?.name}</h2>
                  <p>Màu sắc: {item.color?.name || 'N/A'}</p>
                  <p>Kích thước: {item.size?.name || 'N/A'}</p>
                  <p>Giá: <span style={{ color: 'blue' }}>{item.product?.cost?.toLocaleString()}</span></p>
                  <p>Giảm:  <span style={{ color: 'red' }}>{(item.product?.promotion / 100 * item.product?.cost).toLocaleString()}</span></p>
                </div>

                <div className={cx("price-details")}>
                  <div className={cx('quantity-wrap')}>
                    <div className={cx("quantity")}>

                      <button onClick={() => handleQuantityChange(uniqueKey1, -1)}>-</button>
                      <button>{item.quantity}</button>
                      <button onClick={() => handleQuantityChange(uniqueKey1, 1)}>+</button>

                    </div>

                    <MdDeleteForever style={{ color: 'red', cursor: 'pointer', fontSize: '25px', paddingLeft: '20px' }} onClick={() => handleRemoveFromCart(item)} />
                  </div>

                  <div className="total-price">Tổng tiền: {((item.product?.cost - item.product?.promotion / 100 * item.product?.cost) * item.quantity).toLocaleString()}</div>
                </div>
              </div>

            )
          })
          }


          <div style={{ flex: '0.2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button style={{ border: 'none', margin: '0px 0px 0px 0px', backgroundColor: 'blue', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px', marginRight: '20px' }}>Lưu</button>
            <button style={{ border: 'none', margin: '0px 0px 0px 0px', backgroundColor: 'rgb(226, 58, 58)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }} onClick={handleBuy}>Mua ngay ({products.length})</button>
          </div>
        </div>
      </div>
    </div >
  )
}
