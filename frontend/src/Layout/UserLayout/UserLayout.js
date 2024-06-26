import React from 'react'
import styles from './UserLayout.module.scss'
import classNames from 'classnames/bind';

import Header from '../Header/Header';
import SideBar from './SideBar/SideBar';
import ChatBox from '../../components/ChatBox/ChatBox';
import { OrderProvider } from '../../Pages/ContextOrder/OrderContext';
import { NotificationProvider } from '../../Pages/ContextOrder/NotificationContext';
import { NumberProvider } from '../Header/NumberContext';

const cx = classNames.bind(styles);


export default function UserLayout({ children }) {
  return (
    <NotificationProvider>
      <OrderProvider>
        <NumberProvider>
          <div className={cx('wrap')}>
            <Header />
            <SideBar />
            <div className={cx('children')}>
              <div className={cx('content')}>
                {children}
              </div>
            </div>
            <ChatBox />
          </div>
        </NumberProvider>
      </OrderProvider>
    </NotificationProvider>
  )
}
