import classNames from 'classnames/bind';
import styles from '../Layout.module.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles)

function DivAcc() {
    return (<div className={cx('frame2')} id='hehe'>
    <div className={cx('group9')}>
        <div className={cx('group8')}>Tài khoản</div>
        <div className={cx('group7')}>Thông báo</div>
        <div className={cx('group6')}>Đăng xuất</div>
    </div>
</div>)
}

function Header() {
    const [clickAcc, setClickAcc] = useState(false)

    const handleClickAcc = () => {
        setClickAcc(!clickAcc)
        if(clickAcc){
            document.getElementById('hehe').style.right = "3px";
        }else{
            document.getElementById('hehe').style.right = "-300px";
        }

        
    }

    return (
        <div className={cx('header')}>
            <div className={cx('group1')}>
                <Link to='/' className={cx('logo')} style={{ color: '#000000', marginRight: '30px' }}>w15store</Link>
            </div>   
            <div className={cx('group2')} style={{ color: '#fff', padding: '5px' }}>                
                <Link to='/hot' className={cx('headerText')} style={{ color: '#403F3F', marginRight: '30px' }}>Hot</Link>
                <Link to='/new' className={cx('headerText')} style={{ color: '#403F3F', marginRight: '30px' }}>New</Link>
                <Link to='/type' className={cx('headerText')} style={{ color: '#403F3F', marginRight: '30px' }}>Thể loại</Link>
                <Link to='/following' className={cx('headerText')} style={{ color: '#403F3F', marginRight: '30px' }}>Theo dõi</Link>
            </div>
            <div className={cx('group5')}>
                <div className='kinhLup'></div>
                <input className={cx('group4')} placeholder='Tìm kiếm' />
                {/* <Link to='/login' style={{ color: '#fff', marginRight: '30px' }}>Login</Link>
                <Link to='/register' style={{ color: '#fff' }}>Register</Link> */}
            </div>
            <button className={cx('acc')} onClick={handleClickAcc}>
                <img className={cx('accImg')} alt='accImg' src='https://s3-alpha-sig.figma.com/img/0e69/55b5/ac6bae2245e3befa7985f1a3d42889b3?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IyN1A2uNyIa14KOrBbMXHDFKCcU0hN3Mpg-K9-dK-fNXHtEMj3pbdpQQDerLTL74BS~CyniPznCxK00NU3Pao4xjUYYeU9HgfmH9jhTCK4TtU-0xITaboFq7BJoDBNo476G2Qynv3~h~O7DErvDWTYp8T6Fc3v0-9GtyAuJY7Qi4jcJVzwHDgZ2v2ix5V747i-0c5riIAjzr8nyAqJKk0eE4jOW2WztoaKmdWnM5S~nqLzCem~mfoiLFiw2MB52PjN3nzv-ZxR-Nn2TdVyuGuMcbgceyKR6KLZFhbA-Prhawt6sZQbWUw0blcv8LRTA1Tzi9D0f9IfJvRtErS6W63g__' />
            </button>
            
            {<DivAcc />}

        </div>
    );
}

export default Header;