// SelectAddress.js
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChangeAddress.module.scss';
import Button from '../../components/Button/Button';
import ChangeAddress from './ChangeAddress';

const cx = classNames.bind(styles);

const SelectAddress = ({ onClose, onSelectAddress, addressList, selected }) => {
    const [selectedAddress, setSelectedAddress] = useState(selected);
    const [showPopup, setShowPopup] = useState(false);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
    console.log('addressList', addressList);

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    const handleSaveAddress = () => {
        onSelectAddress(selectedAddress);
        onClose();
    };

    const handleAddNewAddress = () => {
        console.log('Thêm địa chỉ mới');
    };
    const handleShowPopup = (isAddingNew) => {
        setShowPopup(true);
        setIsAddingNewAddress(isAddingNew);
    };

    return (
        <div className={cx('popup')}>
            <div className={cx('popup-content')}>
                <h3>Địa Chỉ Của Tôi</h3>
                <div className={cx('address-list')}>
                    {addressList.map((address, index) => (
                        <div key={index} className={cx('address-item')}>
                            <div className={cx('address-group')}>
                                <input
                                    type="radio"
                                    name="address"
                                    value={address}
                                    checked={selectedAddress === address}
                                    onChange={() => handleSelectAddress(address)}
                                    className={cx('address-radio')}
                                />
                                <div className={cx('address-info')}>
                                    <span className={cx('address-details')}>{address.address}</span>
                                    {address.isDefault && <span className={cx('default-label')}>mặc định</span>}
                                </div>
                            </div>
                            <Button onClick={() => handleShowPopup(false)} className={'small'}>Cập nhật</Button>
                        </div>
                    ))}
                    <div className={cx('new__address')}>
                        <Button onClick={() => handleShowPopup(true)}>
                            Thêm địa chỉ
                        </Button>
                    </div>
                </div>
                <div className={cx('actions')}>
                    <Button onClick={handleSaveAddress} className={'button__save'}>
                        Lưu
                    </Button>
                    <Button onClick={onClose} className={'delete-button'}>
                        Đóng
                    </Button>
                </div>
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

export default SelectAddress;