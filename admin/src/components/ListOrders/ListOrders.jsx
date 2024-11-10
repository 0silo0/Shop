import React, { useEffect, useState } from "react";
import './ListOrders.css';
import cross_icon from '../../assets/Admin_Assets/cross_icon.png'
import { Link } from "react-router-dom";

const ListOrders = () => {

    const [allOrders, setAllOrders] = useState([])

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/order/get').then((reps) => reps.json()).then((data) => {
            setAllOrders(data)
        });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const removeProduct = async (order_id) => {
        await fetch(`http://localhost:4000/order/delete/${order_id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({order_id:order_id})
        })
        await fetchInfo();
    }

  return (
    <div className="list-product">
        <h1>Лист всех товаров</h1>
        <div className="listproduct-format-main">
            <p>Номер заказа</p>
            <p>ID пользователя</p>
            <p>ID продукта</p>
            <p>Удалить</p>
            <p>Редактировать</p>
        </div>
        <div className="listproduct-allOrders">
            <hr />
            {allOrders.length === 0 ? (
                    <p>Нет заказов</p>
                ) : (
                    allOrders.map((order) => {
                        return (
                            <React.Fragment key={order.order_id}>
                                <div className="listproduct-format-main listproduct-format">
                                    <p>{order.order_id}</p>
                                    <p>{order.user_id} <Link to={`/update/${order.user_id}`} className="listproduct-edit-link">Редактировать</Link></p>
                                    <p>{order.product_id} <Link to={`/editproduct/${order.product_id}`} className="listproduct-edit-link">Редактировать</Link></p>
                                    <img onClick={() => { removeProduct(order.order_id) }} src={cross_icon} className="listproduct-remove-icon" alt="Удалить" />
                                    <Link to={`/updateOrder/${order.order_id}`} className="listproduct-edit-link">Редактировать</Link>
                                </div>
                                <hr />
                            </React.Fragment>
                        );
                    })
                )}
        </div>
    </div>
  )
}

export default ListOrders;