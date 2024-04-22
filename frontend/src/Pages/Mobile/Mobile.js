

import classNames from 'classnames/bind';
import styles from './Mobile.module.scss';
import CardProduct from '../../components/CardProduct/CardProduct';
import Filter from '../../components/Filter/Filter';
import { FaFilter } from "react-icons/fa";
import React, { useState } from 'react';
import products from '../../components/ProductData/ProductData';
import { getMinMaxNewPrice } from '../../components/Filter/FilterLogic';
import Sort from '../../components/Sort/Sort';

const cx = classNames.bind(styles);

function Mobile() {


    const { min: MIN, max: MAX } = getMinMaxNewPrice();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [priceRange, setPriceRange] = useState([MIN, MAX]);
    const [sortType, setSortType] = useState('Giá thấp - cao');


    const filteredProducts = products.filter((product) => {
        for (const [filterName, options] of Object.entries(selectedOptions)) {
            const filterNameLower = filterName.toLowerCase();
            if (filterNameLower.toLowerCase() === 'rating') {
                if (options.length > 0 && !options.includes(product[filterNameLower].toString() + ' Stars')) {
                    return false;
                }
            } else if (filterNameLower.toLowerCase() === 'brand') {
                if (options.length > 0 && !options.includes(product[filterNameLower])) {
                    return false;
                }
            } else if (options.length > 0 && !options.includes(product[filterNameLower])) {
                return false;
            }
        }

        return product.newPrice >= priceRange[0] && product.newPrice <= priceRange[1];
    });
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortType) {
            case 'Giá cao - thấp':
                return b.newPrice - a.newPrice;
            case 'Giá thấp - cao':
                return a.newPrice - b.newPrice;
            case 'Mới nhất':
                return new Date(b.manufacturingDate).getTime() - new Date(a.manufacturingDate).getTime();
            case 'Bán chạy':
                return b.salesCount - a.salesCount;
            default:
                return 0;
        }
    });
    const handlePriceRangeChange = (newPriceRange) => {
        setPriceRange(newPriceRange);
    };
    const handleSortTypeChange = (sortType) => {
        setSortType(sortType);
    };


    return (
        <div className={cx('product__page')}>

            <div className={cx('filter__side')}>
                <div className={cx('filterSort__title')}>
                    <FaFilter />
                    Bộ lọc
                </div>
                <Filter
                    MIN={MIN}
                    MAX={MAX}
                    handlePriceRangeChange={handlePriceRangeChange}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('sort__title')}>
                    <h3>Sắp xếp theo</h3>
                </div>
                <Sort sortType={sortType} onSortTypeChange={handleSortTypeChange} />
                <div className={cx('item__container')} >
                {sortedProducts.map((product) => (
                    <CardProduct
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        discount={product.discount}
                        oldPrice={product.oldPrice}
                        newPrice={product.newPrice}
                    />
                ))}
            </div>
            </div>
            
        </div>
    );

}
export default Mobile;