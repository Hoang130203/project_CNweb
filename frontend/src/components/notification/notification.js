import classNames from 'classnames/bind';
import styles from './notification.module.scss'
const cx = classNames.bind(styles);
export default function Notification({
    ID,
    time,
    orderCode,
    content,
    typeOf,
}){
    return(
        <div className={cx('container')}>
            <div className={cx('notification-id')}>
                <div className={cx('flex-line')}>ID: <p style={{
                    color: 'green'
                }}>{ID}</p></div>
                <div className={cx('flex-line')}>Order Code: <p style={{
                    color: 'red'
                }}>{orderCode}</p></div>
            </div>

            <div className={cx('notification-content')}>
                <div className={cx('flex-line')}>Time: <p style={{
                    color: 'brown'
                }}>{time}</p></div>
                <div className={cx('flex-line')}>Nội dung: <p style={{
                    color: 'blue'
                }}>{content}</p></div>
            </div>
        </div>
    );
}