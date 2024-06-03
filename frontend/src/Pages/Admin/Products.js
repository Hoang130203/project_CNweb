import { useContext, useEffect, useState } from "react";
import './css/product.css'
import { motion } from "framer-motion"

import AddProduct from "./component/AddProductComponent";
import { IoIosAddCircle } from "react-icons/io";
import AdminApi from "../../Api/AdminApi";
import { convertColor } from "../../Api/OtherFunction";
import DeleteBox from "./component/DeleteBox";
import FixProduct from "./component/FixProduct";
import QuantityComponent from "./component/QuantityComponent";
import FixImageComponent from "./component/FixImageComponent";
import { LoadingContext } from "../..";
import { toast } from "react-toastify";
function Products() {
    const [loading, setLoading] = useContext(LoadingContext);


    // Khởi tạo trạng thái cho 1 product
    const initialProduct = {
        id: '',
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
    };

    // Trạng thái cho các sản phẩm đang được hiển thị trên trang, tổng số trang, danh sách sản phẩm
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const [product, setProduct] = useState(initialProduct);
    const [showDelete, setShowDelete] = useState(false);
    const [showFixProduct, setShowFixProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [showQuantity, setShowQuantity] = useState(false);
    const [showFixImage, setShowFixImage] = useState(false);
    // Lấy tất cả sản phẩm qua API
    useEffect(() => {
        document.title = 'Quản lý sản phẩm'
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const response = await AdminApi.GetAllProducts()
                    .finally(() => setLoading(false));
                setProducts(response.data);
                setTotalPages(Math.ceil(response.data.length / 8));
            } catch (error) {
                console.error("Error fetching products:", error);
            }


        };

        fetchProducts();
    }, []);

    useEffect(() => {

    }, [products])
    // Xóa một sản phẩm
    const handleDeleteProduct = (productId) => {
        // const updatedProducts = products.filter(product => product.id !== productId);
        // setProducts(updatedProducts);
        setProduct(prev => products.find(product => product.id === productId));
        setShowDelete(true);
    };

    // Sửa sản phẩm
    const handleFixProduct = (productId) => {
        setProduct(prev => products.find(product => product.id === productId));
        setShowFixProduct(true);
    }

    // Số lượng
    const handleQuantity = (productId) => {
        setProduct(prev => products.find(product => product.id === productId));
        setShowQuantity(true);
    }

    // Ảnh
    const handleImage = (productId) => {
        setProduct(prev => products.find(product => product.id === productId));
        setShowFixImage(true);
    }

    // Xóa sản phẩm
    const deleteProduct = () => {
        // const updatedProducts = products.filter(product_ => product_.id !== product.id);
        // setProducts(updatedProducts);
        AdminApi.ToggleShowProduct(product.id).then(res => {
            if (res.status === 200) {
                toast.success("Thay đổi hiển thị thành công");
            }
        }).catch(err => {
            toast.error("Thay đổi hiển thị thất bại");
            console.error(err);
        }
        ).finally(() => {
            setShowDelete(false);
            updateProducts();
        })

    }
    const [showModal, setShowModal] = useState(false);
    const handleCloseFixImage = () => {
        setShowFixImage(false);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    // Cập nhật sản phẩm
    const updateProducts = () => {
        const fetchProducts = async () => {
            try {
                const response = await AdminApi.GetAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }
    return (
        <div className="product-management">
            <motion.div animate={{ opacity: showDelete ? 1 : 0, transition: { duration: 0.5 } }}
            >
                <DeleteBox product={product} show={showDelete} setHidden={() => { setShowDelete(false) }} handleDelete={deleteProduct} />
            </motion.div>
            <motion.div animate={{ opacity: showFixProduct ? 1 : 0, transition: { duration: 0.5 } }}
            >
                <FixProduct product={product} show={showFixProduct} handleClose={() => setShowFixProduct(false)} />
            </motion.div>
            <motion.div animate={{ opacity: showQuantity ? 1 : 0, transition: { duration: 0.5 } }}
            >
                <QuantityComponent product={product} show={showQuantity} setHidden={() => { setShowQuantity(false) }} updateProduct={updateProducts} />
            </motion.div>
            <motion.div animate={{ opacity: showFixImage ? 1 : 0, transition: { duration: 0.5 } }}
            >
                <FixImageComponent product={product} show={showFixImage} setHidden={handleCloseFixImage} updateProduct={updateProducts} />
            </motion.div>
            {/* Thêm sản phẩm */}
            <button onClick={handleShowModal} className="add_button">
                <IoIosAddCircle />
                Thêm sản phẩm
            </button>
            <AddProduct show={showModal} handleClose={handleCloseModal} />

            {/* Danh sách sản phẩm */}
            <table className={["product-table", 'no_select'].join(' ')}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Hình ảnh</th>
                        <th>Giá</th>
                        <th>Màu sắc</th>
                        <th>Kích cỡ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.slice((currentPage - 1) * 8, Math.min((currentPage - 1) * 8 + 8, products.length)).map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td><img onClick={() => { handleImage(product.id) }} style={{ cursor: 'pointer' }} src={product.images[0]?.url} alt={product.name} className="product-image" /></td>
                            <td>{product.cost?.toLocaleString()}</td>
                            <td>{product.colors?.map(color => convertColor(color.name)).join(', ')}</td>
                            <td>{product.sizes?.map(size => size.name).join(', ')}</td>
                            <td style={{ minWidth: '150px' }}>
                                <button className="quantity-button" onClick={() => { handleQuantity(product.id) }}>Kho</button>
                                <button className="edit-button" onClick={() => { handleFixProduct(product.id) }}>Sửa</button>
                                <button className="delete-button" style={{ width: '50px', backgroundColor: product.hidden ? 'green' : "" }} onClick={() => handleDeleteProduct(product.id)}>{product.hidden ? 'Hiện' : 'Ẩn'}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default Products;