import React, { useContext, useEffect } from 'react';
import styles from './User.module.scss';
import classNames from 'classnames/bind';
import products from '../../components/ProductData/ProductData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UserApi from '../../Api/UserApi';
import styles1 from '../Cart/Checkout.module.scss'
import { toast } from 'react-toastify';
import { motion } from "framer-motion"
import { MdOutlineStar } from "react-icons/md";
import { LoadingContext } from '../..';
import IssueInvoice from "../Admin/component/IssueInvoice";


const cx = classNames.bind(styles);
const cx1 = classNames.bind(styles1);

function CommentPopup({ product, setShow }) {
  const [comment, setComment] = useState('');
  const [oldComments, setOldComments] = useState([]);
  const [picture, setPicture] = useState('');
  const [file, setFile] = useState();
  useEffect(() => {
    UserApi.GetComments(product.product?.id).then((response) => {
      console.log(response.data);
      setOldComments(response.data);
    }).catch((error) => {
      console.log('Lấy bình luận thất bại hoặc do chưa có bình luận nào');
      console.log(error);
    });
  }, [product]);
  const handleSubmit = async () => {
    if (comment == '') {
      toast.error('Vui lòng nhập bình luận');
      return;
    }
    let picture = '';
    if (file) {
      await UserApi.PostImage(file).then((response) => {
        console.log('Upload ảnh thành công');
        console.log(response.data);
        picture = response.data?.url;
      }).catch((error) => {
        console.log('Upload ảnh thất bại');
        console.log(error);
        toast.error('Upload ảnh thất bại');
      }
      );
    }
    await UserApi.PostComment(product.product?.id, comment, picture).then((response) => {
      console.log('Bình luận thành công');
      toast.success('Bình luận thành công');
      setShow();
    }).catch((error) => {
      console.log('Bình luận thất bại');
      console.log(error);
      toast.error('Bình luận thất bại');
    });
  }
  const handleClose = () => {
    setShow();
  }
  return (
    <div className={cx('comment__popup')} onClick={() => { handleClose() }}>
      <div className={cx('comment__popup__content')} onClick={(e) => { e.stopPropagation() }}>
        <h1>Các bình luận trước</h1>
        <div className={cx('comment__popup__comments')}>
          {oldComments?.map((comment, index) => (
            <div key={index} className={cx('comment__popup__comment')}>
              <p>{comment.content}</p>
              <p>{comment.time}</p>
              {comment.picture && <img src={comment.picture} alt='comment' style={{ height: '100px' }} />}
            </div>
          ))}
        </div>
        <h1>Bình luận sản phẩm {product.product?.name}</h1>
        <textarea className={cx('comment__popup__textarea')} placeholder='Nhập bình luận' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <input type='file' onChange={(e) => { if (!e.target.files[0]) { setFile(null); setPicture(null); return; } setFile(e.target.files[0]); setPicture(URL.createObjectURL(e.target.files[0])) }} />
        <div>
          {picture && <img src={picture} alt='preview' style={{ height: '100px' }} />}
        </div>
        <button className={cx('comment__popup__button__submit')} onClick={() => { handleSubmit() }}>Bình luận</button>
      </div>
    </div>
  )
}


