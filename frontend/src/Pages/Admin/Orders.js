import { useEffect, useState } from "react";
import './css/product.css';
import OrderRow from "./component/OrderRow";

function Orders() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const [pages, setPages] = useState([1]);
    const itemsPerPage = 10; // Số lượng item trên mỗi trang

    const [orders, setOrders] = useState([
        {
            id: 1, user: 'Nguyễn Văn A', note: 'abc dfsdf def', totalPrice: 15000000, time: '30-4-2024', status: 'completed'
            , products: [
                { id: 1, name: 'Sản phẩm 1', price: 5000000, quantity: 2, image: 'https://tymovietnam.com/wp-content/uploads/2022/10/iphone-12-do-1-1-org.jpg' },
                { id: 2, name: 'Sản phẩm 2', price: 3000000, quantity: 1, image: 'https://cdn.tgdd.vn/Products/Images/42/220438/Slider/oppo-reno5-thumbvideo-780x433.jpg' },
                { id: 3, name: 'Sản phẩm 3', price: 7000000, quantity: 1, image: 'https://anphat.com.vn/media/product/44604_laptop_msi_cyborg_15_a12ve_240vn___8_.jpg' }
            ]
        },
        {
            id: 2, user: 'Trần Văn C', note: 'làm rõ yêu cầu', totalPrice: 18000000, time: '02-5-2024', status: 'cancelled',
            products: [
                { id: 1, name: 'Sản phẩm 1', price: 5000000, quantity: 2, image: 'https://tymovietnam.com/wp-content/uploads/2022/10/iphone-12-do-1-1-org.jpg' },
                { id: 2, name: 'Sản phẩm 2', price: 3000000, quantity: 1, image: 'https://cdn.tgdd.vn/Products/Images/42/220438/Slider/oppo-reno5-thumbvideo-780x433.jpg' },
            ]
        },
        {
            id: 3, user: 'Lê Thị D', note: 'đặt hàng khẩn cấp', totalPrice: 22000000, time: '03-5-2024', status: 'đã giao hàng',
            products: [
                { id: 1, name: 'Sản phẩm 1', price: 5000000, quantity: 2, image: 'https://tymovietnam.com/wp-content/uploads/2022/10/iphone-12-do-1-1-org.jpg' },
                { id: 3, name: 'Sản phẩm 3', price: 7000000, quantity: 1, image: 'https://anphat.com.vn/media/product/44604_laptop_msi_cyborg_15_a12ve_240vn___8_.jpg' }
            ]
        },
        { id: 4, user: 'Hoàng Văn E', note: 'cần sửa đổi đơn hàng', totalPrice: 9000000, time: '04-5-2024', status: 'đang xử lý' },
        { id: 5, user: 'Nguyễn Thị F', note: 'yêu cầu thay đổi màu sắc', totalPrice: 13500000, time: '05-5-2024', status: 'hoàn thành' },
        { id: 6, user: 'Trần Văn G', note: 'đặt hàng bổ sung', totalPrice: 16000000, time: '06-5-2024', status: 'chờ xử lý' },
        { id: 7, user: 'Lê Thị H', note: 'cần hủy đơn hàng', totalPrice: 11000000, time: '07-5-2024', status: 'chờ xử lý' },
        { id: 8, user: 'Phan Văn I', note: 'chỉnh sửa địa chỉ giao hàng', totalPrice: 20000000, time: '08-5-2024', status: 'đã giao hàng' },
        { id: 9, user: 'Trần Thị K', note: 'cần hỗ trợ khẩn cấp', totalPrice: 25000000, time: '09-5-2024', status: 'đang xử lý' },
        { id: 10, user: 'Nguyễn Văn L', note: 'muốn thay đổi phương thức thanh toán', totalPrice: 17000000, time: '10-5-2024', status: 'chờ thanh toán' },
        { id: 11, user: 'Lê Văn M', note: 'giao hàng nhanh hơn', totalPrice: 14000000, time: '11-5-2024', status: 'hoàn thành' },
        { id: 12, user: 'Hoàng Thị N', note: 'đặt hàng mới', totalPrice: 19000000, time: '12-5-2024', status: 'chờ xử lý' }
    ]);

    useEffect(() => {
        let totalPage = Math.ceil(orders.length / itemsPerPage);
        setTotalPages(totalPage);
        setPages(Array.from({ length: totalPage }, (_, index) => index + 1));

    }, [orders]);

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="product-management">
            <table className={`product-table no_select`}>
                {/* Table Header */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Người đặt</th>
                        <th>Ghi chú</th>
                        <th>Tổng tiền</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(order => (
                        <OrderRow key={order.id} order={order} />
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                <button className={`page-link ${currentPage > 1 ? '' : 'disabled'}`} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>

                {pages.map(page => (
                    <button key={page} className={`page-link ${page === currentPage ? 'active' : ''}`} onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                ))}

                <button className={`page-link ${currentPage < totalPages ? '' : 'disabled'}`} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
}

export default Orders;


