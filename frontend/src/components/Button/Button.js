import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Button({ children, onClick, className, icon }) {
  const buttonClasses = cx('button', className, {
    'button--with-icon': icon,
  });

  return (
    <button className={buttonClasses} onClick={onClick}>
      {icon && <span className={cx('button__icon')}>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;