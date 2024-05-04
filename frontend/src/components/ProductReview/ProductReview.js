import React from 'react';
import styles from './ProductReview.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import products from '../ProductData/ProductData';

import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const cx = classNames.bind(styles);

// Comment Component
function CommentBox () {
    return (
        <div className={cx('commentBox')}>
            {/* Account Image */}
            <div className={cx('column1')}>
                <img alt='Account' className={cx('accImg')} src = 'https://s3-alpha-sig.figma.com/img/0e69/55b5/ac6bae2245e3befa7985f1a3d42889b3?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a53ArzCCmnybP0ZdfwRV0M3pBSXSE3kFrjRKaK1HamAz6hv5hie5F7aBRMhsEejpw2xCwE7kFKt9Ruvuf7H2D1zF6hn5LhkvcXlkV-f-uBzXYgIWrlj9vwyTkaNc9LN~G2Y5RxYHXfmB5RoWHwWwVofBJotF9tDEK55gwRyOOaWz3qhXHvSBfor3PMGvGatCO2a4w0Ez5X6fAfGATD8AqdJVuMggYpv7F1DEQCnQSh3wFiDOWT6QCIA0PpJ1XuLFqMmsE2XbPBS3H3MC3mmmV5jpuNvYQWm9Kq90HvoQMN-Y70U4RQrW0IPM4ceDt1z7Hcva6LO9UXfAw4zauP5jQw__' />
            </div>

            <div className={cx('column2')}>
                {/* Account Name */}
                <div className={cx('row1')}>
                    <p className={cx('customerName')}>Lachlan Dempsey</p>
                </div>
                {/* Time */}
                <div className={cx('row2')}>
                    <p className={cx('commentTime')}>2023-10-12 11:12</p>
                </div>
                {/* Comment Text */}
                <div className={cx('row3')}>
                    <p className={cx('comment')}>Máy khá gọn, thích hợp cho người thích gọn nhẹ dễ bỏ túi</p>
                    <p className={cx('comment')}>Máy nhỏ hơn iPhone XR, cầm chắc tay</p>
                </div>
                {/* Comment Image */}
                <div className={cx('row4')}>
                    <img alt='Product' className={cx('commentImg')} src='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-asus-vivobook-s-14-flip-tp3402va-lz025w-thumbnails.png'/>
                </div>
            </div>
        </div>
    )
}

