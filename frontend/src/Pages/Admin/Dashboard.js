import styles from './css/admin.module.scss';
import React from 'react';
import classNames from 'classnames/bind';
import PieChart from './component/PieChart';
import { AreaChart } from './component/AreaChart';
const cx = classNames.bind(styles);
function Dashboard() {
    return (
        <div>
            <div className={cx('first_content')}>
                <div className={cx('wrap_pie')}>
                    <div>
                        <h2 style={{ color: '#138ed6' }}>Doanh thu </h2>
                        <h3 style={{ color: '#138ed6' }}>hôm nay</h3>
                        <p style={{ color: '#36fadd' }}>15,000,000 vnđ</p>
                        <br />
                        <p>Cửa hàng đã bán được <span style={{ color: 'red' }}>3</span> sản phẩm hôm nay</p>
                    </div>
                    <PieChart parts={[{ value: 1 }, { value: 3 }, { value: 5 }]} />
                </div>
                <div className={cx('wrap_pie')}>
                    <div>
                        <h2 style={{ color: '#138ed6' }}>Doanh thu </h2>
                        <h3 style={{ color: '#138ed6' }}>tuần này</h3>
                        <p style={{ color: '#36fadd' }}>100,000,000 vnđ</p>
                        <br />
                        <p>Cửa hàng đã bán được <span style={{ color: 'red' }}>20</span> sản phẩm tuần này</p>
                    </div>
                    <PieChart parts={[{ value: 3 }, { value: 1 }, { value: 5 }, { value: 2 }]} />
                </div>
            </div>
            <div>
                <div>Đơn vị tính (triệu vnđ)</div>
                <AreaChart />
            </div>
        </div>
    );
}

export default Dashboard;