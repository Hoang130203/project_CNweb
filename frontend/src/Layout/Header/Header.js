import classNames from 'classnames/bind';
import styles from '../Layout.module.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles)

// Điều hướng khi bấm vào icon tài khoản
function DivAcc() {
    return (<div className={cx('frame2')} id='hehe'>
    <div className={cx('group9')}>
        {/* Icon hình người */}
        <div className={cx('group8')} style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45" fill="none">
                <path d="M39.1666 39.8162V36.0662C39.1666 34.0771 38.3413 32.1694 36.8723 30.7629C35.4033 29.3564 33.4108 28.5662 31.3333 28.5662H15.6666C13.5891 28.5662 11.5967 29.3564 10.1276 30.7629C8.65861 32.1694 7.83331 34.0771 7.83331 36.0662V39.8162" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M23.5 20.625C27.8262 20.625 31.3333 17.2671 31.3333 13.125C31.3333 8.98286 27.8262 5.625 23.5 5.625C19.1738 5.625 15.6667 8.98286 15.6667 13.125C15.6667 17.2671 19.1738 20.625 23.5 20.625Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p style={{ marginLeft: '10px',  fontFamily: 'Itim', fontSize: '32px', color: '#000000'}}>Tài khoản</p>
        </div>

        {/* Icon hình chuông */}
        <div className={cx('group7')} style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="42" viewBox="0 0 47 42" fill="none">
                <path d="M35.25 14C35.25 11.2152 34.0121 8.54451 31.8085 6.57538C29.605 4.60625 26.6163 3.5 23.5 3.5C20.3837 3.5 17.395 4.60625 15.1915 6.57538C12.9879 8.54451 11.75 11.2152 11.75 14C11.75 26.25 5.875 29.75 5.875 29.75H41.125C41.125 29.75 35.25 26.25 35.25 14Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M26.8879 36.75C26.5436 37.2804 26.0494 37.7206 25.4549 38.0267C24.8603 38.3327 24.1862 38.4938 23.5 38.4938C22.8138 38.4938 22.1397 38.3327 21.5451 38.0267C20.9506 37.7206 20.4564 37.2804 20.1121 36.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p style={{ marginLeft: '10px',  fontFamily: 'Itim', fontSize: '32px', color: '#000000' }}>Thông báo</p>
        </div>

        {/* Icon đăng xuất */}
        <div className={cx('group6')} style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                <path d="M13.875 32.375H7.70833C6.89058 32.375 6.10632 32.0501 5.52809 31.4719C4.94985 30.8937 4.625 30.1094 4.625 29.2917V7.70833C4.625 6.89058 4.94985 6.10632 5.52809 5.52809C6.10632 4.94985 6.89058 4.625 7.70833 4.625H13.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.6667 26.2083L32.375 18.5L24.6667 10.7917" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32.375 18.5H13.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p style={{ marginLeft: '12px',  fontFamily: 'Itim', fontSize: '32px', color: '#000000' }}>Đăng xuất</p>
        </div>
    </div>
</div>)
}



