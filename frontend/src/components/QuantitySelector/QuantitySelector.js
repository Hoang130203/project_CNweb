import React, { useState } from 'react';
import styles from './QuantitySelector.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const QuantitySelector = ({ initialQuantity = 1, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
      onQuantityChange(value);
    }
  };

  return (
    <div className={cx('quantity-selector')}>
      <button className={cx('decrement-button')} onClick={handleDecrement}>
        -
      </button>
      <input
        type="text"
        className={cx('quantity-input')}
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button className={cx('increment-button')} onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;