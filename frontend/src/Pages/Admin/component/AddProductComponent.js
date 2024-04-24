
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

function AddProduct({ handleClose, show }) {
  const showHideClassName = show ? "modal display-flex" : "modal display-none";
  const [productInfo, setProductInfo] = useState({
    name: '',
    image: '',
    description: '',
    sizes: [],
    colors: [],
    origin: '',
    brand: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'sizes' || name === 'colors') {
      // Xử lý khi thay đổi giá trị của checkbox sizes hoặc colors
      const updatedArray = checked ? [...productInfo[name], value] : productInfo[name].filter(item => item !== value);
      setProductInfo({ ...productInfo, [name]: updatedArray });
    } else {
      // Xử lý khi thay đổi giá trị của các trường thông tin khác
      setProductInfo({ ...productInfo, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý khi người dùng nhấn nút "Submit"
    console.log(productInfo);
  };
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductInfo({ ...productInfo, image: reader.result });
    }
    reader.readAsDataURL(file);
  }
  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section className="modal-main" onClick={(e) => { e.stopPropagation() }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={handleClose}>
            <IoCloseOutline className="close_icon" />
          </div>
        </div>
        <h2>Add New Product</h2>
        <div className="product-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={productInfo.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input id="add_image" type="file" name="image" onChange={handleChangeImage} />
              <label htmlFor="add_image" style={{ cursor: 'pointer' }}>Choose image</label>
              <div>

              </div>

              <div>
                <img src={productInfo.image} alt={productInfo.name} style={{ width: '200px', height: '200px', padding: '10px' }} />
              </div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea name="description" value={productInfo.description} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Sizes:</label>
              <div className="color-checkboxes">
                <div>
                  <input type="checkbox" name="sizes" value="XS" checked={productInfo.sizes.includes('XS')} onChange={handleChange} />
                  <label>XS</label>
                </div>
                <div>
                  <input type="checkbox" name="sizes" value="S" checked={productInfo.sizes.includes('S')} onChange={handleChange} />
                  <label>S</label>
                </div>
                <div>
                  <input type="checkbox" name="sizes" value="M" checked={productInfo.sizes.includes('M')} onChange={handleChange} />
                  <label>M</label>
                </div>
                <div>
                  <input type="checkbox" name="sizes" value="L" checked={productInfo.sizes.includes('L')} onChange={handleChange} />
                  <label>L</label>
                </div>
                <div>
                  <input type="checkbox" name="sizes" value="XL" checked={productInfo.sizes.includes('XL')} onChange={handleChange} />
                  <label>XL</label>
                </div>
                <div>
                  <input type="checkbox" name="sizes" value="8GB/256GB" checked={productInfo.sizes.includes('8GB/256GB')} onChange={handleChange} />
                  <label>8GB/256GB</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Colors:</label>
              <div className="color-checkboxes">
                <div>
                  <input type="checkbox" name="colors" value="Red" checked={productInfo.colors.includes('Red')} onChange={handleChange} />
                  <label>Đỏ</label>
                </div>
                <div>
                  <input type="checkbox" name="colors" value="Blue" checked={productInfo.colors.includes('Blue')} onChange={handleChange} />
                  <label>Lam</label>
                </div>
                <div>
                  <input type="checkbox" name="colors" value="Green" checked={productInfo.colors.includes('Green')} onChange={handleChange} />
                  <label>Xanh lá</label>
                </div>
                <div>
                  <input type="checkbox" name="colors" value="Yellow" checked={productInfo.colors.includes('Yellow')} onChange={handleChange} />
                  <label>Vàng</label>
                </div>
                <div>
                  <input type="checkbox" name="colors" value="Black" checked={productInfo.colors.includes('Black')} onChange={handleChange} />
                  <label>Đen</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Origin:</label>
              <input type="text" name="origin" value={productInfo.origin} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Brand:</label>
              <input type="text" name="brand" value={productInfo.brand} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input type="text" name="price" value={productInfo.price} onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddProduct;