import React, { useState } from 'react';
import styles from './ProductInformation.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';

const cx = classNames.bind(styles);
export default function ProductInformation({description, moreDetails}) {
    const [showMoreDetails, setShowMoreDetails] = useState(false);

  const toggleMoreDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  return (
    <div className={cx('product-detail')}>
      <h2 className={cx('product-detail__title')}>Chi tiet san pham</h2>
      <div className={cx('product-detail__description-container')}>
        <table className={cx('product-detail__description-table')}>
          {Object.entries(description).map(([key, value]) => (
            <tr key={key}>
              <td className={cx('product-detail__description-label')}>{key}</td>
              <td className={cx('product-detail__description-value')}>{value}</td>
            </tr>
          ))}
        </table>
        {showMoreDetails && (
          <div className={cx('product-detail__more-details')}>
            {moreDetails}
          </div>
        )}
      </div>
      <div className={cx('product-detail__button-container')}>
        <Button
          onClick={toggleMoreDetails}
          className={cx('product-detail__button')}
        >
          {showMoreDetails ? 'View Less' : 'View More'}
        </Button>
      </div>
    </div>
  );
}
