import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import React, { useState } from 'react';

const cx = classNames.bind(styles);
const NavBar = () => {
    const [showOptions, setShowOptions] = useState(false);

    const handleFilterClick = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div>
            <div onClick={handleFilterClick}>
                <h4>Label</h4>
            </div>
            {showOptions && (
                <div>
                    {/* Render your options here */}
                </div>
            )}
        </div>
    );
};
   
export default NavBar;