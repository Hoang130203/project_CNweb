import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import './AddProduct.css';
import UserApi from "../../../Api/UserApi";
import AdminApi from "../../../Api/AdminApi";
import { toast } from "react-toastify";
import { GrPowerReset } from "react-icons/gr";
function FixProduct({ product, show, handleClose }) {
    const [isShow, setIsShow] = useState(show);
    const baseinfo = {
        name: '',
        types: 'MOBILE',
        images: [],
        description: '',
        sizes: [],
        colors: [],
        origin: '',
        brand: '',
        cost: '',
        promotion: 0
    }

    const [productInfo, setProductInfo] = useState(baseinfo);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'images') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductInfo({ ...productInfo, images: [...productInfo.images, reader.result] });
            }
            reader.readAsDataURL(file);
        } else
            if (name === 'sizes' || name === 'colors') {
                // Xử lý khi thay đổi giá trị của checkbox sizes hoặc colors
                const updatedArray = checked ? [...productInfo[name], value] : productInfo[name].filter(item => item !== value);
                setProductInfo({ ...productInfo, [name]: updatedArray });
            } else {
                // Xử lý khi thay đổi giá trị của các trường thông tin khác
                setProductInfo({ ...productInfo, [name]: value });
            }
    };


    useEffect(() => {
        setProductInfo(product)
    }, [product, show])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(productInfo)
        let product = {
            id: productInfo.id,
            name: productInfo.name,
            type: productInfo.type,
            description: productInfo.description,
            origin: productInfo.origin,
            brand: productInfo.brand,
            cost: parseInt(productInfo.cost),
            promotion: parseInt(productInfo.promotion)
        }
        try {
            const res = await AdminApi.PutBaseInfoProduct(product);
            console.log(res.data);
            toast.success("Update product successfully");
        } catch (error) {
            console.error("Error update product:", error);
            toast.error("Update product failed");
        }
    }
    return (
        <div className="delete-wrap" style={{ display: show ? '' : 'none' }} onClick={handleClose}>
            <section className="modal-main" onClick={(e) => { e.stopPropagation() }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div onClick={handleClose}>
                        <IoCloseOutline className="close_icon" />
                    </div>
                </div>
                <h2>Chỉnh sửa</h2>
                <h3 >Mã sản phẩm: <span style={{ color: 'green' }}>{product?.id}</span></h3>
                <div className="product-form">
                    <form onSubmit={handleSubmit}>
                        <div onClick={() => { setProductInfo(baseinfo) }}>
                            <GrPowerReset color="blue" cursor='pointer' />
                        </div>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={productInfo?.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Category:</label>
                            <select name="type" value={productInfo?.type} onChange={handleChange}>
                                <option value="MOBILE">dien thoai</option>
                                <option value="LAPTOP">laptop</option>
                                <option value="WATCH">dong ho</option>
                                <option value="ACCESSORY">phu kien</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea name="description" value={productInfo?.description} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Origin:</label>
                            <input type="text" name="origin" value={productInfo?.origin} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Brand:</label>
                            <input type="text" name="brand" value={productInfo?.brand} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="text" name="cost" value={productInfo?.cost} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Promotion:</label>
                            <input type="text" name="promotion" value={productInfo?.promotion} onChange={handleChange} />
                        </div>
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default FixProduct;
