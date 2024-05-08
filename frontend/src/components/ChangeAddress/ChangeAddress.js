import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ChangeAddress.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

const ChangeAddress = ({ onClose }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  // Fetch danh sách tỉnh/thành phố từ API hoặc nguồn dữ liệu khác
  useEffect(() => {
    // Gọi API hoặc lấy dữ liệu tỉnh/thành phố
    const fetchedProvinces = [
      { id: 1, name: 'Hà Nội' },
      { id: 2, name: 'Hồ Chí Minh' },
      // ...
    ];
    setProvinces(fetchedProvinces);
  }, []);

  // Fetch danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
  useEffect(() => {
    if (selectedProvince) {
      // Gọi API hoặc lấy dữ liệu quận/huyện dựa trên tỉnh/thành phố đã chọn
      const fetchedDistricts = [
        { id: 1, name: 'Quận 1' },
        { id: 2, name: 'Quận 2' },
        // ...
      ];
      setDistricts(fetchedDistricts);
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Fetch danh sách xã/phường dựa trên quận/huyện đã chọn
  useEffect(() => {
    if (selectedDistrict) {
      // Gọi API hoặc lấy dữ liệu xã/phường dựa trên quận/huyện đã chọn
      const fetchedWards = [
        { id: 1, name: 'Phường 1' },
        { id: 2, name: 'Phường 2' },
        // ...
      ];
      setWards(fetchedWards);
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleSaveAddress = () => {
    const fullAddress = `${streetAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`;
    // Xử lý logic lưu địa chỉ mới ở đây
    console.log('Địa chỉ mới:', fullAddress);
    // Sau khi lưu địa chỉ thành công, đóng popup
    onClose();
  };

  return (
    <div className={cx('popup')}>
      <div className={cx('popup-content')}>
        <h3>Đổi địa chỉ</h3>
        <div className={cx('form-group')}>
          <label htmlFor="province">Tỉnh/Thành phố</label>
          <select
            id="province"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="district">Quận/Huyện</label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedProvince}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="ward">Phường/Xã</label>
          <select
            id="ward"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            disabled={!selectedDistrict}
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((ward) => (
              <option key={ward.id} value={ward.name}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="streetAddress">Số nhà, đường</label>
          <input
            type="text"
            id="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
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
    </div>
  );
};

export default ChangeAddress;