import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditProduct.css';

const EditProduct = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        product_name: '',
        description: '',
        old_price: '',
        new_price: '',
        category_name: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:4000/product/getproduct/${product_id}`);
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [product_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:4000/product/editproduct/${product_id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        navigate('/listproduct');
    };

    return (
        <div className="edit-product">
            <h1>Редактировать товар</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Название:
                    <input type="text" name="product_name" value={product.product_name} onChange={handleChange} />
                </label>
                <label>
                    Описание:
                    <textarea name="description" value={product.description} onChange={handleChange} />
                </label>
                <label>
                    Старая цена:
                    <input type="number" name="old_price" value={product.old_price} onChange={handleChange} />
                </label>
                <label>
                    Новая цена:
                    <input type="number" name="new_price" value={product.new_price} onChange={handleChange} />
                </label>
                <label>
                    Категория:
                    <input type="text" name="category_name" value={product.category_name} onChange={handleChange} />
                </label>
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default EditProduct;
