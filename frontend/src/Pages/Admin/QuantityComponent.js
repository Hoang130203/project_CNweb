import { useEffect, useState } from "react";
import { convertColor } from "../../../Api/OtherFunction";
import AdminApi from "../../../Api/AdminApi";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

function QuantityComponent({ product, show, setHidden, updateProduct }) {
    const [quantities, setQuantities] = useState([])
    const [newQuantities, setNewQuantities] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [item_, setItem_] = useState({ size: {}, color: {}, quantity: 0 })
    const [sizes, setSizes] = useState([])
    const colors = [
        { "id": 1, "name": "RED", "viName": "ĐỎ" },
        { "id": 2, "name": "GREEN", "viName": "XANH LÁ" },
        { "id": 3, "name": "BLUE", "viName": "XANH DƯƠNG" },
        { "id": 4, "name": "YELLOW", "viName": "VÀNG" },
        { "id": 5, "name": "ORANGE", "viName": "CAM" },
        { "id": 6, "name": "PURPLE", "viName": "TÍM" },
        { "id": 7, "name": "PINK", "viName": "HỒNG" },
        { "id": 8, "name": "WHITE", "viName": "TRẮNG" },
        { "id": 9, "name": "BLACK", "viName": "ĐEN" }
    ]

    // Lấy danh sách kích thước từ API
    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const res = await AdminApi.GetAllSizes();
                const allSizes = res.data;

                const formattedSizes = allSizes.map(size => ({
                    id: size.id,
                    name: size.name
                }));


                setSizes(formattedSizes);
            } catch (error) {
                console.error("Error fetching sizes:", error);
            }
        };

        fetchSizes();
    }, [])
    useEffect(() => {

    }, [newQuantities])

    // Cập nhật danh sách số lượng khi hiển thị modal hoặc khi sản phẩm thay đổi
    useEffect(() => {
        setQuantities(product?.productQuantities)
    }, [show, product])

    // Xử lý sự kiện khi người dùng muốn xóa một số lượng sản phẩm đã có
    const handleDel = (index) => {
        let newQuantities = quantities.filter((item, i) => i !== index)
        console.log(newQuantities)
        setQuantities(newQuantities)
    }

    // Xử lý sự kiện khi người dùng thay đổi thông tin số lượng sản phẩm mới
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem_((prevItem) => {
            if (name === 'size') {
                return { ...prevItem, size: sizes.find((size) => size.id === Number(value)) };
            }
            if (name === 'color') {
                return { ...prevItem, color: colors.find((color) => color.id === Number(value)) };
            }
            if (name === 'quantity') {
                return { ...prevItem, quantity: Number(value) };
            }
            return prevItem;
        });
    };

    // Xử lý sự kiện khi người dùng muốn thêm một số lượng sản phẩm mới
    const handleAdd = () => {
        setNewQuantities([...newQuantities, item_]);
        setShowAdd(false);
        setItem_({ size: {}, color: {}, quantity: 0 });
    };

    // Xử lý sự kiện khi người dùng muốn xóa một số lượng sản phẩm mới
    const handleDelNew = (index) => {
        let news = newQuantities.filter((item, i) => i !== index)
        console.log(news)
        setNewQuantities(news)
    }

    // Xử lý sự kiện khi người dùng thay đổi số lượng của một số lượng sản phẩm đã có
    const handleQuantityChange = (e, index) => {
        const { value } = e.target;
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index].quantity = Number(value);
            return newQuantities;
        });
    };

    // Xử lý sự kiện khi người dùng thay đổi số lượng của một số lượng sản phẩm mới
    const handleQuantityChange2 = (e, index) => {
        const { value } = e.target
        setNewQuantities(
            prev => {
                const news = [...prev]
                news[index].quantity = Number(value)
                return news
            }
        )
    }

    // Xử lý sự kiện khi người dùng muốn lưu số lượng sản phẩm đã cập nhật
    const handleSave = () => {
        AdminApi.PutQuantityProduct({
            oldListProductQuantitiy: quantities,
            newListProductQuantity: newQuantities,
            productId: product.id
            // setQuantities
        }).then(res => {
            if (res.status == 200) {
                toast.success("Cập nhật số lượng sản phẩm thành công!")
                console.log(res.data)
                setNewQuantities([])
                setHidden()
                updateProduct()
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="delete-wrap" style={{ display: show ? '' : 'none' }} onClick={() => { setHidden(); setNewQuantities([]) }}>
            <div className="delete-wrap" style={{ display: showAdd ? '' : 'none' }} onClick={(e) => { e.stopPropagation() }}>
                <div className="delete-box" onClick={(e) => { e.stopPropagation() }}>
                    <h2>Nhập màu sắc, kích cỡ và số lượng sản phẩm</h2>
                    <div>
                        Kích thước:
                        <select name="size" value={item_?.size?.id || 0} onChange={handleChange} className="select-quantity">
                            <option value="">Chọn kích thước</option>
                            {sizes.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        Màu sắc:
                        <select name="color" value={item_?.color?.id || 0} onChange={handleChange} className="select-quantity">
                            <option value="">Chọn màu sắc</option>
                            {colors.map((item) => (
                                <option key={item.id} value={item.id}>{item.viName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        Số lượng:
                        <input type="number" name="quantity" className="input-quantity" value={item_?.quantity || 0} onChange={handleChange} />
                    </div>
                    <div className="delete-box-button">
                        <button className="delete-button-2" onClick={handleAdd}>Xác nhận</button>
                        <button className="cancel-button-2" onClick={() => { setShowAdd(false) }}>Hủy</button>
                    </div>


                </div>
            </div>
            <section className="modal-main" onClick={(e) => { e.stopPropagation() }}>
                <div style={{ fontSize: '25px' }}>Kho hàng của sản phẩm <span style={{ color: 'green' }}>{product.name}</span></div>
                <div className="product-quantity-list">
                    <div className="product-table">
                        <table>
                            <thead>
                                <tr style={{ fontSize: '20px' }}>
                                    <th>Stt</th>
                                    <th>Kích thước</th>
                                    <th>Màu sắc</th>
                                    <th>Số lượng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {quantities?.map((item, index) => (
                                    <tr key={index} style={{ fontSize: '17px' }}>
                                        <td>{index + 1}</td>
                                        <td>{item.size.name}</td>
                                        <td>{convertColor(item.color.name)}</td>
                                        <td>
                                            <input value={item.quantity}
                                                onChange={(e) => handleQuantityChange(e, index)}
                                                style={{ border: 'none', width: '40px', fontSize: '17px' }} />
                                        </td>
                                        <td>
                                            <button className="delete-button" onClick={() => { handleDel(index) }}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                                {
                                    newQuantities.map((item, index) => (
                                        <tr key={index} style={{ fontSize: '17px' }}>
                                            <td>{quantities.length + index + 1}</td>
                                            <td>{item.size?.name}</td>
                                            <td>{convertColor(item.color?.name)}</td>
                                            <td>

                                                <input onChange={(e) => handleQuantityChange2(e, index)} value={item.quantity} style={{ border: 'none', width: '40px', fontSize: '17px' }} />
                                            </td>
                                            <td>
                                                <button className="delete-button" onClick={() => { handleDelNew(index) }}>Xóa</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="wrap-quantity-button">
                    <button className="quantity-add-button" onClick={() => { setShowAdd(true) }}>
                        <IoMdAdd />
                    </button>
                    <button className="quantity-save-button" onClick={() => { handleSave() }}>Lưu</button>
                    <button className="quantity-cancel-button" onClick={setHidden}>Hủy</button>
                </div>
            </section>
        </div>
    );
}

export default QuantityComponent;