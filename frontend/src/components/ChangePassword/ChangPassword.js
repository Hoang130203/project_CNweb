import {useState} from 'react';

import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';

import Button from '../Button/Button';

const cx = classNames.bind(styles);


const ChangePasswordPopup = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value);

  const handleSavePassword = () => {
    // Xử lý logic đổi mật khẩu ở đây
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
    // Sau khi đổi mật khẩu thành công, đóng popup
    onClose();
  }

  return (
    <div className={cx('popup')}>
      <div className={cx('popup-content')}>
        <h3>Đổi mật khẩu</h3>
        <div className={cx('form-group')}>
          <label>Mật khẩu cũ</label>
          <input
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>
        <div className={cx('form-group')}>
          <label>Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className={cx('form-group')}>
          <label>Nhập lại mật khẩu mới</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          />
        </div>
        <div className={cx('actions')}>
          <Button onClick={handleSavePassword} className={'button__save'}>Lưu</Button>
          <Button onClick={onClose} className={'delete-button'}>Đóng</Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPopup;