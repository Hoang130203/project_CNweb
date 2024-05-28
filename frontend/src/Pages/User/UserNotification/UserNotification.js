import React, { useContext, useEffect } from 'react'
import Notification from '../../../components/notification/notification'
import styles from './UserNotification.module.scss';
import classNames from 'classnames/bind';
import { NotificationContext } from '../../ContextOrder/NotificationContext';
const cx = classNames.bind(styles);
export default function UserNotification({

}
) {
  const [notifications, setNotifications, oldNotifications, setOldNotifications] = useContext(NotificationContext);
  useEffect(() => {
    document.title = 'Thông báo';
  }, []);
  return (
    <div className={cx('notification')}>

      <div className={cx('notification-title')}>
        <h1>
          Thông báo
        </h1>
      </div>

      <div className='element'>
        {
          notifications.toReversed().map((notification, index) => {
            return <Notification key={index} ID={notification.id} time={'vừa xong'} content={notification.content} orderCode={notification.orderId} typeOf={notification.typeOf}></Notification>
          })
        }
        {
          oldNotifications.toReversed().map((notification, index) => {
            return <Notification key={index} ID={notification.id} time={notification.date} content={notification.content} orderCode={notification.orderId} typeOf={notification.typeOf}></Notification>
          })
        }

      </div>
    </div>
  )
}
