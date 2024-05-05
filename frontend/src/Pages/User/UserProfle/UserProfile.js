import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';

import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

export default function UserProfile() {
  const [name, setName] = useState('Nguyễn Văn A');
  const [email, setEmail] = useState('nguyenvana@gmail.com');
  const [phone, setPhone] = useState('0123456789');
  const [address, setAddress] = useState('Số xx, Phường xx, Quận xx, Tỉnh xx');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h2>Hồ sơ của tôi</h2>
        <p>Thương xuyên thay đổi mật khẩu để bảo mật tài khoản! Đổi mật khẩu</p>
      </div>
      <div className={cx('user-info')}>
        <div className={cx('avatar')}>
          <img src="https://i.imgur.com/8Km9tLL.jpg" alt="User Profile" />
        </div>
        <div className={cx('form')}>
          <div className={cx('form-group')}>
            <label>Họ và tên</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div className={cx('form-group')}>
            <label>Email</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className={cx('form-group')}>
            <label>Số điện thoại</label>
            <input type="tel" value={phone} onChange={handlePhoneChange} />
          </div>
          <div className={cx('form-group')}>
            <label>Địa chỉ</label>
            <input type="text" value={address} onChange={handleAddressChange} />
          </div>
        </div>
      </div>
      <div className={cx('actions')}>
        <Button className={'button__save'}>Lưu</Button>
      </div>
    </div>
  );
}