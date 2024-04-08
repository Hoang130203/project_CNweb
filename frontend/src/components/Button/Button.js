import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Button ({ children, onClick, className }) {
    const buttonClasses = cx('button', className);
    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;