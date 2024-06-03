import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import phoneImg from '../../Assets/Phone.png';
import laptopImg from '../../Assets/Laptop.png';
import watchImg from '../../Assets/Watch.png';
import accessoryImg from '../../Assets/Accessory.png';
import CardProduct from '../../components/CardProduct/CardProduct';
// import products from '../../components/ProductData/ProductData';
import { useContext, useEffect, useState } from 'react';
import UserApi from '../../Api/UserApi';
import { Link } from 'react-router-dom';
import { LoadingContext } from '../..';
import { useQuery } from 'react-query';
import { doc } from 'prettier';


const cx = classNames.bind(styles);
function HomePage() {
    // const [products, setProducts] = useState([])
    // const [loading, setLoading] = useContext(LoadingContext)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await UserApi.GetNewProducts();
    //             setProducts(res.data);
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, [setLoading])
    const [loading, setLoading] = useContext(LoadingContext);

    const { data: products, isLoading, isError } = useQuery('newProducts', async () => {
        const res = await UserApi.GetNewProducts();
        return res.data;
    },
        {
            cacheTime: 6000,
            refetchOnWindowFocus: false,
            staleTime: 10000,
        });

    useEffect(() => {
        document.title = 'Trang chủ';
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching products</div>;
    return (
        <div className={cx('homepage')} >
            <h1>
                Hãy mua ngay để nhận ưu đãi tốt nhất!
            </h1>
            <div className={cx('option')} >
                <div className={cx('option__item')} >
                    <Link to='/mobile' style={{ textDecoration: 'none' }}>
                        <img src={phoneImg} alt='option' />
                        <h3>Điện Thoại</h3>
                    </Link>
                </div>
                <div className={cx('option__item')} >
                    <Link to='/laptop' style={{ textDecoration: 'none' }}>
                        <img src={laptopImg} alt='option' />
                        <h3>Laptop</h3>
                    </Link>
                </div>
                <div className={cx('option__item')} >
                    <Link to='/watch' style={{ textDecoration: 'none' }}>
                        <img src={watchImg} alt='option' />
                        <h3>Đồng Hồ</h3>
                    </Link>
                </div>
                <div className={cx('option__item')} >
                    <Link to='/accessory' style={{ textDecoration: 'none' }}>
                        <img src={accessoryImg} alt='option' />
                        <h3>Phụ Kiện</h3>
                    </Link>
                </div>
            </div>
            <div className={cx('item__container')} >
                <h2>Sản phẩm mới nhất</h2>
                <div className={cx('item')} >
                    {products.map((product) => (
                        <CardProduct
                            key={product.id}
                            id={product.id}
                            image={product.images[0]?.url}
                            name={product.name}
                            discount={product.promotion > 0 ? 'Giảm ' + product.promotion + '%' : null}
                            oldPrice={product.promotion > 0 ? product.cost : null}
                            newPrice={product.cost - product.cost * product.promotion / 100}
                            rating={product.rate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;