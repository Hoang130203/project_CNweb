import React from 'react'

import styles from './ProductDetailPage.module.scss'
import classNames from 'classnames/bind'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import ProductInformation from '../../components/ProductInformation/ProductInformation'

const cx = classNames.bind(styles)

export default function ProductDetailPage() {
  return (
    <div className={cx('container')}>
        <ProductDetailComponent />
        <ProductInformation 
          description={{
            "Danh mục": "Điện thoại",
            "Xuất xứ": "Mỹ",
            "Mô tả": "Sản phẩm mới nhất của Apple",
          }}
          moreDetails={
            <div>
              <h3>Additional Details</h3>
              <p>This is some more detailed information about the product.</p>
            </div>
          }
        />
    </div>
  )
}
