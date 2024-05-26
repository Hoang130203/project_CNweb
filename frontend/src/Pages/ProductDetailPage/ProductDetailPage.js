import React, { useContext, useEffect, useState } from 'react'

import styles from './ProductDetailPage.module.scss'
import classNames from 'classnames/bind'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import ProductInformation from '../../components/ProductInformation/ProductInformation'
import ProductReview from '../../components/ProductReview/ProductReview'
import { useParams } from 'react-router-dom'
import UserApi from '../../Api/UserApi'
import { LoadingContext } from '../..'

const cx = classNames.bind(styles)

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useContext(LoadingContext)
  useEffect(() => {
    setLoading(true)
    UserApi.GetDetailProduct(id).then(res => {
      setProduct(res.data)

    }
    )
  }, [])
  useEffect(() => {
    if (product.name?.length > 0) {
      setLoading(false)
    }
  }, [product])
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
      <ProductReview product={product} />
    </div>
  )
}
