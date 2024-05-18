import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';

import Button from '../Button/Button';
import UserApi from '../../Api/UserApi';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);


const ChangePasswordPopup = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value);

  const handleSavePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khẩu mới không khớp");
      return;
    }
    // Xử lý logic đổi mật khẩu
    UserApi.ChangePassword(oldPassword, newPassword).then(res => {
      console.log(res.data);
      if (res.data == newPassword) {
        toast.success("Đổi mật khẩu thành công");
      } else {
        toast.error("Sai mật khẩu cũ");
      }
    });
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