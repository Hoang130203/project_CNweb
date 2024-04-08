import React from 'react';
import RadioButton from '../../components/RadioButton/RadioButton'; 
import styles from './Sort.module.scss';
import classNames from 'classnames/bind';
import products from '../ProductData/ProductData';
import {useState} from 'react';

const cx = classNames.bind(styles);

const Sort = ({ sortType, onSortTypeChange }) => {
    const [selectedSort, setSelectedSort] = useState(sortType || 'Mới nhất');

  const handleSortOptionChange = (option) => {
    setSelectedSort(option);
    onSortTypeChange(option);

    };
    return (
        <div className={cx('sort__button__container')}>
            <RadioButton 
                options={['Giá thấp - cao', 'Giá cao - thấp', 'Mới nhất', 'Bán chạy']} 
                selectedOption={selectedSort}
                onOptionChange={handleSortOptionChange}
            />
        </div>
    );
};

export default Sort;