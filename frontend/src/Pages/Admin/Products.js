import { useState } from "react";
import './css/product.css'
import AddProduct from "./component/AddProductComponent";
import { IoIosAddCircle } from "react-icons/io";

function Products() {
    const initialProduct = {
        id: '',
        name: '',
        image: '',
        price: '',
        colors: [],
        sizes: []
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);

    const [products, setProducts] = useState([
        { id: 1, name: 'iPhone 12 ', image: 'https://tymovietnam.com/wp-content/uploads/2022/10/iphone-12-do-1-1-org.jpg', price: 15000000, colors: ['red', 'green'], sizes: ['8GB/256GB'] },
        { id: 2, name: 'Samsung Galaxy S21', image: 'https://www.cnet.com/a/img/resize/e86ed31479fadef10d6e252105bf38142ec54ce9/hub/2011/05/06/23768db3-cbf2-11e2-9a4a-0291187b029a/orig-1200x900_1.jpg?auto=webp&fit=crop&height=675&width=1200', price: 12000000, colors: ['black', 'white'], sizes: ['8GB/256GB'] },
        { id: 3, name: 'Oppo Reno 5', image: 'https://cdn.tgdd.vn/Products/Images/42/220438/Slider/oppo-reno5-thumbvideo-780x433.jpg', price: 10000000, colors: ['black', 'white'], sizes: ['8GB/256GB'] },
        { id: 4, name: 'iPhone 12 ', image: 'https://tymovietnam.com/wp-content/uploads/2022/10/iphone-12-do-1-1-org.jpg', price: 15000000, colors: ['red', 'green'], sizes: ['8GB/256GB'] },
        { id: 5, name: 'Samsung Galaxy S21', image: 'https://www.cnet.com/a/img/resize/e86ed31479fadef10d6e252105bf38142ec54ce9/hub/2011/05/06/23768db3-cbf2-11e2-9a4a-0291187b029a/orig-1200x900_1.jpg?auto=webp&fit=crop&height=675&width=1200', price: 12000000, colors: ['black', 'white'], sizes: ['8GB/256GB'] },
        { id: 6, name: 'Oppo Reno 5', image: 'https://cdn.tgdd.vn/Products/Images/42/220438/Slider/oppo-reno5-thumbvideo-780x433.jpg', price: 10000000, colors: ['black', 'white'], sizes: ['8GB/256GB'] },
        { id: 7, name: 'iPhone 12 ', image: 'https://tymovietnam.com/wp-content/uploads/2022/10/iphone-12-do-1-1-org.jpg', price: 15000000, colors: ['red', 'green'], sizes: ['8GB/256GB'] },
        { id: 8, name: 'Samsung Galaxy S21', image: 'https://www.cnet.com/a/img/resize/e86ed31479fadef10d6e252105bf38142ec54ce9/hub/2011/05/06/23768db3-cbf2-11e2-9a4a-0291187b029a/orig-1200x900_1.jpg?auto=webp&fit=crop&height=675&width=1200', price: 12000000, colors: ['black', 'white'], sizes: ['8GB/256GB'] },
        { id: 9, name: 'Oppo Reno 5', image: 'https://cdn.tgdd.vn/Products/Images/42/220438/Slider/oppo-reno5-thumbvideo-780x433.jpg', price: 10000000, colors: ['black', 'white'], sizes: ['8GB/256GB'] },
        { id: 10, name: 'iPhone 12 ', image: 'https://tymovietnam.com/wp-content/uploads/2022/10/iphone-12-do-1-1-org.jpg', price: 15000000, colors: ['red', 'green'], sizes: ['8GB/256GB'] },
        { id: 11, name: 'Samsung Galaxy S21', image: 'https://www.cnet.com/a/img/resize/e86ed31479fadef10d6e252105bf38142ec54ce9/hub/2011/05/06/23768db3-cbf2-11e2-9a4a-0291187b029a/orig-1200x900_1.jpg?auto=webp&fit=crop&height=675&width=1200', price: 12000000, colors: ['black', 'white'], sizes: ['8GB/256GB'] },
        { id: 12, name: 'Oppo Reno 5', image: 'https://cdn.tgdd.vn/Products/Images/42/220438/Slider/oppo-reno5-thumbvideo-780x433.jpg', price: 10000000, colors: ['black', 'white'], sizes: ['8GB/256GB'] },
    ]);

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

            <button onClick={handleShowModal} className="add_button">
                <IoIosAddCircle />
                Thêm sản phẩm
            </button>

            <AddProduct show={showModal} handleClose={handleCloseModal} />

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
                            <td><img src={product.image} alt={product.name} className="product-image" /></td>
                            <td>{product.price?.toLocaleString()}</td>
                            <td>{product.colors.join(', ')}</td>
                            <td>{product.sizes.join(', ')}</td>
                            <td>
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