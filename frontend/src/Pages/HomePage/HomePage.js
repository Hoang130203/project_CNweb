import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import phoneImg from '../../Assets/Phone.png';
import laptopImg from '../../Assets/Laptop.png';
import watchImg from '../../Assets/Watch.png';
import accessoryImg from '../../Assets/Accessory.png';
import CardProduct from '../../components/CardProduct/CardProduct';


const cx = classNames.bind(styles);
function HomePage() {
    const products = [
        {
            "image": 'https://s3-alpha-sig.figma.com/img/0271/5dc5/c86f78d634738e88fbc968d289b07049?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NkMBD5FlUajozYnEQS6dJTjFPKVAYIJrU0xHlSCzGxdqEs1o9E-F4TQEMrRISPkOczXykxdjkJnWjr3kpaY8u-88P5kCNZssFbOpeouADryois3IrvPYRtpSK54bwKNXmGYXSdrFIc1~dXFOPXMdSjrhWXaI4ltIF0h9XR~z1Dpn1v5xXvC9qYh5LIUWpcLgIaU9uXYaAlBLnal09YKdMu49U28dR0qfDDVQhPWmM69WvrBpx89MmTCSob7nGIhi08EXBsADT2d61Gh-pC9bYhhArsJqpYU3aawXdJJOh8COxcDr6Mui6ezLOpdSaOweMK-E4qKxxYWHE7GhtIKGJw__',
            "name": 'Realme C25s',
            "discount": 'Giảm 10%',
            "oldPrice": '3.500.000',
            "newPrice": '3.150.000'
        },
        {
            "image": 'https://s3-alpha-sig.figma.com/img/0271/5dc5/c86f78d634738e88fbc968d289b07049?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NkMBD5FlUajozYnEQS6dJTjFPKVAYIJrU0xHlSCzGxdqEs1o9E-F4TQEMrRISPkOczXykxdjkJnWjr3kpaY8u-88P5kCNZssFbOpeouADryois3IrvPYRtpSK54bwKNXmGYXSdrFIc1~dXFOPXMdSjrhWXaI4ltIF0h9XR~z1Dpn1v5xXvC9qYh5LIUWpcLgIaU9uXYaAlBLnal09YKdMu49U28dR0qfDDVQhPWmM69WvrBpx89MmTCSob7nGIhi08EXBsADT2d61Gh-pC9bYhhArsJqpYU3aawXdJJOh8COxcDr6Mui6ezLOpdSaOweMK-E4qKxxYWHE7GhtIKGJw__',
            "name": 'Realme C25s',
            "newPrice": '3.150.000'
        },
        {
            "image": 'https://s3-alpha-sig.figma.com/img/0271/5dc5/c86f78d634738e88fbc968d289b07049?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NkMBD5FlUajozYnEQS6dJTjFPKVAYIJrU0xHlSCzGxdqEs1o9E-F4TQEMrRISPkOczXykxdjkJnWjr3kpaY8u-88P5kCNZssFbOpeouADryois3IrvPYRtpSK54bwKNXmGYXSdrFIc1~dXFOPXMdSjrhWXaI4ltIF0h9XR~z1Dpn1v5xXvC9qYh5LIUWpcLgIaU9uXYaAlBLnal09YKdMu49U28dR0qfDDVQhPWmM69WvrBpx89MmTCSob7nGIhi08EXBsADT2d61Gh-pC9bYhhArsJqpYU3aawXdJJOh8COxcDr6Mui6ezLOpdSaOweMK-E4qKxxYWHE7GhtIKGJw__',
            "name": 'Realme C25s',
            "discount": 'Giảm 10%',
            "oldPrice": '3.500.000',
            "newPrice": '3.150.000'
        },
        {
            "image": 'https://s3-alpha-sig.figma.com/img/0271/5dc5/c86f78d634738e88fbc968d289b07049?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NkMBD5FlUajozYnEQS6dJTjFPKVAYIJrU0xHlSCzGxdqEs1o9E-F4TQEMrRISPkOczXykxdjkJnWjr3kpaY8u-88P5kCNZssFbOpeouADryois3IrvPYRtpSK54bwKNXmGYXSdrFIc1~dXFOPXMdSjrhWXaI4ltIF0h9XR~z1Dpn1v5xXvC9qYh5LIUWpcLgIaU9uXYaAlBLnal09YKdMu49U28dR0qfDDVQhPWmM69WvrBpx89MmTCSob7nGIhi08EXBsADT2d61Gh-pC9bYhhArsJqpYU3aawXdJJOh8COxcDr6Mui6ezLOpdSaOweMK-E4qKxxYWHE7GhtIKGJw__',
            "name": 'Realme C25s',
            "discount": 'Giảm 10%',
            "oldPrice": '3.500.000',
            "newPrice": '3.150.000'
        },
        {
            "image": 'https://s3-alpha-sig.figma.com/img/0271/5dc5/c86f78d634738e88fbc968d289b07049?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NkMBD5FlUajozYnEQS6dJTjFPKVAYIJrU0xHlSCzGxdqEs1o9E-F4TQEMrRISPkOczXykxdjkJnWjr3kpaY8u-88P5kCNZssFbOpeouADryois3IrvPYRtpSK54bwKNXmGYXSdrFIc1~dXFOPXMdSjrhWXaI4ltIF0h9XR~z1Dpn1v5xXvC9qYh5LIUWpcLgIaU9uXYaAlBLnal09YKdMu49U28dR0qfDDVQhPWmM69WvrBpx89MmTCSob7nGIhi08EXBsADT2d61Gh-pC9bYhhArsJqpYU3aawXdJJOh8COxcDr6Mui6ezLOpdSaOweMK-E4qKxxYWHE7GhtIKGJw__',
            "name": 'Realme C25s',
            "discount": 'Giảm 10%',
            "oldPrice": '3.500.000',
            "newPrice": '3.150.000'
        },
        {
            "image": 'https://s3-alpha-sig.figma.com/img/0271/5dc5/c86f78d634738e88fbc968d289b07049?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NkMBD5FlUajozYnEQS6dJTjFPKVAYIJrU0xHlSCzGxdqEs1o9E-F4TQEMrRISPkOczXykxdjkJnWjr3kpaY8u-88P5kCNZssFbOpeouADryois3IrvPYRtpSK54bwKNXmGYXSdrFIc1~dXFOPXMdSjrhWXaI4ltIF0h9XR~z1Dpn1v5xXvC9qYh5LIUWpcLgIaU9uXYaAlBLnal09YKdMu49U28dR0qfDDVQhPWmM69WvrBpx89MmTCSob7nGIhi08EXBsADT2d61Gh-pC9bYhhArsJqpYU3aawXdJJOh8COxcDr6Mui6ezLOpdSaOweMK-E4qKxxYWHE7GhtIKGJw__',
            "name": 'Realme C25s',
            "discount": 'Giảm 10%',
            "oldPrice": '3.500.000',
            "newPrice": '3.150.000'
        },
        {
            "image": 'https://s3-alpha-sig.figma.com/img/0271/5dc5/c86f78d634738e88fbc968d289b07049?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NkMBD5FlUajozYnEQS6dJTjFPKVAYIJrU0xHlSCzGxdqEs1o9E-F4TQEMrRISPkOczXykxdjkJnWjr3kpaY8u-88P5kCNZssFbOpeouADryois3IrvPYRtpSK54bwKNXmGYXSdrFIc1~dXFOPXMdSjrhWXaI4ltIF0h9XR~z1Dpn1v5xXvC9qYh5LIUWpcLgIaU9uXYaAlBLnal09YKdMu49U28dR0qfDDVQhPWmM69WvrBpx89MmTCSob7nGIhi08EXBsADT2d61Gh-pC9bYhhArsJqpYU3aawXdJJOh8COxcDr6Mui6ezLOpdSaOweMK-E4qKxxYWHE7GhtIKGJw__',
            "name": 'Realme C25s',
            "discount": 'Giảm 10%',
            "oldPrice": '3.500.000',
            "newPrice": '3.150.000'
        },
    ];
    return (
        <div className={cx('homepage')} >
            <h1>
                Hãy mua ngay để nhận ưu đãi tốt nhất!
            </h1>
            <div className={cx('option')} >
                <div className={cx('option__item')} >
                    <img src={phoneImg} alt='option' />
                    <h3>Điện Thoại</h3>
                </div>
                <div className={cx('option__item')} style={{ width: '295px' }}>
                    <img src={laptopImg} alt='option' />
                    <h3>Laptop</h3>
                </div>
                <div className={cx('option__item')} style={{ width: '295px' }}>
                    <img src={watchImg} alt='option' />
                    <h3>Đồng Hồ</h3>
                </div>
                <div className={cx('option__item')} style={{ width: '295px' }}>
                    <img src={accessoryImg} alt='option' />
                    <h3>Phụ Kiện</h3>
                </div>
            </div>
            <div className={cx('item__container')} >
                <h2>Sản phẩm mới nhất</h2>
                <div className={cx('item')} >
                    {products.map((product, index) => (
                        <CardProduct
                            key={index}
                            image={product.image}
                            name={product.name}
                            discount={product.discount}
                            oldPrice={product.oldPrice}
                            newPrice={product.newPrice}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;