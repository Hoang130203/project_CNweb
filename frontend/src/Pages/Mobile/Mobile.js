import classNames from 'classnames/bind';
import styles from './Mobile.module.scss';
import CardProduct from '../../components/CardProduct/CardProduct';
import Filter from '../../components/Filter/Filter';
import { FaFilter } from "react-icons/fa";
import React, { useContext, useEffect, useState } from 'react';
import { getMinMaxNewPrice } from '../../components/Filter/FilterLogic';
import Sort from '../../components/Sort/Sort';
import UserApi from '../../Api/UserApi';
import { LoadingContext } from '../..';
import { doc } from 'prettier';

const cx = classNames.bind(styles);

function Mobile() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useContext(LoadingContext)

    useEffect(() => {
        document.title = 'Điện thoại';
        setLoading(true);
        UserApi.GetProductByCategory('MOBILE').then(res => {
            const productsWithNewPrice = res.data.map(product => ({
                ...product,
                newPrice: product.cost - (product.cost * product.promotion / 100)
            }));
            setProducts(productsWithNewPrice);
        });
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
        }
    }, [products]);

    const { min: MIN, max: MAX } = getMinMaxNewPrice();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [priceRange, setPriceRange] = useState([MIN, MAX]);
    const [sortType, setSortType] = useState('Giá thấp - cao');

    const filteredProducts = products.filter((product) => {
        for (const [filterName, options] of Object.entries(selectedOptions)) {
            const filterNameLower = filterName.toLowerCase();
            if (filterNameLower === 'rate') {
                if (options.length > 0 && !options.includes(Math.round(product[filterNameLower]).toString() + ' sao')) {
                    return false;
                }
            } else if (filterNameLower === 'brand') {
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
                return b.id - a.id;
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
                <div className={cx('filterSort__title')} style={{ color: '#2260ff', fontSize: '32px' }}>
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
                    <h3 style={{ color: '#2260ff', fontSize: '32px' }}>Sắp xếp theo</h3>
                </div>
                <Sort sortType={sortType} onSortTypeChange={handleSortTypeChange} />
                <div className={cx('item__container')} >
                    {sortedProducts.map((product) => (
                        <CardProduct
                            key={product.id}
                            id={product.id}
                            image={product.images[0].url}  // Assuming you want to display the first image
                            name={product.name}
                            discount={product.promotion > 0 ? 'Giảm ' + product.promotion + '%' : null}
                            oldPrice={product.cost}
                            newPrice={product.newPrice}
                            rating={product.rate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Mobile;