function Header() {
    // Hiện, ẩn khi bấm vào accImg
    const [clickAcc, setClickAcc] = useState(true)

    // Hiện, ẩn khi tìm kiếm (ẩn khi bấm vào input, khi trong input có dữ liệu, hiện lại khi trong thẻ input o có gì)
    const [search, setSearch] = useState('block')

    // Nội dung trong thẻ input
    const [valueInput, setValueInput] = useState('')

    // Hiện frame2
    const handleClickAcc = () => {
        setClickAcc(!clickAcc)
        if(clickAcc){
            document.getElementById('hehe').style.right = "3px";
        }else{
            document.getElementById('hehe').style.right = "-300px";
        }    
    }

    // Focus vào input khi nhấn vào icon + text
    const focusInput = () => {
      const input = document.getElementById("myInput");
      input.focus();
      setSearch('none')
    };

    useEffect(() => {
      
      if (valueInput !== '') {
        setSearch('none')
      } else {
        setSearch('block')
        
      }

    }, [valueInput]) 

    return (
        <div className={cx('header')}>
            
            {/* Logo trở về home */}
            <div className={cx('group1')} style={{ position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none" className={cx('icon')}>
                <g clip-path="url(#clip0_1_3)">
                  <path d="M3.28125 70H33.9062C34.1963 70 34.4745 69.8848 34.6796 69.6796C34.8848 69.4745 35 69.1963 35 68.9062C35 68.6162 34.8848 68.338 34.6796 68.1329C34.4745 67.9277 34.1963 67.8125 33.9062 67.8125H3.28125C2.99117 67.8125 2.71297 67.6973 2.50785 67.4921C2.30273 67.287 2.1875 67.0088 2.1875 66.7188V3.28125C2.1875 2.99117 2.30273 2.71297 2.50785 2.50785C2.71297 2.30273 2.99117 2.1875 3.28125 2.1875H49.2188C49.5088 2.1875 49.787 2.30273 49.9921 2.50785C50.1973 2.71297 50.3125 2.99117 50.3125 3.28125V14.2188C50.3125 14.5088 50.4277 14.787 50.6329 14.9921C50.838 15.1973 51.1162 15.3125 51.4062 15.3125C51.6963 15.3125 51.9745 15.1973 52.1796 14.9921C52.3848 14.787 52.5 14.5088 52.5 14.2188V3.28125C52.5 1.47219 51.0278 0 49.2188 0H3.28125C1.47219 0 0 1.47219 0 3.28125V66.7188C0 68.5278 1.47219 70 3.28125 70Z" fill="black"/>
                  <path d="M39.375 22.9688V66.7188C39.375 68.5278 40.8472 70 42.6562 70H66.7188C68.5278 70 70 68.5278 70 66.7188V22.9688C70 21.1597 68.5278 19.6875 66.7188 19.6875H42.6562C40.8472 19.6875 39.375 21.1597 39.375 22.9688ZM67.8125 22.9688V66.7188C67.8125 67.0088 67.6973 67.287 67.4921 67.4921C67.287 67.6973 67.0088 67.8125 66.7188 67.8125H42.6562C42.3662 67.8125 42.088 67.6973 41.8829 67.4921C41.6777 67.287 41.5625 67.0088 41.5625 66.7188V22.9688C41.5625 22.6787 41.6777 22.4005 41.8829 22.1954C42.088 21.9902 42.3662 21.875 42.6562 21.875H66.7188C67.0088 21.875 67.287 21.9902 67.4921 22.1954C67.6973 22.4005 67.8125 22.6787 67.8125 22.9688Z" fill="black"/>
                  <path d="M26.25 63.4375C27.4581 63.4375 28.4375 62.4581 28.4375 61.25C28.4375 60.0419 27.4581 59.0625 26.25 59.0625C25.0419 59.0625 24.0625 60.0419 24.0625 61.25C24.0625 62.4581 25.0419 63.4375 26.25 63.4375Z" fill="black"/>
                  <path d="M54.6875 63.4375C55.8956 63.4375 56.875 62.4581 56.875 61.25C56.875 60.0419 55.8956 59.0625 54.6875 59.0625C53.4794 59.0625 52.5 60.0419 52.5 61.25C52.5 62.4581 53.4794 63.4375 54.6875 63.4375Z" fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0_1_3">
                    <rect width="70" height="70" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <Link to='/' className={cx('logo')} style={{ color: '#000000', marginRight: '30px', position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '70px' }}>w15store</Link>
            </div>
  
            {/* Các trang con */}
            <div className={cx('group2')} style={{ color: '#fff', padding: '5px' }}>                
                <Link to='/hot' className={cx('headerText')} style={{ color: '#403F3F', marginRight: '30px' }}>Hot</Link>
                <Link to='/new' className={cx('headerText')} style={{ color: '#403F3F', marginRight: '30px' }}>New</Link>
                <Link to='/type' className={cx('headerText')} style={{ color: '#403F3F', marginRight: '30px' }}>Thể loại</Link>
                <Link to='/following' className={cx('headerText')} style={{ color: '#403F3F', marginRight: '30px' }}>Theo dõi</Link>
            </div>

            {/* Tìm kiếm */}
            <div className={cx('group5')} >
              <div style={{ position: 'relative', display: 'inline-block' }} >
                <input id='myInput' className={cx('group4')} value={valueInput} onChange={e => setValueInput(e.target.value)} />
                <p onClick={focusInput} style={{display: search, position: 'absolute', top: '6%', transform: 'translateY(-50%)', right: '280px', fontFamily: 'Itim', fontSize: '32px', color: '#9C9C9C'}}>Tìm kiếm</p>
                <svg onClick={focusInput} className={cx('magnifier-icon')} xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 40 35" fill="none" style={{display: search, position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                  <g clipPath="url(#clip0_1_19)">
                    <path d="M18.6145 27.7083C25.8283 27.7083 31.6762 22.485 31.6762 16.0417C31.6762 9.59834 25.8283 4.375 18.6145 4.375C11.4008 4.375 5.55292 9.59834 5.55292 16.0417C5.55292 22.485 11.4008 27.7083 18.6145 27.7083Z" stroke="#717171" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M36.9008 33.1081L28.0842 24.5946" stroke="#717171" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1_19">
                      <rect width="39.1849" height="35" fill="white" transform="translate(0.6548)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Giỏ hàng */}
            <div className={cx('shoping-bag')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="54" viewBox="0 0 50 54" fill="none">
                    <path d="M12.5 4.5L6.25 13.5V45C6.25 46.1935 6.68899 47.3381 7.47039 48.182C8.25179 49.0259 9.3116 49.5 10.4167 49.5H39.5833C40.6884 49.5 41.7482 49.0259 42.5296 48.182C43.311 47.3381 43.75 46.1935 43.75 45V13.5L37.5 4.5H12.5Z" stroke="#6B6B6B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.25 13.5H43.75" stroke="#6B6B6B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M33.3334 22.5C33.3334 24.887 32.4554 27.1761 30.8926 28.864C29.3298 30.5518 27.2102 31.5 25 31.5C22.7899 31.5 20.6703 30.5518 19.1075 28.864C17.5447 27.1761 16.6667 24.887 16.6667 22.5" stroke="#6B6B6B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

            {/* Tài khoản */}
            <button className={cx('acc')} onClick={handleClickAcc}>
                <img className={cx('accImg')} alt='accImg' src='https://s3-alpha-sig.figma.com/img/0e69/55b5/ac6bae2245e3befa7985f1a3d42889b3?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IyN1A2uNyIa14KOrBbMXHDFKCcU0hN3Mpg-K9-dK-fNXHtEMj3pbdpQQDerLTL74BS~CyniPznCxK00NU3Pao4xjUYYeU9HgfmH9jhTCK4TtU-0xITaboFq7BJoDBNo476G2Qynv3~h~O7DErvDWTYp8T6Fc3v0-9GtyAuJY7Qi4jcJVzwHDgZ2v2ix5V747i-0c5riIAjzr8nyAqJKk0eE4jOW2WztoaKmdWnM5S~nqLzCem~mfoiLFiw2MB52PjN3nzv-ZxR-Nn2TdVyuGuMcbgceyKR6KLZFhbA-Prhawt6sZQbWUw0blcv8LRTA1Tzi9D0f9IfJvRtErS6W63g__' />
            </button>
            
            {/* Điều hướng khi bấm vào icon tài khoản */}
            {<DivAcc />}

        </div>
    );
}

export default Header;