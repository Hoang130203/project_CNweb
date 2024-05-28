import { useEffect, useState } from 'react';
import './DeleteBox.css'
function DeleteBox({ product, show, setHidden, handleDelete }) {
    const [isShow, setIsShow] = useState(show);
    useEffect(() => {

    }, [show, product])
    const cancel = () => {
        setHidden()
    }
    const deleteProduct = () => {
        setHidden()
        handleDelete()
    }
    return (
        <div className="delete-wrap" style={{ display: show ? '' : 'none' }} onClick={setHidden}>
            <div className="delete-box" onClick={(e) => { e.stopPropagation() }}>
                <h2>Bạn có chắc chắn muốn {product.hidden ? 'hiển thị' : 'ẩn đi'} sản phẩm này?</h2>
                <img src={product?.images[0]?.url} alt={product?.name} style={{ width: '60px', height: '60px' }} />
                <div>{product?.name}</div>
                <div className="delete-box-button">
                    <button className="delete-button" onClick={deleteProduct}>Ok</button>
                    <button className="cancel-button" onClick={cancel}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteBox;