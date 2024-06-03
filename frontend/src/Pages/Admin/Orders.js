import { useContext, useEffect, useState } from "react";
import './css/product.css';
import OrderRow from "./component/OrderRow";
import AdminApi from "../../Api/AdminApi";
import { LoadingContext } from "../..";

function Orders() {
    const [loading, setLoading] = useContext(LoadingContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const [pages, setPages] = useState([1]);
    const itemsPerPage = 10; // Số lượng item trên mỗi trang
    const [orders, setOrders] = useState([
    ]);
    useEffect(() => {
        document.title = 'Đơn hàng'
        setLoading(true);
        AdminApi.GetAllOrders().then(res => {
            console.log(res.data);
            setOrders(res.data?.filter(order => order.totalCost > 50000));
        })
            .finally(() => setLoading(false));
    }, []);

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
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                        <th>Xuất hóa đơn</th>
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