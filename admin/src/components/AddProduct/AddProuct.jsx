import React, { useState } from "react";
import './AddProuct.css';
import upload_area from '../../assets/Admin_Assets/upload_area.svg';

const AddProuct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        product_name: "",
        description: "",
        category_name: "men",
        image_url: "",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (event) => {
        setImage(event.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const add_product = async () => {
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => {responseData=data});

        if (responseData.success) {
            product.image_url = responseData.image_url;
            await fetch('http://localhost:4000/addproduct/create-product', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                console.log("Response data from server:", data);
                if (data.success) {
                    alert("Продукт добавлен");
                } else {
                    alert(`Не удалось добавить: ${data.message || 'неизвестная ошибка'}`);
                }
            })
        }
    }

  return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Название продукта</p>
            <input value={productDetails.product_name} onChange={changeHandler} type="text" name="product_name" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
            <p>Описание продукта</p>
            <input value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder="Type here" />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Цена</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here"/>
            </div>
            <div className="addproduct-itemfield">
                <p>Цена (новая)</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here"/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Категория продукта</p>
            <select value={productDetails.category_name} onChange={changeHandler} name="category_name" className="add-product-selector">
                <option value="women">Женский</option>
                <option value="men">Мужской</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" alt="" />
            </label>
            <input onChange={imageHandler} type="file" name="image_url" id="file-input" hidden />
        </div>
        <button onClick={()=>{add_product()}} className="addproduct-btn">Добавить</button>
    </div>
  )
}

export default AddProuct;