// Product Rating component
export function ProductRating() {

    const [star1, setStar1] = useState(5)
    const [star2, setStar2] = useState(5)
    const [star3, setStar3] = useState(5)
    const [star4, setStar4] = useState(5)
    const [starState, setStarState] = useState('Excellent')

    // Hàm đánh giá số sao
    const handleStar = (index) => {
        
        setStar1(index + 1)

        if (index === 0) {
            setStarState('Bad')
        }

        if (index === 1) {
            setStarState('Unsatisfactory')
        }

        if (index === 2) {
            setStarState('Average')
        }

        if (index === 3) {
            setStarState('Satisfactory')
        }

        if (index === 4) {
            setStarState('Excellent')
        }
    }

    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    const formatPrice = (price) => {
        const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice;
    };

    return (
        <div className={cx('productRating')}>
            <h2>Product Rating</h2>
            {/* Thông tin sản phẩm */}
            <div className={cx('productInformation')}>
                <div className={cx('productImg')} >
                    <img className={cx('accImg')} alt='product' src={product.image}/>
                </div>

                <div className={cx('productInfo')}>
                    <div style={{}}>
                        <p style={{fontSize: '25px', fontWeight: 'bold'}}>{product.name}</p>
                    </div>
                    <div style={{display: 'flex', marginTop: '10px'}}>
                        <p className={cx('category')}>Category:</p>
                        <p className={cx('category')} style={{marginLeft: '10px'}}>Product Type</p>
                    </div>
                    
                    <div style={{display: 'flex', marginTop: '10px'}}>
                        <div className={cx('abc')} style={{display: 'flex'}}>
                            <p style={{flex: '0.1'}} className={cx('number')}>x</p>
                            <p style={{flex: '1'}} className={cx('number')}>Product Number</p>
                            <p style={{flex: '1'}} className={cx('category')}>Product Type</p>
                        </div>
                        <div className={cx('price__container')} style={{paddingRight:'0%', display: 'flex'}}>
                            <div style={{flex:'1.5'}}></div>
                            {product.oldPrice && <p style={{}} className={cx('old__price')}>{formatPrice(product.oldPrice)}</p>}
                            <p style={{}} className={cx('new__price')}>{formatPrice(product.newPrice)}</p>
                        </div>
                    </div>
                </div>
                
            </div>

            {/* Đánh giá sản phẩm */}
            <div className={cx('productQuality')}>
                <p>Product Quality</p>
                <p className={cx('qualityStar')}>
                    {[...Array(Math.floor(star1))].map((_, index) => (
                        <IoIosStar key={index} color="#FFCB45" onClick={() => handleStar(index)} style={{ color: "#FFCB45", fontSize: "20px" }}/>
                    ))}

                    {[...Array(Math.floor(5 - star1))].map((_, index) => (
                        <div key={index} style={{ display: "inline-block" }}>
                            <IoIosStarOutline onClick={() => handleStar(index + star1)} style={{ color: "#FFCB45", fontSize: "20px" }} />
                            <IoIosStar style={{ color: "#FFCB45", fontSize: "20px", position: "absolute", zIndex: "-1" }} />
                        </div>
                    ))}
                </p>
                <p className={cx('starComment')}>{starState}</p>
                {/* <p>Satisfactory</p>
                <p>Average</p>
                <p>Unsatisfactory</p>
                <p>Bad</p> */}
            </div>

            <div className={cx('rateComment')}>
                <div className={cx('category')}>
                    <p>Category</p>
                    <input className={cx('categoryKind')} placeholder=''/>
                </div>
                <div>
                    <input placeholder='Please share your feedback on this product!' />
                </div>
            </div>

            <div>
                <button>Add Image</button>
                <button>Add Video</button>
            </div>

            <div>
                <div>
                    <p>Dịch vụ của người bán</p>
                    <p>
                        {[...Array(Math.floor(star2))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" onClick={() => setStar2(index + 1)} style={{ color: "#FFCB45", fontSize: "20px" }}/>
                        ))}

                        {[...Array(Math.floor(5 - star2))].map((_, index) => (
                            <div key={index} style={{ display: "inline-block" }}>
                                <IoIosStarOutline onClick={() => setStar2(index + star2 + 1)} style={{ color: "#FFCB45", fontSize: "20px" }} />
                                <IoIosStar style={{ color: "#FFCB45", fontSize: "20px", position: "absolute", zIndex: "-1" }} />
                            </div>
                        ))}
                    </p>
                </div>
                <div>
                    <p>Tốc độ giao hàng</p>
                    <p>
                        {[...Array(Math.floor(star3))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" onClick={() => setStar3(index + 1)} style={{ color: "#FFCB45", fontSize: "20px" }}/>
                        ))}

                        {[...Array(Math.floor(5 - star3))].map((_, index) => (
                            <div key={index} style={{ display: "inline-block" }}>
                                <IoIosStarOutline onClick={() => setStar3(index + star3 + 1)} style={{ color: "#FFCB45", fontSize: "20px" }} />
                                <IoIosStar style={{ color: "#FFCB45", fontSize: "20px", position: "absolute", zIndex: "-1" }} />
                            </div>
                        ))}
                    </p>
                </div>
                <div>
                    <p>Tài xế</p>
                    <p>
                        {[...Array(Math.floor(star4))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" onClick={() => setStar4(index + 1)} style={{ color: "#FFCB45", fontSize: "20px" }}/>
                        ))}

                        {[...Array(Math.floor(5 - star4))].map((_, index) => (
                            <div key={index} style={{ display: "inline-block" }}>
                                <IoIosStarOutline onClick={() => setStar4(index + star4 + 1)} style={{ color: "#FFCB45", fontSize: "20px" }} />
                                <IoIosStar style={{ color: "#FFCB45", fontSize: "20px", position: "absolute", zIndex: "-1" }} />
                            </div>
                        ))}
                    </p>
                    <input placeholder='Thêm đánh giá chi tiết'/>
                </div>
            </div>
        </div>
    )
}

function ProductReview() {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    useEffect(() => {
      const handleComment = ({ detail }) => {
        console.log(detail);
      }
      window.addEventListener(`product-${product.id}`, handleComment)

      return () => {
        window.removeEventListener(`product-${product.id}`, handleComment)
      }

    }, [product.id])


    return (
        <div className={cx('product-review')}>
            <h2 className={cx('title')} style={{marginLeft: '1%'}}>Product Review</h2>

            <div className={cx('totalRate')}>
                <div className={cx('star')}>
                    <p>
                        {[...Array(Math.floor(5))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" />
                        ))}
                        {/* {[...Array(5 - Math.floor(5))].map((_, index) => (
                            <IoIosStar key={index + Math.floor(product.rating)} />
                        ))} */}
                    </p>
                    <p>
                        {[...Array(Math.floor(4))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" />
                        ))}
                        {/* {[...Array(5 - Math.floor(4))].map((_, index) => (
                            <IoIosStar key={index + Math.floor(product.rating)} />
                        ))} */}
                    </p>
                    <p>
                        {[...Array(Math.floor(3))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" />
                        ))}
                        {/* {[...Array(5 - Math.floor(3))].map((_, index) => (
                            <IoIosStar key={index + Math.floor(product.rating)} />
                        ))} */}
                    </p>
                    <p>
                        {[...Array(Math.floor(2))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" />
                        ))}
                        {/* {[...Array(5 - Math.floor(2))].map((_, index) => (
                            <IoIosStar key={index + Math.floor(product.rating)} />
                        ))} */}
                    </p>
                    <p>
                        {[...Array(Math.floor(1))].map((_, index) => (
                            <IoIosStar key={index} color="#FFCB45" />
                        ))}
                        {/* {[...Array(5 - Math.floor(1))].map((_, index) => (
                            <IoIosStar key={index + Math.floor(product.rating)} />
                        ))} */}
                    </p>
                </div>

                <div className={cx('number')}>
                    <p>2000 đánh giá</p>
                    <p>109 đánh giá</p>
                    <p>10 đánh giá</p>
                    <p>1 đánh giá</p>
                    <p>0 đánh giá</p>
                </div>
            </div>
            
            <CommentBox />
            
        </div>
    )
}

export default ProductReview;