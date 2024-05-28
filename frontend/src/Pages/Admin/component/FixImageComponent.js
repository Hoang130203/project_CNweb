import { useContext, useEffect, useState } from "react";
import UserApi from "../../../Api/UserApi";
import AdminApi from "../../../Api/AdminApi";
import { toast } from "react-toastify";
import { LoadingContext } from "../../..";

function FixImageComponent({ product, show, setHidden, updateProduct }) {
    const [loading, setLoading] = useContext(LoadingContext);
    const [listDelete, setListDelete] = useState([])
    const [files, setFiles] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    useEffect(() => {
        setListDelete([])
        setNewImages([])
        setOldImages(product?.images);
    }, [show, product])
    useEffect(() => {
    }, [listDelete, oldImages])
    const [newImages, setNewImages] = useState([]);
    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFiles([...files, file]);
            setNewImages([...newImages, reader.result]);
        }
        reader.readAsDataURL(file);
    }
    const removeImage = (index) => {
        const updatedImages = [...oldImages];
        updatedImages.splice(index, 1);
        setListDelete([...listDelete, { id: oldImages[index].id }])
        // console.log(oldImages)
        setOldImages(updatedImages);
    }
    const removeImage2 = (index) => {
        const updatedImages = [...newImages];
        updatedImages.splice(index, 1);
        setNewImages(updatedImages);
        setFiles(files.filter((file, i) => i !== index));
    }

    const handleSave = async () => {
        let listNewImages = [];
        setLoading(true);
        for (let i = 0; i < files.length; i++) {
            await UserApi.PostImage(files[i]).then(res => {
                listNewImages.push({ url: res.data?.url });
            })
        }
        AdminApi.PutImageProduct({
            productId: product.id,
            productImagesDelete: listDelete,
            newProductImages: listNewImages
        }).then(res => {
            if (res.status === 200) {
                toast.success("Cập nhật hình ảnh sản phẩm thành công!")
                setListDelete([])
                setHidden();
                updateProduct();
                setNewImages([])
            }
        }).finally(() => setLoading(false))
    }
    return (
        <div className="delete-wrap" style={{ display: show ? '' : 'none' }} onClick={() => { setHidden() }}>
            <div className="image-box" onClick={(e) => { e.stopPropagation() }}>
                <h2>Chỉnh sửa hình ảnh sản phẩm</h2>
                <h3 style={{ color: 'greenyellow', paddingBottom: '10px' }}>{product?.name}</h3>
                {
                    oldImages.map((image, index) => {
                        return (
                            <img key={index} src={image.url} alt={product?.name} onClick={() => { removeImage(index) }} className="fix-image" />
                        )
                    }
                    )
                }
                {
                    newImages.map((image, index) => {
                        return (
                            <img key={index} src={image} alt={product?.name} onClick={() => { removeImage2(index) }} className="fix-image" />
                        )
                    }
                    )
                }
                <input id="add_image" type="file" name="image" style={{ display: 'none' }} onChange={handleChange} />
                <label htmlFor="add_image" style={{ cursor: 'pointer', display: 'inline-block' }}>
                    <img src={'https://static.vecteezy.com/system/resources/thumbnails/001/500/603/small/add-icon-free-vector.jpg'} className="fix-image" />
                </label>
                <div>
                    <button className="save-button" onClick={handleSave}>Lưu</button>
                    <button className="cancel-button" onClick={() => { setHidden(); setNewImages([]) }}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default FixImageComponent;
