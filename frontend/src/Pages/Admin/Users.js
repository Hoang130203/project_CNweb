import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PieChart from './component/PieChart';
import styles from './css/admin.module.scss';
import AdminApi from '../../Api/AdminApi';

const cx = classNames.bind(styles);
function Users() {
    const [base, setBase] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const [pages, setPages] = useState([1]);
    const itemsPerPage = 5; // Số lượng item trên mỗi trang
    const [transactions, setTransactions] = useState([
    ]);
    const [users, setUsers] = useState([

    ]);

    useEffect(() => {
        AdminApi.GetUserDashboardBase().then((response) => {
            setBase(response.data);
        }).catch((error) => {
            console.log(error);
        });
        AdminApi.GetCurrentTransaction().then((res) => {
            console.log(res.data)
            setTransactions(res.data)
        })
        AdminApi.GetALlUsers().then((res) => {
            console.log(res.data)
            setUsers(res.data)
        })
    }, []);
    const onPageChange = (page) => {
        setCurrentPage(page);
    }
    useEffect(() => {
        let totalPage = Math.ceil(users.length / itemsPerPage);
        setTotalPages(totalPage);
        setPages(Array.from({ length: totalPage }, (_, index) => index + 1));

    }, [users]);
    return (
        <div>
            <div className={cx('first_content')}>
                <div className={cx('wrap_pie')}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ color: '#138ed6' }}>Thống kê người dùng </h4>
                        <p>Tổng số người dùng:  <span style={{ color: 'red' }}>{base.countUser}</span> người </p>
                        <br />
                        <p>Số người đã từng mua hàng: <span style={{ color: 'red' }}>{base.countUserpay}</span> người</p>
                        <br />
                        <p>Số lượt đánh giá: <span style={{ color: 'red' }}>{base.countComment} </span>đánh giá </p>
                    </div>
                    <PieChart parts={[{ value: 100 }, { value: 200 }]} />
                </div>
                <div style={{ paddingLeft: '20px' }}>
                    <h3 style={{ fontSize: '18px', color: 'yellow' }}>Giao dịch gần đây</h3>
                    <table>
                        <thead>
                            <tr className={cx('table-header')}>
                                <th>Mã đơn hàng</th>
                                <th>Khách hàng</th>
                                <th>Tổng tiền (đ)</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index} className={cx('table-row')}>
                                    <td>{transaction.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={transaction?.user?.avatar} alt="User" />{transaction?.user?.name}
                                        </div>
                                    </td>
                                    <td>{transaction.money?.toLocaleString()}</td>
                                    <td>{transaction.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <table className={["product-table", 'no_select'].join(' ')}>
                    <thead>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Hình ảnh</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Số tiền đã tiêu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={user.avatar} alt={user.name} className="product-image" /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>{user.paid?.toLocaleString()}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {/* Hiển thị nút "Previous" nếu currentPage > 1 */}
                {currentPage > 1 ? (
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                )
                    : <button className="page-link" disabled>Previous</button>
                }

                {/* Hiển thị các nút trang */}
                {pages.map(page => (
                    <button key={page} className={`page-link ${page === currentPage ? 'active' : ''}`} onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                ))}

                {/* Hiển thị nút "Next" nếu currentPage < totalPages */}
                {currentPage < totalPages ? (
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
                )
                    : <button className="page-link" disabled>Next</button>
                }
            </div>
        </div>
    );
}

export default Users;