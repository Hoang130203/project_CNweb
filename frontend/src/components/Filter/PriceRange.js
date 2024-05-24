import './PriceRange.scss';
import Slider from 'react-slider';
import React, { useState } from 'react';
import Button from '../Button/Button';
import cx from 'classnames';

const formatPrice = (price) => {
  const formattedPrice = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  return formattedPrice;
};
function hasPriceRangeChanged(min, max, currentValue) {
  return currentValue[0] !== min || currentValue[1] !== max;
}

function PriceRange({ min, max, onPriceRangeChange }) {
  const [value, setValue] = useState([min, max]);



  const handlePriceRangeChange = (newValue) => {
    setValue(newValue);
    onPriceRangeChange(newValue);
  };
  const handleClearFilters = () => {
    setValue([min, max]);
    onPriceRangeChange([min, max]);
  };
  const hasChanged = hasPriceRangeChanged(min, max, value);
  console.log(hasChanged);

  return (
    <div className="price__range">
      <div className='price__title'>
        <h3 style={{ color: '#61c3ff' }}>Giá</h3>
        {(hasChanged) && (
          <Button
            children={'X'}
            onClick={handleClearFilters}
            className='delete-button'
          />
        )}
      </div>
      <div className="price__label">
        {formatPrice(Math.ceil(value[0] / 10000) * 10000)} - {formatPrice(Math.floor(value[1] / 10000) * 10000)}
      </div>
      <Slider
        className="slider"
        onChange={handlePriceRangeChange}
        value={value}
        min={min}
        max={max}
      />
    </div>
  );
}

export default PriceRange;