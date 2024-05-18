import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserAddress.module.scss';
import Button from '../../../components/Button/Button';
import { FaArrowLeft } from "react-icons/fa6";
import ChangeAddress from '../../../components/ChangeAddress/ChangeAddress';
import { OrderContext } from '../../ContextOrder/OrderContext';

const cx = classNames.bind(styles);

const UserAddress = () => {
    const [products, setProducts, address, setAddress] = useContext(OrderContext)
    useEffect(() => {
        console.log(address + "asdf");
    }, [address])

    const [showPopup, setShowPopup] = useState(false);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

    const handleShowPopup = (isAddingNew) => {
        setShowPopup(true);
        setIsAddingNewAddress(isAddingNew);
    };

    const handleAddNewAddress = (newAddress) => {
        // setAddresses([...addresses, { address: newAddress, isDefault: false }]);
        setShowPopup(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={'/user/profile'}>
                    <FaArrowLeft />
                </Link>
                <h2>Địa chỉ của tôi</h2>

            </div>
            <div className={cx('address-item')}>
                <div className={cx('address-details')}>
                    <p>{address}</p>

                </div>
            </div>

            <div className={cx('new__address')}>
                <Button onClick={() => handleShowPopup(true)}>
                    Thêm địa chỉ
                </Button>
            </div>
            {showPopup && (
                <ChangeAddress
                    onClose={() => setShowPopup(false)}
                    setAddress={setAddress}
                    isAddingNewAddress={isAddingNewAddress}
                    onAddNewAddress={handleAddNewAddress}
                />
            )}
        </div>
    );
};

export default UserAddress;