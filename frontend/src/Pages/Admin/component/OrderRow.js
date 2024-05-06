import React, { useState } from "react";
import '../css/order.css';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function OrderRow({ order }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const [status, setStatus] = useState(order.status);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <>
            <tr style={{ color: `${expanded ? "#ffffe4" : ''}` }}>
                <td>{order.id}</td>
                <td>{order.user}</td>
                <td>{order.note}</td>
                <td>{order.totalPrice?.toLocaleString()}</td>
                <td>{order.time}</td>
                <td>
                    <select value={status} onChange={handleStatusChange} className="status-select">
                        <option value="pending">Chưa xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="shipping">Đang vận chuyển</option>
                        <option value="completed">Thành công</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>
                </td>
                <td>
                    <button className="expand-button" onClick={toggleExpand}>
                        {expanded ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                </td>
            </tr>
            {expanded && (
                <tr className="expanded-row">
                    <td colSpan="7">
                        <div className="order-details">
                            {/* Hiển thị chi tiết sản phẩm trong đơn hàng */}
                            <table className="product-table product-table-2">

                                <tbody>
                                    {order.products?.map(product => (
                                        <tr key={product.id}>
                                            <td><img src={product.image} alt={product.name} className="product-image" /></td>
                                            <td>{product.name}</td>
                                            <td>{product.price?.toLocaleString()}</td>
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