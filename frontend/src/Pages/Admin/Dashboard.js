import styles from './css/admin.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PieChart from './component/PieChart';
import { AreaChart } from './component/AreaChart';
import AdminApi from '../../Api/AdminApi';
import { LoadingContext } from '../..';
import { useQuery } from 'react-query';
const cx = classNames.bind(styles);
function Dashboard() {
    const [loading, setLoading] = useContext(LoadingContext);

    const { data: dashboard, isLoading, isError } = useQuery('dashboard', async () => {
        const res = await AdminApi.DashBoard()
        return res.data;
    },
        {
            cacheTime: 60000,
            refetchOnWindowFocus: false,
            staleTime: 100000,
        });
    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    if (isLoading) return <div></div>;
    if (isError) return <div>Error fetching dashboard data</div>;
    return (
        <div className='no_select'>
            <div className={cx('first_content')}>
                <div className={cx('wrap_pie')}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ color: '#138ed6' }}>Doanh thu </h2>
                        <h3 style={{ color: '#138ed6' }}>hôm nay</h3>
                        <p style={{ color: '#36fadd' }}>{dashboard?.today?.total?.toLocaleString()} vnđ</p>
                        <br />
                        <p>Cửa hàng đã bán được <span style={{ color: 'red' }}>{dashboard?.today?.number?.toLocaleString()}</span> đơn hàng hôm nay</p>
                    </div>
                    <PieChart parts={[{ value: 1 }, { value: 3 }, { value: 5 }]} />
                </div>
                <div className={cx('wrap_pie')}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ color: '#138ed6' }}>Doanh thu </h2>
                        <h3 style={{ color: '#138ed6' }}>tuần này</h3>
                        <p style={{ color: '#36fadd' }}>{dashboard?.thisWeek?.total?.toLocaleString()} vnđ</p>
                        <br />
                        <p>Cửa hàng đã bán được <span style={{ color: 'red' }}>{dashboard?.thisWeek?.number?.toLocaleString()}</span> đơn hàng tuần này</p>
                    </div>
                    <PieChart parts={[{ value: 3 }, { value: 1 }, { value: 5 }, { value: 2 }]} />
                </div>
            </div>
            <div>
                <div>Đơn vị tính (triệu vnđ)</div>
                <AreaChart dashboard={dashboard} />
            </div>
        </div>
    );
}

export default Dashboard;