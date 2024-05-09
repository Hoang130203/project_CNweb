import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserAddress.module.scss';
import Button from '../../../components/Button/Button';
import { FaArrowLeft } from "react-icons/fa6";
import ChangeAddress from '../../../components/ChangeAddress/ChangeAddress';

const cx = classNames.bind(styles);

const UserAddress = (onClose) => {
    const [addresses, setAddresses] = useState([
        {
            address: 'Số 6, Ngách 12/36 Phố Nguyễn Văn Trỗi, Phường Phương Liệt, Quận Thanh Xuân, Hà Nội',
            isDefault: true,
        },
        {
            address: 'Thôn Phú Trì, Xã Kim Hoa, Huyện Mê Linh, Hà Nội',
            isDefault: false,
        },
    ]);


    const sortAddresses = (addresses) => {
        return addresses.sort((a, b) => {
            if (a.isDefault && !b.isDefault) {
                return -1;
            }
            if (!a.isDefault && b.isDefault) {
                return 1;
            }
            return 0;
        });
    };

    const sortedAddresses = sortAddresses(addresses);
    const [showPopup, setShowPopup] = useState(false);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

    const handleShowPopup = (isAddingNew) => {
        setShowPopup(true);
        setIsAddingNewAddress(isAddingNew);
    };

    const handleAddNewAddress = (newAddress) => {
        setAddresses([...addresses, { address: newAddress, isDefault: false }]);
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
            {sortedAddresses.map((address, index) => (
                <div className={cx('address-item')} key={index}>
                    <div className={cx('address-details')}>
                        <p>{address.address}</p>
                        {address.isDefault && <span className={cx('default-label')}>mặc định</span>}
                    </div>
                    <div className={cx('address-actions')}>
                        <Button onClick={() => handleShowPopup(false)}>Cập nhật</Button>
                    </div>
                </div>
            ))}
            <div className={cx('new__address')}>
                <Button onClick={() => handleShowPopup(true)}>
                    Thêm địa chỉ
                </Button>
            </div>
            {showPopup && (
                <ChangeAddress
                    onClose={() => setShowPopup(false)}
                    isAddingNewAddress={isAddingNewAddress}
                    onAddNewAddress={handleAddNewAddress}
                />
            )}
        </div>
    );
};

export default UserAddress;