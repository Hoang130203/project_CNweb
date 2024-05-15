import { useEffect, useState } from "react";
import './css/product.css'
import AddProduct from "./component/AddProductComponent";
import { IoIosAddCircle } from "react-icons/io";
import AdminApi from "../../Api/AdminApi";
import { convertColor } from "../../Api/OtherFunction";
function Products() {

    // Khởi tạo trạng thái cho 1 product
    const initialProduct = {
        id: '',
        name: '',
        image: '',
        price: '',
        colors: [],
        sizes: []
    };

    // Trạng thái cho các sản phẩm đang được hiển thị trên trang, tổng số trang, danh sách sản phẩm
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);

    const [products, setProducts] = useState([]);

    // Lấy tất cả sản phẩm qua API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await AdminApi.GetAllProducts();
                setProducts(response.data);
                setTotalPages(Math.ceil(response.data.length / 8));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    
    // Xóa một sản phẩm
    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    };
    
    const [showModal, setShowModal] = useState(false);

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
    return (
        <div className="product-management">

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
                            <td><img src={product.images[0]?.url} alt={product.name} className="product-image" /></td>
                            <td>{product.cost?.toLocaleString()}</td>
                            <td>{product.colors?.map(color => convertColor(color.name)).join(', ')}</td>
                            <td>{product.sizes?.map(size => size.name).join(', ')}</td>
                            <td style={{ minWidth: '100px' }}>
                                <button className="edit-button">Sửa</button>
                                <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
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