import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import Button from '../Button/Button';
import UserApi from '../../Api/UserApi';
import { toast } from 'react-toastify';
import { LoadingContext } from '../..';

const cx = classNames.bind(styles);

const ChangePasswordPopup = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value);
  const [loading, setLoading] = useContext(LoadingContext);

  const handleOldPasswordBlur = () => {
    if (!oldPassword) {
      setOldPasswordError('Mật khẩu cũ không được bỏ trống');
    } else {
      setOldPasswordError('');
    }
  };

  const handleNewPasswordBlur = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!newPassword) {
      setNewPasswordError('Mật khẩu mới không được bỏ trống');
    } else if (!passwordRegex.test(newPassword)) {
      setNewPasswordError('Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất 1 số và 1 chữ');
    } else {
      setNewPasswordError('');
    }
  };

  const handleConfirmNewPasswordBlur = () => {
    if (!confirmNewPassword) {
      setConfirmNewPasswordError('Nhập lại mật khẩu mới không được bỏ trống');
    } else if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError('Mật khẩu nhập lại không khớp');
    } else {
      setConfirmNewPasswordError('');
    }
  };

  const handleSavePassword = async () => {
    setOldPasswordError('');
    setNewPasswordError('');
    setConfirmNewPasswordError('');

    if (!oldPassword) {
      setOldPasswordError('Mật khẩu cũ không được bỏ trống');
      return;
    }

    if (!newPassword) {
      setNewPasswordError('Mật khẩu mới không được bỏ trống');
      return;
    }

    if (!confirmNewPassword) {
      setConfirmNewPasswordError('Nhập lại mật khẩu mới không được bỏ trống');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError('Mật khẩu nhập lại không khớp');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError('Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất 1 số và 1 chữ');
      return;
    }

    setLoading(true);
    UserApi.ChangePassword(oldPassword, newPassword)
      .then((res) => {
        if (res.data === newPassword) {
          toast.success('Đổi mật khẩu thành công');
          onClose();
        } else {
          setOldPasswordError('Sai mật khẩu cũ');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
            onBlur={handleOldPasswordBlur}
          />
          {oldPasswordError && <div className={cx('error')}>{oldPasswordError}</div>}
        </div>
        <div className={cx('form-group')}>
          <label>Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            onBlur={handleNewPasswordBlur}
          />
          {newPasswordError && <div className={cx('error')}>{newPasswordError}</div>}
        </div>
        <div className={cx('form-group')}>
          <label>Nhập lại mật khẩu mới</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            onBlur={handleConfirmNewPasswordBlur}
          />
          {confirmNewPasswordError && <div className={cx('error')}>{confirmNewPasswordError}</div>}
        </div>
        <div className={cx('actions')}>
          <Button onClick={handleSavePassword} className={'button__save'}>
            Lưu
          </Button>
          <Button onClick={onClose} className={'delete-button'}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;