import React from 'react';
import styles from './RadioButton.module.scss';
import classNames from 'classnames/bind';
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { useState } from 'react';




const cx = classNames.bind(styles);

const RadioButton = ({ type, options, onOptionChange, hasDefaultOption = true }) => {
    const [selectedOption, setSelectedOption] = useState(hasDefaultOption ? options[0] : null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    

    return (
        <div className={cx('radio-inputs')}>
            {options.map((option) => (
                <label
                    key={option}
                    className={
                        cx('radio-label',
                            { 'radio-label--selected': selectedOption === option })}
                    onClick={() => onOptionChange(option)}
                >
                    <input
                        className={cx('radio-input')}
                        type={type}
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                    />
                    <span className={cx('radio-tile')}>
                        <span className={cx('radio-icon')}>
                            {option === 'Giá thấp - cao' && <FaSortAmountDown />}
                            {option === 'Giá cao - thấp' && <FaSortAmountDownAlt />}
                            {option === 'Mới nhất' && <MdFiberNew />}
                            {option === 'Bán chạy' && <MdOutlineSell />}
                            {/* Add more conditions for other options */}
                        </span>
                        <span className={cx('radio-label')}>{option}</span>
                    </span>
                </label>
            ))}
        </div>
    );
};

export default RadioButton;
