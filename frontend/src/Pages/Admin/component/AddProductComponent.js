
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import './AddProduct.css';
import UserApi from "../../../Api/UserApi";
import AdminApi from "../../../Api/AdminApi";
import { toast } from "react-toastify";
function AddProduct({ handleClose, show }) {
  const showHideClassName = show ? "modal display-flex" : "modal display-none";
  const colors = [
    { "id": '1', "name": "RED", "viName": "ĐỎ" },
    { "id": '2', "name": "GREEN", "viName": "XANH LÁ" },
    { "id": '3', "name": "BLUE", "viName": "XANH DƯƠNG" },
    { "id": '4', "name": "YELLOW", "viName": "VÀNG" },
    { "id": '5', "name": "ORANGE", "viName": "CAM" },
    { "id": '6', "name": "PURPLE", "viName": "TÍM" },
    { "id": '7', "name": "PINK", "viName": "HỒNG" },
    { "id": '8', "name": "WHITE", "viName": "TRẮNG" },
    { "id": '9', "name": "BLACK", "viName": "ĐEN" }
  ]

  const sizes = [
    { "id": '1', "name": "XS" },
    { "id": '2', "name": "S" }
  ]
  const [productInfo, setProductInfo] = useState({
    name: '',
    category: '',
    images: [],
    description: '',
    sizes: [],
    colors: [],
    origin: '',
    brand: '',
    price: '',
    promotion: 0
  });
  const [files, setFiles] = useState([]);
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


  const handleChangeImage = (e) => {
    if (!e.target.files.length) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductInfo({ ...productInfo, images: [...productInfo.images, reader.result] });
      setFiles([...files, file]);
    }
    reader.readAsDataURL(file);
  }
  const removeImage = (index) => {
    console.log(productInfo.images);
    const updatedImages = [...productInfo.images];
    updatedImages.splice(index, 1);
    setProductInfo({ ...productInfo, images: updatedImages });
    setFiles(files.filter((file, i) => i !== index));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let listColors = [];
    let listSizes = [];
    let listImages = [];
    for (let i = 0; i < productInfo.colors.length; i++) {
      listColors.push({ "id": parseInt(productInfo.colors[i]) });
    }
    for (let i = 0; i < productInfo.sizes.length; i++) {
      listSizes.push({ "id": parseInt(productInfo.sizes[i]) });
    }
    let product = { ...productInfo }
    product.colors = listColors;
    product.sizes = listSizes;
    for (let i = 0; i < files.length; i++) {
      let image = files[i]
      await UserApi.PostImage(image).then(res => {
        listImages.push({ "url": res.data.url });
      })
    }
    product.images = listImages;
    product.cost = parseInt(productInfo.price)
    product.promotion = parseInt(productInfo.promotion)
    product.type = productInfo.category
    console.log(product);
    AdminApi.CreateProduct(product).then(res => {
      if (res.status === 200) {
        toast.success('Create product success');
        handleClose();
      }
    }).catch(err => {
      toast.error('Create product failed');
    })
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
              <label>Category:</label>
              <select name="category" value={productInfo.category} onChange={handleChange}>
                <option value="MOBILE">dien thoai</option>
                <option value="LAPTOP">laptop</option>
                <option value="WATCH">dong ho</option>
                <option value="ACCESSORY">phu kien</option>
              </select>
            </div>

            <div className="form-group">
              <label>Image:</label>
              <input id="add_image" type="file" name="image" style={{ display: 'none' }} onChange={handleChangeImage} />
              <div>
                {
                  productInfo.images?.map((image, index) => (
                    <img key={index} src={image} alt={productInfo.name} className="addpage_image" onClick={() => { removeImage(index) }} />
                  ))
                }
                <label htmlFor="add_image" style={{ cursor: 'pointer', display: 'inline-block' }}>
                  <img src={'https://static.vecteezy.com/system/resources/thumbnails/001/500/603/small/add-icon-free-vector.jpg'} className="addpage_image" alt={productInfo.name} />
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea name="description" value={productInfo.description} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Sizes:</label>
              <div className="color-checkboxes">
                {
                  sizes.map((size, index) => (
                    <div key={index}>
                      <input id={`"size"+${index}`} type="checkbox" name="sizes" value={size.id} checked={productInfo.sizes.includes(size.id)} onChange={handleChange} />
                      <label htmlFor={`"size"+${index}`}>{size.name}</label>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="form-group">
              <label>Colors:</label>
              <div className="color-checkboxes">
                {colors.map((color, index) => (
                  <div key={index}>
                    <input id={`"color"+${index}`} type="checkbox" name="colors" value={color.id} checked={productInfo.colors.includes(color.id)} onChange={handleChange} />
                    <label htmlFor={`"color"+${index}`}>{color.viName}</label>
                  </div>
                ))
                }
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
            <div className="form-group">
              <label>Promotion:</label>
              <input type="text" name="promotion" value={productInfo.promotion} onChange={handleChange} />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddProduct;