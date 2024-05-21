import React, { useState } from "react";
import '../css/order.css';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { convertColor } from "../../../Api/OtherFunction";
import { toast } from "react-toastify";
import AdminApi from "../../../Api/AdminApi";
function OrderRow({ order }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const [status, setStatus] = useState(order?.status);

    const handleStatusChange = async (e) => {
        if (e.target.value === order.status) return;
        if (status == 'CANCELLED') {
            toast.warn('Không thể thay đổi trạng thái đơn hàng đã hủy');
            return;
        };
        if (status == 'SUCCESS') {
            toast.warn('Không thể thay đổi trạng thái đơn hàng đã hoàn thành');
            return;
        }
        if (status == 'SENDING') {
            if (e.target.value !== 'completed' && e.target.value !== 'cancelled') {
                toast.warn('Chỉ có thể chuyển trạng thái đơn hàng đang vận chuyển sang hoàn thành hoặc hủy');
                return;
            }
        }
        await AdminApi.PutOrderStatus(order.id, e.target.value)
            .then(res => {
                if (res.status == 200) {
                    toast.success('Cập nhật trạng thái đơn hàng thành công');
                    setStatus(e.target.value);
                }
            })
    };

    return (
        <>
            <tr style={{ color: `${expanded ? "#ffffe4" : ''}` }}>
                <td>{order?.id}</td>
                <td>{order?.user?.name}</td>
                <td>{order?.user?.address}</td>
                <td>{order?.totalCost?.toLocaleString()}</td>
                <td>{order?.time?.split("T")[0]}</td>
                <td>
                    <select value={status} onChange={handleStatusChange} className="status-select">
                        <option value="pending">Chưa xác nhận</option>
                        <option value="CONFIRMED">Đã xác nhận</option>
                        <option value="SENDING">Đang vận chuyển</option>
                        <option value="SUCCESS">Thành công</option>
                        <option value="CANCELLED">Đã hủy</option>
                    </select>
                </td>
                <td>
                    <button className="expand-button" onClick={toggleExpand}>
                        {expanded ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                </td>
            </tr>
            {expanded && (
                <tr className="expanded-row" >
                    <td colSpan="7">
                        <div className="order-details">
                            {/* Hiển thị chi tiết sản phẩm trong đơn hàng */}
                            <table className="product-table product-table-2" style={{ marginLeft: '20px' }}>
                                <thead>
                                    <tr style={{ color: 'aliceblue' }}>
                                        <th>Hình ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Size</th>
                                        <th>Màu</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products?.map(product => (
                                        <tr key={product?.product?.id}>
                                            <td><img src={product?.product?.images[0]?.url} alt={product.name} className="product-image" /></td>
                                            <td>{product?.product?.name}</td>
                                            <td>{product?.size?.name}</td>
                                            <td>{convertColor(product?.color?.name)}</td>
                                            <td>{product.cost?.toLocaleString()}</td>
                                            <td>x<span style={{ color: 'yellow' }}> {product.quantity}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default OrderRow;