function RatePopup({ product, setShow }) {
  const [rate, setRate] = useState(0);
  useEffect(() => {
    UserApi.GetRate(product.product?.id).then((response) => {
      console.log(response.data);
      setRate(response.data.rate);
    }).catch((error) => {
      console.log('Lấy đánh giá thất bại hoặc do chưa có đánh giá nào');
      console.log(error);
    });
  }, [product]);
  const handleSubmit = async () => {
    if (rate == 0) {
      toast.error('Vui lòng chọn số sao');
      return;
    }
    await UserApi.PostRate(product.product?.id, rate).then((response) => {
      console.log('Đánh giá thành công');
      toast.success('Đánh giá thành công');
      setShow();
    }).catch((error) => {
      console.log('Đánh giá thất bại');
      console.log(error);
      toast.error('Đánh giá thất bại');
    });
  }
  const handleClose = () => {
    setShow();
  }
  return (
    <div className={cx('rate__popup')} onClick={() => { handleClose() }}>
      <div className={cx('rate__popup__content')} onClick={(e) => { e.stopPropagation() }}>
        <h1>Đánh giá sản phẩm {product.product?.name}</h1>
        <div className={cx('rate__popup__stars')}>
          {rate} sao
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className={cx('rate__popup__star', { 'active': star <= rate })} onClick={() => setRate(star)}>
              <MdOutlineStar className={cx('.rate__popup__star__icon ')} />
            </div>
          ))}
        </div>
        <button className={cx('rate__popup__button__submit')} onClick={() => { handleSubmit() }}>Đánh giá</button>
      </div>
    </div>
  )
}
function TotalMoney({ order }) {
  const [loading, setLoading] = useContext(LoadingContext);
  const product = products[0]
  const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formattedPrice;
  };
  //test 2
  const handleCancel = async () => {
    if (order.status == 'CANCELLED') {
      toast.error('Đơn hàng đã bị hủy');
      return;
    }
    if (order.status == 'SUCCESS') {
      toast.error('Đơn hàng đã hoàn thành');
      return;
    }
    if (order.paymentStatus == true) {
      toast.error('Đơn hàng đã thanh toán không thể hủy');
      return;
    }

    setLoading(true);
    await UserApi.CanccelOrder(order.id).then((response) => {

      toast.success('Hủy đơn hàng thành công');
      window.location.reload();
    }).catch((error) => {
      console.log('Hủy đơn hàng thất bại');
      console.log(error);
      toast.error('Hủy đơn hàng thất bại');
    }).finally(() => {
      setLoading(false);
    });
  }
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', height: '35px' }}>
          <p style={{}}>Phí vận chuyển:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{}} className={cx('new__price')}>{formatPrice(order.deliveryCost)}</p>
        </div>
        <div style={{ display: 'flex', height: '35px' }}>
          <p style={{}}>Thành tiền:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{}} className={cx('new__price')}>{formatPrice(order.totalCost)}</p>
        </div>

        <div style={{ marginTop: '18px' }}>
          {order.status == 'CANCELLED' ? <span style={{ color: 'red' }}>Đã hủy</span> : order.status == 'SUCCESS' ? <span style={{ color: 'green' }}>Đã hoàn thành</span> : <button style={{ border: 'none', margin: '0px 0px 0px 0px', backgroundColor: 'rgb(226, 58, 58)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }} onClick={handleCancel}> Hủy đơn hàng</button>}
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
  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  return (
    <div>
      {
        show && <RatePopup product={product} setShow={() => setShow(false)} />
      }
      {
        showComment && <CommentPopup product={product} setShow={() => setShowComment(false)} />
      }
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
        <button style={{ border: 'none', margin: '0px 0px 0px 600px', backgroundColor: 'rgb(226, 58, 58)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }} onClick={() => { setShow(true) }}>Đánh giá</button>
        <button style={{ border: 'none', margin: '0px 0px 0px 10px', backgroundColor: 'rgb(81, 191, 228)', color: 'white', borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px' }} onClick={() => { setShowComment(true) }}>Bình luận</button>
      </div>

      <hr style={{ borderTop: '2px solid #B6B6B6', width: 'auto', margin: '18px 0px 0px 0px' }} />
    </div>
  )
}

function Order({ order }) {
  const [loading, setLoading] = useContext(LoadingContext);
  const [show, setShow] = useState(false);
  const s = "Thanh toán khi nhận hàng"
  const t = "Thanh toán online"
  const handlePaymoney = async (method) => {
    setLoading(true);
    if (method === 'vnpay') {
      await UserApi.VnPay(order.totalCost, order.id).then((response) => {
        console.log(response);
        console.log('Thanh toán thành công');
        window.location.href = response.data;
      }).catch((error) => {
        console.log('Thanh toán thất bại');
        console.log(error);
        toast.error(error.response.data.message);
      }).finally(() => {
        setLoading(false);
      });
    }
    if (method === 'payos') {
      await UserApi.PayOs(order.totalCost, order.id).then((response) => {
        console.log(response);
        console.log('Thanh toán thành công');
        window.location.href = response.data;
      }).catch((error) => {
        console.log('Thanh toán thất bại');
        console.log(error);
        toast.error(error.response.data.message);
      }).finally(() => {
        setLoading(false);
      });
    }
  }
  console.log(order);
  return (
    <div className={cx1('order')} style={{ margin: '50px 0px' }}>
      <motion.div animate={{ opacity: show ? 1 : 0, transition: { duration: 0.5 } }}
      >
        {show && <div className={cx1('pop-up')} onClick={() => { setShow(false) }}>
          <div className={cx1('pop-up__content')} onClick={(e) => { e.stopPropagation() }}>
            <h1>Thanh toán qua</h1>
            <div className={cx1('payment__methods')}>
              <div className={cx1('payment__method')} onClick={() => { handlePaymoney('vnpay') }}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABGlBMVEX////tHCQAWqkAW6rsAAAAV6cAn9wAUqYAod0AVKWludftFyAASKIAS6T6y8wAVKf83t7r8PcATqUqabD85+ftCBXV3uzzg4buOj8AlNMAmtr0jY/Bz+P71tftEx34+/2Qqc8AabP98PD3FRCbzuwAcblaUJTX6/cAgsUAYa4AjM2x2PDG4vQAldgAeb/5wsN5v+f4uLmyw93q9fun0+5IreDwUlbxYWTydnlAdLX5xMXL5fVkt+OBw+hErOD3rrD1nqDuLDL2pKbvR0zxZ2rtJi1jir8AP6BTf7p0lsX0k5WFocpWYKBPjMP3CADwWFx9SIRHO4q3Nl60EUl2ap5LUpiGdaHfLj5QbqtqTY2ZQHPNLUrN2OkANJxpzO3pAAAPG0lEQVR4nO2dCXfaOhbHhTfsAFlonIU2JiGkBExoWqBNG5KmTZtu89o3b+bNmvn+X2N0JUuWZLOEsB/9z2kKkjH6+V7dK8kLCGlpaWlpaWlpaWlpaWlpaWlpaWlpaWlp9dPO2tqz8rwbMUU9MwvZbDH/Y97tmJoO87YByj6Zd0umpMO8EWljNRFjwBVFFAFXElEGXEFEFXDlEJOAK4aYBrhSiOmAK4TYD3BlEPsDPgjx3fuX21Ns5SM0CHB0xKcW6E1lum0dS4MBR0W8tTIg31o8Mw4DHA3xtZ+hyi0c4nDAURDfMMDFQxwFcDjihZXJLChiKqBte5FseyTEpyJgYFl7ixNuUgBtzzw53S85WKX90xPTs4ci3oiA1uuD2bV/qJKAttHad12Hy3X3W9SQ/RHfS4A3CG2/fL8glAlA2zgleO5+4xSrsU/euKeGPQDxnQT4HlV+QV78sAh9MQHotQCodHpk4w4I8uyjUwcoW15fxAMVMOPT3jh/RBXQNvfBeieeLZV6J9iS7r5ppyNuSoAvUSUXLEpETQAeQb9T+EjFxgnEnaNUxE0rJwMGwaIkjQTgCbZUg2cH6qX8TQNXpiEmAP0gfj9fxKQFMQPpbcQzj1oQaVpHzKIbLVydDDcy4AsZcL6IhwXFFeu4C55EOHbLoQkD/20cUWrvxC0lkoYKuO3nMpnFQEymCQHQ8EquC4j0z36dlNsGMydHlAHfoW1LAZwfYsKCXsNxTr3YYxutOozZ6q0GMMY1EqIMuJ4GOC/EBCB0wn0Bg8cYPII7hQCUhqgCbqYBzgcxAWh4OBGaaiGrq+NUEePbLNyMCDgPxJSxKE4Up9By20wkQ2DajxGxA5Ok8fZAAjzoDzh7xJ3kbAJMaFNSTuLZ9bod5QoB0cPDcoxoPrdEgoGAM0d8mzRTnZkQJwiPmg0mGDCtoIwxIpgbj26eHwsAGPBgEOCMEcspE0Kc/urw/2mUMfD4jeQK/M+pc8QGR3T/ogAOtOCsEXcSYQactASt97ChNoxoeFM6bbVgWkHGagQxiqg49f92nBPaPtSCM0bcShJi5wQntU8iE8LwprVBJk+tFET7XxLgpjx9WgDEJOGRS8jsBh154uzvnkQBxztJIJrPxwGcJeK3DdWEJy7phthZiZFw3IkzvK0gbphikAHA9dEAZ4hYTgxocKAh9qIRlcUdmtsTiGMDzhBRTYgQQoHAdJ0WdVaHxJtGI4moBJnthwDODxETOtQ73YiQpD7cO6UUSLb9qgC+ewggfGRG66gyYj8b8izvMUTz+U8B0N9GLx4GmMn4b2ZDKCP27Yc8y0eIUpAJxgHEw4NZLYaLiBBLj4CjxGMpnRBKWR73RRmwgl4+HBAWAuaAGOdDMv7GWSOa7guIOPX/9lMADMYDhMWqOSDakXueuNGYJm2s1vpN6INBbkxAmEjOAREbjYQUm41L1SxvKEEmyFTkcxUPIJwdoIAIwVSeWyQQ5SDzCMCbWRLGiGx+aOD5IQs+EqI0Hww+V9DH8QD9XzMFjBH5HL/lOoksD4hfxSDzGY0N+HrGgBwReFrRtEJOgaS2JA7V/A/KCdGFBuSIOBXStTZPyvI08xvPJwR4OwdAhgiz+kYyy5OBgDQf9PeWDZAhwqy3pSDaRydkLCoEGQD8vmSA3FGd5EDGmCTg3twAI0Sy+qRkeSMF8OkSAjLElIGMAoj9bHcpAfsjmr+vCCBCm39NZvmGbf4hAr4ZH/DDvPmw1v9mm6aU5R3375n4YryM9Ua5dm10BYsAiBF//vGnGVnRNHH2/8c/j8WTS5+WHRAjWscf/vj9XzhpHP357//89/hYvOQAAN+MCfh53mRc61Yu8I9//vx5fHwsX1FBAf0+CMMAF+cqxf5Ln9YFQr/GBMwsEGBfRAB8vRKAfRCt3fEBcwsGmIr4GMBg4QBTEAHwdkxAfwEBE4iPAMwtJqCM6MP67diA8766tK/WLT9qItzgU/mwcoAIHXwi9y8Fu5sIvbSC4TRpgHO/PniItg8OoBMd3I43Ult8QKLNm70xDbgMgC/ATdWrYR8AuDlvgOF60On5ZQR8DOKSAI6PuDSAYyNaC3LD0ygaC3GZAMdCXC7AMRBneZZ+Mnog4vIBPhBxGQEfhLicgA9AtN7Nu6njakTE5QUcEXF216tNQyMgzvBytaloKOKyAw5FXH7AIYjW+3k3bxJa739bzGoAIrQZpC8rBsua6FP0JsWMOet2QVe2x9L6B2XxLbCCFYgxkl68tqzo/HDOt6y9VeMDVV7u3vqw1rh38X7hF0W1tLS0tLS0VkWVi10uperF7lOiFyje5qny6WgTLISeral6dS/+vsArsSYquxfKnkm7Fiq2Hof4yfIjqWe9KrQGT34+xtvcyNt8j2pghlR+UsgqKubv4uZtfYkrvjD0uzwvy0sk92zrwtvHAQpPU/O/K1VPyYQPbpfb41MGdbJHayz60bphqvLyh3zbbxu8OLvGCuPPeF+lPb+1SalRfPTvTNyy1ucySk0F4H1w3vgwqDdbk5oguuPsMJsgNM3iHdv2VVxt8EdJbeV5YUHy0+h45GXnHUfxjYKJM18+N9oun78HymX1n3OxYdcYguF5sTmLh0lCs7DDdnBY5Ni2uOOvxIbZb48GRCh2UyWOgH1yPn/JtpIj0l4KoVH/dlePcVgH++HFhBvxD4BE7gg4wq+CUNsa5gQA0QV/vq8vV3z3ObX47EN5aTCVEHxwrcBpIjtkhW5qZGOWAi8Xgg3lzu+gCSheCFTCSCbHPVd+uqM4s+1LKPTKAqm9L5qCinH/esWPhc3j5hrZOHs4CUCEcmwByb8Qi+GhKyz6SIQ58er6/oTIZLYpEkuQ0GGzMu8u3sdXHmSLUaLcKsjAj9R3HkakG6khurAMIhFKj3YYQMiNSNtdxHD23ROGmI+zQJn7L8sNxEeNwiNzPdd27KbiGTAoZaMAmVC843oA4Q5zyywQPoN32Wc83sYpETswTxnUtNRHC6/QpMRTov8pLoSnkuTY7SwKoZBYBhCWWbuJDe880iN5/rPFZ2R+430WYgvdZkPw48cqfvqB4KafwElvJELxmeMs8Q8gRCyCkKhSiCzEk0NBjJN8aGPUmY9uTA5QSIlCJrDEqEkIc8I96AG7p3UUQkgCxEkB9RXz3Q3xN7F2uJ9m1+gYIH8/SUKeEgMeQ8CuOT5+IYSWeGOMtTuUcKsQm4U4qVEUuWUjxUObLNlLdrK/CRY/jYt732vcN/2PCmGcWLi5BxCyBFhci/qkR1I/H4AXpSHnEz60SfTSSSjDWs7OhFUkJ+WE0thmewjhNy9uLPFN2vN45vekULJVEAnzk0oUTDfcTaPHGnz0hb4WE4oP9KCJvz9hmZLYRWgsjKPZyNpISYlIHNpQs09W26qbQsP9+MwmJ4y7bJT4+xNSE2ZtACROykLLYVpKRGw2QY6KPFWciF7zlPgxJoqngjGhMBsmiX/AyNswvGz0I4Kkhg1RuD8qo7IyN+LEBjOCeEqk8z8YyAXCczgEworYFQ/6EZbvvmSNJ3drkR++JU56/4zonic/pbfxjJGfPKCYEiGAkGmFcPpdIBQvSsDzrX6E0s6jyV4xEp8tbRzOkJD3LxjHHChOKhGKz4UIft0OyPhca2nLG6Y6qy9Pl5CnRBiLwrQiEJ8NJxGKtxsGkGaGEsq5TlBRHLhMmZAsuFA33aQjNnEqLxOiQL4kYRghddKioLRZ4tQJeUr0v6/LPElCdTI1hJCkh8L9TiwzNSVOmbASu+kFTgjBJ7FSIVSe5DWMEGa9cmY4ZCO3rDgHnDIh+sUXTuGFfLWkSkjmVqMSkvwnZ/d4liiCT5tQfoyj/GS4BCH6EIxMSJxUSX089ojl0yYUJw7KolQKoZT4BxNCglfnCvFixmFcOHVC8UGHyjXLSULx2auDCXcKZnJdkMdNw4gLC9MmFO9ZVh5fmEIoPC9pMOEPiCqJkSZfcxNS4vQJ0WeeMWQnRcn8gYSHmSRX9cXNyBJpQf0qvlwjxJoZELKfKEycRCOrcSo2+qRszac/4lCFno8pqOfINvjglJ+5me7cgumG3oqunMGIlqASl8J+pFtHhDu8hYbHgbbo+KWonCQTl/jzUU6MT9EY9hR/nL7y1LJ85fzStsWk3hxZuYDbgSlhuZDn+sJ64hYrlI2Iiwux/kdy5Y8vcUm+jqapFxfKmcTtA6aU2z9fXnymgbcsi9YmCqi2FCXLpmhELS0tLS2t6ai96tmrXBrjQ7Vw4u0Y+pWdsI16l4M2ueymFDZ77Xb65k6//XSb2O496VPjHKQH6tytVq+HEPbaV4mycq/WSdu27Lql6z77qYFXy7s6G62Vj1CbfsX5ZVit4f+b1TDqW/gVakKr2qgcVuFVu1olhx//j48HLoSjUqt2oBBvQS3XroZthxaXa7iY+STewAXCZrVTI2+jilK72sHfWO7gr7jEH6v28Yvx1exRQrcTli5RrxdWqd/gV1eohL/7vIlK1bB3ji6dTgdAy2dheI6PTCe8rqLQDTtnbeRUmz1imxou7rqocx12Sldh9zw8p/akG3QvURiGziW6vgrPqeef4e8p4X1Ww+7VdZPubTqEuO0YCQzaoxhQSgmb0PYz1K3RT9CqKrhoiRRiq3RR5G9X2DTYhg7+YNglkQj2gS57ZOse2UXzquyw7cnf63anCi/bUF+tTocQ+mF4VXajRqK2ywmx/5LmXbODG56dtxHxMozdBkLYuu2wI4XbX6IgsBOAJburuUBYve66VVJB0Alht02OFz2InUkTRmEyIoRWXjVjQvI2IuzG7hOelRkhsSE6P3PdmkIYCoSoRzbo1ZpdpUIi7E2DEJ3hNl1GhOishpMcIYFXqIsxnHYNt+XSQVfYWaGqjP90a81r8EN0TQjbDsv9IXaJag/1OpAayAEjIDWXzIQxIa6/Um143b7Ee8N7nIoNUbtbKvUQBNJmB9WuS26TFONXuNndkoPbGjolMOC5U4Jvb187JQxbxYVlhP0VBw/k9Loudfcrp9Qr41RScqr4L1ARENjgHF3VcEjDG5KKLqkAFwKnJ19xRfe2gAohFpUGDOGIo08/9Y2vWmNIvdNsdgaNTmCD6gyGL9MTztSdgaPwoRtoaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpja//A5CyoVvyMfctAAAAAElFTkSuQmCC" alt="VNPAY" />
              </div>
              <div className={cx1('payment__method')} onClick={() => { handlePaymoney('payos') }}>
                <img src="https://payos.vn/wp-content/uploads/sites/13/2023/07/Untitled-design-8.svg" alt="payos" />
              </div>
            </div>
          </div>
        </div>
        }
      </motion.div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: '1' }}>
          <p style={{ display: 'flex', flex: '0.06', color: 'green' }}>#{order.id}</p>
          <p style={{ display: 'flex', flex: '0.31' }}>Hình thức thanh toán: </p>
          <p style={{ display: 'flex', flex: '1', color: 'blue' }}>{order.payments ? s : t}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{}}>Trạng thái:</p>
          <span style={{ marginRight: '5px' }}></span>
          <p style={{ color: '#888080' }}>{order.status == null ? 'Chờ xác nhận' : order.status == 'CONFIRMED' ? 'Đã xác nhận' : order.status == 'SENDING' ? 'Đang vận chuyển' : order.status == 'CANCELLED' ? 'Đã hủy' : 'Thành công'}</p>
          {order.status === 'SUCCESS' && (
            <button
              style={{
                border: 'none',
                margin: '0px 0px 0px 10px',
                backgroundColor: 'rgb(81, 191, 228)',
                color: 'white',
                borderRadius: '6px',
                width: '150px',
                height: '35px',
                fontSize: '16px',
              }}
              onClick={() => {
                IssueInvoice.GenerateInvoice(order);
              }}
            >
              In hóa đơn
            </button>
          )}
        </div>
      </div>
      {
        (order.payments == false && order.paymentStatus == false)
        && <>Bạn chưa thanh toán<button onClick={() => { setShow(true) }} style={{
          border: 'none', backgroundColor: 'green', color: 'white', cursor: 'pointer',
          borderRadius: '6px', width: '150px', height: '35px', fontSize: '16px', marginLeft: '20px'
        }}>Thanh toán ngay</button> </>
      }


      <p style={{ display: 'flex', flex: '1', color: 'black' }}>Ngày đặt: {order.time?.split("T")[0]}</p>
      <hr style={{ borderTop: '2px solid #B6B6B6', width: 'auto', margin: '18px 0px 0px 0px' }} />
      {
        order.products.map((product, index) => {
          return (
            <Product key={index} product={product} />
          )
        })
      }
      <TotalMoney order={order} />
      <hr style={{ borderTop: '4px solid #B6B6B6', width: 'auto', margin: '18px 0px 0px 0px' }} />
    </div >
  )
}

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedLink, setSelectedLink] = useState('all');
  const [loading, setLoading] = useContext(LoadingContext);
  const [loadSuccess, setLoadSuccess] = useState(false);
  useEffect(() => {
    document.title = 'Đơn hàng của tôi';
    setLoading(true);
    UserApi.GetOrders().then(res => {
      setOrders(res.data)
      setLoadSuccess(true);
    }
    )
  }, [])
  useEffect(() => {
    if (loadSuccess)
      setLoading(false);
  }, [loadSuccess]);
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
      {selectedLink === 'all' &&
        orders?.sort((a, b) => b.id - a.id).map((order, index) => {
          return <Order key={index} order={order} />;
        })}

      {selectedLink === 'unconfirmed' &&
        orders?.sort((a, b) => b.id - a.id)
          .filter((order) => order.status === null)
          .map((order, index) => {
            return <Order key={index} order={order} />;
          })}

      {selectedLink === 'shipping' &&
        orders?.sort((a, b) => b.id - a.id)
          .filter((order) => order.status === 'SENDING')
          .map((order, index) => {
            return <Order key={index} order={order} />;
          })}

      {selectedLink === 'success' &&
        orders?.sort((a, b) => b.id - a.id)
          .filter((order) => order.status === 'SUCCESS')
          .map((order, index) => {
            return <Order key={index} order={order} />;
          })}

      {selectedLink === 'cancelled' &&
        orders?.sort((a, b) => b.id - a.id)
          .filter((order) => order.status === 'CANCELLED')
          .map((order, index) => {
            return <Order key={index} order={order} />;
          })}
    </div>
  )
}