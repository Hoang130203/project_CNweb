import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { Link } from 'react-router-dom';

import Button from '../../../components/Button/Button';
import ChangePasswordPopup from '../../../components/ChangePassword/ChangPassword';
import { OrderContext } from '../../ContextOrder/OrderContext';
import UserApi from '../../../Api/UserApi';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

export default function UserProfile() {
  const [name, setName] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [phone, setPhone] = useState('');
  const [products, setProducts, address, setAddress] = useContext(OrderContext);
  const [avatar, setAvatar] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  useEffect(() => {
    document.title = 'Hồ sơ của tôi';
    let user = localStorage.getItem('w15store_user');
    if (user) {
      user = JSON.parse(user);
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      // setAddress(user.address);
      setAvatar(user.avatar);
      console.log(user);
    }
  }, []);
  const handleShowPopup = () => {
    setShowPopup(true);
  }


  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleChangImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    }
    reader.readAsDataURL(file);
    setFile(file);
  }
  const handleSave = async () => {
    let url = avatar
    if (file != null) {
      await UserApi.PostImage(file).then(res => {
        url = res.data?.url;
        console.log(res);
      });
    }
    UserApi.PutInfo(name, email, phone, address, url).then(res => {
      if (res.status === 200) {
        toast.success('Cập nhật thông tin thành công');
        localStorage.setItem('w15store_user', JSON.stringify({ name, email, phone, address, avatar: url }));
        localStorage.setItem('w15store_avatar', url);
      }
    });
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h2>Hồ sơ của tôi</h2>
        <p>
          Thương xuyên thay đổi mật khẩu để bảo mật tài khoản!
          <span onClick={handleShowPopup}>Đổi mật khẩu</span>
        </p>
      </div>
      <div className={cx('user-info')}>
        <input id='profile_image' type="file" onChange={handleChangImage} style={{ display: 'none' }} />
        <label htmlFor='profile_image' style={{ cursor: 'pointer' }}>
          <div className={cx('avatar')}>
            <img src={avatar || 'https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png'} alt="User Profile" />
          </div>
        </label>
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
            <Link to="/user/profile/address">
              <input
                type="text"
                value={address}
                readOnly
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={cx('actions')}>
        <Button className={'button__save'} onClick={handleSave}>Lưu</Button>
      </div>
      {showPopup && <ChangePasswordPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}