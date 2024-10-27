import React, { useContext, useState, useEffect } from "react";
import './Pay.css';
import { ShopContext } from "../../context/ShopContenxt";
import { Link } from 'react-router-dom';

const Pay = () => {

    const { all_product, cartItems } = useContext(ShopContext);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const selectedProductId = localStorage.getItem("selectedProductId");
        if (selectedProductId) {
            const product = all_product.find((item) => item.id === Number(selectedProductId));
            setSelectedProduct(product);
        }
    }, [all_product]);
    
    // Состояние для полей формы
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

    // Проверка ввода только русских букв
    const handleNameChange = (e) => {
        const { name, value } = e.target;
        if (/^[а-яА-ЯёЁ\s]*$/.test(value) || value === '') {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Обработчик изменений для других полей
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        // Логика отправки данных на сервер
    };

    return (
        <div className="pay-cartitems">
            <div className="pay-cartitems">
                <div className="pay-cartitems-format-main">
                    <p>Products</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                </div>
                <hr />
                {selectedProduct && cartItems[selectedProduct.id] > 0 && (
                    <div key={selectedProduct.id}>
                        <div className="pay-cartitems-format pay-cartitems-format-main">
                            <img src={selectedProduct.image} alt="" className="pay-cartitems-product-icon" />
                            <p>${selectedProduct.new_price}</p>
                            <button className="pay-cartitems-quantity">{cartItems[selectedProduct.id]}</button>
                            <p>${selectedProduct.new_price * cartItems[selectedProduct.id]}</p>
                        </div>
                        <hr />
                    </div>
                )}
            </div>

            {/* Форма оформления заказа */}
            <form className="order-form" onSubmit={handleSubmit}>
                <h2>Shipping Information</h2>
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
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />

                <h2>Order Details</h2>
                <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} required>
                    <option value="">Select Delivery Method</option>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                </select>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                    <option value="">Select Payment Method</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cashOnDelivery">Cash on Delivery</option>
                </select>
                <textarea name="notes" placeholder="Additional Notes" value={formData.notes} onChange={handleChange}></textarea>

                <button type="submit" className="order-submit-button">Place Order</button>
            </form>
        </div>
    );
};

export default Pay;
