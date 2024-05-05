import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PieChart from './component/PieChart';
import styles from './css/admin.module.scss';

const cx = classNames.bind(styles);
function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const [pages, setPages] = useState([1]);
    const itemsPerPage = 5; // Số lượng item trên mỗi trang


    const onPageChange = (page) => {
        setCurrentPage(page);
    }
    const [transactions, setTransactions] = useState([
        {
            orderId: 1,
            userName: "John Doe",
            userImage: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-81.jpg",
            totalAmount: 100000,
            time: "2021-01-01 10:00:00",

        },
        {
            orderId: 2,
            userName: "Jane Doe",
            userImage: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474072oeB/anh-dai-dien-buon-ngau_023706184.jpg",
            totalAmount: 200000,
            time: "2021-01-02 10:00:00",
        },
        {
            orderId: 3,
            userName: "John Smith",
            userImage: "https://moc247.com/wp-content/uploads/2023/10/suu-tam-50-anh-avatar-ngau-cho-nam-dep-buon-an-tuong-nhat_1.jpg",
            totalAmount: 300000,
            time: "2021-01-03 10:00:00",
        },
        {
            orderId: 4,
            userName: "Jane Smith",
            userImage: "https://chungculuxuryparkviews.com/wp-content/uploads/2022/10/anh-avatar-dep-cho-con-gai-ngau-9.jpg",
            totalAmount: 4000000,
            time: "2021-01-04 10:00:00",
        },
        {
            orderId: 5,
            userName: "John Doe",
            userImage: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/avatar-dep-10-1.jpg",
            totalAmount: 50000,
            time: "2021-01-05 10:00:00",
        }]);
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-81.jpg",
            email: "",
            phone: "",
            address: "",
            totalAmount: 100000,
        },
        {
            id: 2,
            name: "Jane Doe",
            image: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474072oeB/anh-dai-dien-buon-ngau_023706184.jpg",
            email: "",
            phone: "",
            address: "",
            totalAmount: 200000,
        },
        {
            id: 3,
            name: "John Smith",
            image: "https://moc247.com/wp-content/uploads/2023/10/suu-tam-50-anh-avatar-ngau-cho-nam-dep-buon-an-tuong-nhat_1.jpg",
            email: "",
            phone: "",
            address: "",
            totalAmount: 300000,
        },
        {
            id: 4,
            name: "Jane Smith",
            image: "https://chungculuxuryparkviews.com/wp-content/uploads/2022/10/anh-avatar-dep-cho-con-gai-ngau-9.jpg",
            email: "",
            phone: "",
            address: "",
            totalAmount: 4000000,
        },
        {
            id: 5,
            name: "John Doe",
            image: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/avatar-dep-10-1.jpg",
            email: "",
            phone: "",
            address: "",
            totalAmount: 50000,
        },
        {
            id: 6,
            name: "Jane Doe",
            image: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474072oeB/anh-dai-dien-buon-ngau_023706184.jpg",
            email: "",
            phone: "",
            address: "",
            totalAmount: 200000,
        },

        {
            id: 7,
            name: "John Smith",
            image: "https://moc247.com/wp-content/uploads/2023/10/suu-tam-50-anh-avatar-ngau-cho-nam-dep-buon-an-tuong-nhat_1.jpg",
            email: "",
            phone: "",
            address: "",
            totalAmount: 300000,
        },
    ]);
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
                        <p>Tổng số người dùng:  <span style={{ color: 'red' }}>300</span> người </p>
                        <br />
                        <p>Số người đã từng mua hàng: <span style={{ color: 'red' }}>100</span> người</p>
                        <br />
                        <p>Số lượt đánh giá: <span style={{ color: 'red' }}>500 </span>đánh giá </p>
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
                                    <td>{transaction.orderId}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={transaction.userImage} alt="User" />{transaction.userName}
                                        </div>
                                    </td>
                                    <td>{transaction.totalAmount?.toLocaleString()}</td>
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
                        {users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><img src={user.image} alt={user.name} className="product-image" /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>{user.totalAmount?.toLocaleString()}</td>

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