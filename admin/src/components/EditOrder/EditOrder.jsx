import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditOrder.css';

const EditOrder = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    user_id: '',
    product_id: '',
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
    notes: '',
    status: '',
    quantity: '',
    total: ''
  });

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`http://localhost:4000/order/get/${order_id}`);
      const data = await response.json();
      setOrder(data);
    };
    fetchOrder();
  }, [order_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/order/update/${order_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    navigate('/orders');
  };

  return (
    <div className="edit-order">
      <h1>Редактировать заказ</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID пользователя:
          <input type="number" name="user_id" value={order.user_id} onChange={handleChange} readOnly/>
        </label>
        <label>
          ID продукта:
          <input type="number" name="product_id" value={order.product_id} onChange={handleChange} readOnly/>
        </label>
        <label>
          Фамилия:
          <input type="text" name="lastName" value={order.lastName} onChange={handleChange} />
        </label>
        <label>
          Имя:
          <input type="text" name="firstName" value={order.firstName} onChange={handleChange} />
        </label>
        <label>
          Отчество:
          <input type="text" name="middleName" value={order.middleName} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={order.email} onChange={handleChange} />
        </label>
        <label>
          Телефон:
          <input type="text" name="phone" value={order.phone} onChange={handleChange} />
        </label>
        <label>
          Адрес:
          <input type="text" name="address" value={order.address} onChange={handleChange} />
        </label>
        <label>
          Город:
          <input type="text" name="city" value={order.city} onChange={handleChange} />
        </label>
        <label>
          Почтовый индекс:
          <input type="text" name="postalCode" value={order.postalCode} onChange={handleChange} />
        </label>
        <label>
          Страна:
          <input type="text" name="country" value={order.country} onChange={handleChange} />
        </label>
        {/* <label>
          Способ доставки:
          <input type="text" name="deliveryMethod" value={order.deliveryMethod} onChange={handleChange} />
        </label>
        <label>
          Способ оплаты:
          <input type="text" name="paymentMethod" value={order.paymentMethod} onChange={handleChange} />
        </label> */}
        Способ доставки:
        <select name="deliveryMethod" value={order.deliveryMethod} onChange={handleChange} required>
                    <option value="">Выберите метод доставки</option>
                    <option value="standard">Обычный</option>
                    <option value="express">Быстрый</option>
        </select>
        Способ оплаты:
        <select name="paymentMethod" value={order.paymentMethod} onChange={handleChange} required>
                    <option value="">Выберите метод оплаты</option>
                    <option value="creditCard">Банковская карта</option>
                    <option value="paypal">PayPal</option>
                    <option value="cashOnDelivery">Наличными</option>
        </select>
        <label>
          Примечания:
          <textarea name="notes" value={order.notes} onChange={handleChange} />
        </label>
        <label>
          Статус:
          <input type="text" name="status" value={order.status} onChange={handleChange} />
        </label>
        <label>
          Количество:
          <input type="number" name="quantity" value={order.quantity} onChange={handleChange} />
        </label>
        <label>
          Сумма:
          <input type="number" step="0.01" name="total" value={order.total} onChange={handleChange} />
        </label>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default EditOrder;
