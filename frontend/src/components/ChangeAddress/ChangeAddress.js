import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ChangeAddress.module.scss';
import Button from '../Button/Button';
import addressData from './address-data.json';
const cx = classNames.bind(styles);

const ChangeAddress = ({ onClose, setAddress }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const citisRef = useRef(null);
  const districtsRef = useRef(null);
  const wardsRef = useRef(null);

  useEffect(() => {
    // Load address data
    renderCity(addressData);
  }, []);

  const renderCity = (data) => {
    data.forEach((x) => {
      citisRef.current.options[citisRef.current.options.length] = new Option(
        x.Name,
        x.Id
      );
    });
  };

  const handleCityChange = () => {
    districtsRef.current.length = 1;
    wardsRef.current.length = 1;
    if (citisRef.current.value !== "") {
      const result = addressData.filter((n) => n.Id === citisRef.current.value);
      for (const k of result[0].Districts) {
        districtsRef.current.options[
          districtsRef.current.options.length
        ] = new Option(k.Name, k.Id);
      }
    }
  };

  const handleDistrictChange = () => {
    wardsRef.current.length = 1;
    const dataCity = addressData.filter(
      (n) => n.Id === citisRef.current.value
    );
    if (districtsRef.current.value !== "") {
      const dataWards = dataCity[0].Districts.filter(
        (n) => n.Id === districtsRef.current.value
      )[0].Wards;
      for (const w of dataWards) {
        wardsRef.current.options[wardsRef.current.options.length] = new Option(
          w.Name,
          w.Id
        );
      }
    }
  };
  const handleSave = () => {
    const address = `${streetAddress}, ${wardsRef.current.options[wardsRef.current.selectedIndex].text}, ${districtsRef.current.options[districtsRef.current.selectedIndex].text}, ${citisRef.current.options[citisRef.current.selectedIndex].text}`;
    setAddress(address);
    onClose();
  }
  return (
    <div className={cx('popup')}>
      <div className={cx('popup-content')}>
        <h3>Đổi địa chỉ</h3>
        <div className={cx('form-group')}>
          <label htmlFor="province">Tỉnh/Thành phố</label>
          <select
            id="province"
            ref={citisRef} onChange={handleCityChange}
          >
            <option value="">Chọn tỉnh/thành phố</option>
          </select>
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="district">Quận/Huyện</label>
          <select
            id="district"
            ref={districtsRef} onChange={handleDistrictChange}
          // disabled={!selectedProvince}
          >
            <option value="">Chọn quận/huyện</option>

          </select>
        </div>
        <div className={cx('form-group')}>
          <label htmlFor="ward">Phường/Xã</label>
          <select
            id="ward"
            ref={wardsRef}
          // disabled={!selectedDistrict}
          >
            <option value="">Chọn phường/xã</option>
            {
              //wards.map((ward) => (
              //   <option key={ward.id} value={ward.name}>
              //     {ward.name}
              //   </option>
              // ))
            }
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
          <Button onClick={() => {
            handleSave(
            )
          }} className={'button__save'}>
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