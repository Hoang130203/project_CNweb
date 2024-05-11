import React from 'react'
import Notification from '../../../components/notification/notification'
import styles from './UserNotification.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
export default function UserNotification({
  
}
) {
  return (
    <div className={cx('notification')}>
      {/* tiêu đề */}
      <div className={cx('notification-title')}>
        <h1>
        Thông báo
        </h1>
      </div>
      {/* thông báo */}
      <div className='element'>
        <Notification ID={"123"} time={"456"} content={"789"} orderCode={"899"} typeOf={"123"}></Notification>
      </div>
      
    </div>
  )
}
