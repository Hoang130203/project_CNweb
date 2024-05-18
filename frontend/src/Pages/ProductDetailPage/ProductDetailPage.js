import React, { useEffect, useState } from 'react'

import styles from './ProductDetailPage.module.scss'
import classNames from 'classnames/bind'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import ProductInformation from '../../components/ProductInformation/ProductInformation'
import ProductReview, { ProductRating } from '../../components/ProductReview/ProductReview'
import { useParams } from 'react-router-dom'
import UserApi from '../../Api/UserApi'

const cx = classNames.bind(styles)

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([])
  useEffect(() => {
    UserApi.GetDetailProduct(id).then(res => {
      setProduct(res.data)
    }
    )
  }, [])

  return (
    <div className={cx('container')}>
      <ProductDetailComponent product={product} />
      <ProductInformation
        description={{
          "Danh mục": product?.type == 'MOBILE' ? 'Điện thoại' : product?.type == 'LAPTOP' ? 'Laptop' : product?.type == 'WATCH' ? 'Đồng hồ' : 'Phụ kiện',
          "Xuất xứ": product?.origin,
          "Mô tả": product?.description?.split('\n').map((line, index) => <p key={index}>{line}</p>),
        }}
        moreDetails={
          <div>
            <p></p>
          </div>
        }
      />
    </div>
  )
}
//   <ProductRating />
//  <ProductReview />
