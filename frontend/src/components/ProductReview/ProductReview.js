import React from 'react';
import styles from './ProductReview.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import products from '../ProductData/ProductData';

import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const cx = classNames.bind(styles);

// Comment Component
function CommentBox({ comment }) {
    return (
        <div className={cx('commentBox')}>
            {/* Account Image */}
            <div className={cx('column1')}>
                <img alt='Account' className={cx('accImg')} src={(comment?.avatar) ?? 'https://s3-alpha-sig.figma.com/img/0e69/55b5/ac6bae2245e3befa7985f1a3d42889b3?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a53ArzCCmnybP0ZdfwRV0M3pBSXSE3kFrjRKaK1HamAz6hv5hie5F7aBRMhsEejpw2xCwE7kFKt9Ruvuf7H2D1zF6hn5LhkvcXlkV-f-uBzXYgIWrlj9vwyTkaNc9LN~G2Y5RxYHXfmB5RoWHwWwVofBJotF9tDEK55gwRyOOaWz3qhXHvSBfor3PMGvGatCO2a4w0Ez5X6fAfGATD8AqdJVuMggYpv7F1DEQCnQSh3wFiDOWT6QCIA0PpJ1XuLFqMmsE2XbPBS3H3MC3mmmV5jpuNvYQWm9Kq90HvoQMN-Y70U4RQrW0IPM4ceDt1z7Hcva6LO9UXfAw4zauP5jQw__'} />
            </div>
            <div className={cx('column2')}>
                {/* Account Name */}
                <div className={cx('row1')}>
                    <p className={cx('customerName')}>{comment?.name}</p>
                </div>
                {/* Time */}
                <div className={cx('row2')}>
                    <p className={cx('commentTime')}>{comment?.time}</p>
                </div>
                {/* Comment Text */}
                <div className={cx('row3')}>
                    <p className={cx('comment')}>{comment?.content}</p>
                </div>
                {/* Comment Image */}
                {
                    comment?.picture && <div className={cx('row4')}>
                        <img alt='Product' className={cx('commentImg')} src={comment?.picture} />
                    </div>
                }

            </div>
        </div>
    )
}


function ProductReview({ product }) {
    const [star0, setStar0] = useState(0)
    const [star1, setStar1] = useState(0)
    const [star2, setStar2] = useState(0)
    const [star3, setStar3] = useState(0)
    const [star4, setStar4] = useState(0)
    const [star5, setStar5] = useState(0)
    useEffect(() => {
        setStar0(product.rates?.filter(rate => rate.rate == 0).length)
        setStar1(product.rates?.filter(rate => rate.rate == 1).length)
        setStar2(product.rates?.filter(rate => rate.rate == 2).length)
        setStar3(product.rates?.filter(rate => rate.rate == 3).length)
        setStar4(product.rates?.filter(rate => rate.rate == 4).length)
        setStar5(product.rates?.filter(rate => rate.rate == 5).length)
    }, [product])
    return (
        <div className={cx('product-review')}>
            <h2 className={cx('title')} style={{ marginLeft: '1%' }}>Đánh giá của sản phẩm</h2>

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
                    <p>{star5} đánh giá</p>
                    <p>{star4} đánh giá</p>
                    <p>{star3} đánh giá</p>
                    <p>{star2} đánh giá</p>
                    <p>{star1} đánh giá</p>
                </div>
            </div>
            {
                product?.comments?.map((comment, index) => (
                    <CommentBox key={index} comment={comment} />
                ))
            }

        </div>
    )
}

export default ProductReview;