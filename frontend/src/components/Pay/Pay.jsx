import React, { useContext, useState, useEffect } from "react";
import './Pay.css';
import { ShopContext } from "../../context/ShopContenxt";
import { Link } from 'react-router-dom';

const Pay = () => {

    const { all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const selectedProductId = localStorage.getItem("selectedProductId");
        if (selectedProductId) {
            const product = all_product.find((item) => item.product_id === Number(selectedProductId));
            setSelectedProduct(product);
        }
    }, [all_product]);
    

    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        deliveryMethod: '',
        paymentMethod: '',
        notes: ''
    });


    const handleNameChange = (e) => {
        const { name, value } = e.target;
        if (/^[а-яА-ЯёЁ\s]*$/.test(value) || value === '') {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5000/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Форма успешно отправлена!");
            } else {
                alert("Ошибка при отправке формы: " + data.message);
            }
        } catch (error) {
            alert("Ошибка при отправке: " + error.message);
        }
    };
    
    

    return (
        <div className="pay-cartitems">
            <div className="pay-cartitems">
                <div className="pay-cartitems-format-main">
                    <p>Продукт</p>
                    <p>Цена</p>
                    <p>Количество</p>
                    <p>Итого</p>
                </div>
                <hr />
                {selectedProduct && cartItems[selectedProduct.product_id] > 0 && (
                    <div key={selectedProduct.product_id}>
                        <div className="pay-cartitems-format pay-cartitems-format-main">
                            <img src={selectedProduct.image_url} alt="" className="pay-cartitems-product-icon" />
                            <p>${selectedProduct.new_price}</p>
                            {/* <button className="pay-cartitems-quantity">{cartItems[selectedProduct.id]}</button> */}
                            <div className="pay-cartitems-quantity">
                                <button onClick={() => removeFromCart(selectedProduct.product_id)}>-</button>
                                <span>{cartItems[selectedProduct.product_id]}</span>
                                <button onClick={() => addToCart(selectedProduct.product_id)}>+</button>
                            </div>
                            <p>${selectedProduct.new_price * cartItems[selectedProduct.product_id]}</p>
                        </div>
                        <hr />
                    </div>
                )}
            </div>

            {/* Форма оформления заказа */}
            <form className="order-form" onSubmit={handleSubmit}>
                <h2>Информация для заказа</h2>
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Фамилия" 
                    value={formData.lastName} 
                    onChange={handleNameChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="Имя" 
                    value={formData.firstName} 
                    onChange={handleNameChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="middleName" 
                    placeholder="Отчество" 
                    value={formData.middleName} 
                    onChange={handleNameChange} 
                />

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Адрес" value={formData.address} onChange={handleChange} required />
                <input type="text" name="city" placeholder="Город" value={formData.city} onChange={handleChange} required />
                <input type="text" name="postalCode" placeholder="Почтовый индекс" value={formData.postalCode} onChange={handleChange} required />
                <input type="text" name="country" placeholder="Страна" value={formData.country} onChange={handleChange} required />

                <h2>Детали заказа</h2>
                <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} required>
                    <option value="">Выберите метод доставки</option>
                    <option value="standard">Обычный</option>
                    <option value="express">Быстрый</option>
                </select>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                    <option value="">Выберите метод оплаты</option>
                    <option value="creditCard">Банковская карта</option>
                    <option value="paypal">PayPal</option>
                    <option value="cashOnDelivery">Наличными</option>
                </select>
                <textarea name="notes" placeholder="Ваши пожелания для доставки" value={formData.notes} onChange={handleChange}></textarea>

                <button type="submit" className="order-submit-button">Завершить оформление</button>
            </form>
        </div>
    );
};

export default Pay;
