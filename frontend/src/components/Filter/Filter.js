import React, { useState } from 'react';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import {filters} from './FilterLogic'
import PriceRange from './PriceRange';

const cx = classNames.bind(styles);

const Filter = ({ selectedOptions, setSelectedOptions, MIN, MAX, handlePriceRangeChange }) => {
    
    const hasSelectedFilters = Object.values(selectedOptions).some(
        (options) => options.length > 0
    );


    const handleOptionClick = (filterName, option) => {
        setSelectedOptions((prevOptions) => {
            const optionsForFilter = prevOptions[filterName] || [];
            const optionIndex = optionsForFilter.indexOf(option);

            if (optionIndex === -1) {
                return { ...prevOptions, [filterName]: [...optionsForFilter, option] };
            } else {
                return {
                    ...prevOptions,
                    [filterName]: [
                        ...optionsForFilter.slice(0, optionIndex),
                        ...optionsForFilter.slice(optionIndex + 1),
                    ],
                };
            }
        });
    };
    const handleClearFilters = () => {
        setSelectedOptions({});
    };
    

    return (
        <>
        <PriceRange 
            min={MIN} max={MAX} 
            onPriceRangeChange={handlePriceRangeChange} 
            hasSelectedFilters={hasSelectedFilters} 
        />
        <div className={cx('filter-sidebar')}>
            {filters.map((filter) => (
                <div key={filter.name} className={cx('filter-group')}>
                    <h3 className={cx('filter-title')}>{filter.name}</h3>
                    <ul className={cx('filter-options')}>
                        {filter.options.map((option) => (
                            <li key={option} 
                                className={
                                    cx('filter-option', 
                                    { checked: selectedOptions[filter.name]?.includes(option) })}
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions[filter.name]?.includes(option)}
                                        onChange={() => handleOptionClick(filter.name, option)}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            {(hasSelectedFilters)&& (
               <Button 
                    children={'ClearFilter'} 
                    onClick={handleClearFilters} 
                    className={cx('delete-button')} 
                />
            )}
        </div>
        </>
    );
};

export default Filter;