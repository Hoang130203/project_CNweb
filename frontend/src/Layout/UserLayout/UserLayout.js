import React from 'react'
import styles from './UserLayout.module.scss'
import classNames from 'classnames/bind';

import Header from '../Header/Header';
import SideBar from './SideBar/SideBar';

const cx = classNames.bind(styles);


export default function UserLayout({ children }) {
  return (
    <div className={cx('wrap')}>
      <Header />
      <SideBar />
      <div className={cx('children')}>
        <div className={cx('content')}>
          {children}
        </div>
      </div>
    </div>
  )
}
