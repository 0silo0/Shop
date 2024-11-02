import React, { useEffect, useState } from "react";
import './ListProduct.css';
import cross_icon from '../../assets/Admin_Assets/cross_icon.png'

const ListProduct = () => {

    const [allProducts, setAllProducts] = useState([])

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/product/getproduct').then((reps) => reps.json()).then((data) => {
            setAllProducts(data)
        });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const removeProduct = async (product_id) => {
        await fetch(`http://localhost:4000/product/delete-product/${product_id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id:product_id})
        })
        await fetchInfo();
    }

  return (
    <div className="list-product">
        <h1>Лист всех товаров</h1>
        <div className="listproduct-format-main">
            <p>Товары</p>
            <p>Описание</p>
            <p>Старая цена</p>
            <p>Новая цена</p>
            <p>Категория</p>
            <p>Удалить</p>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {allProducts.map((product, index) => {
                return <> <div className="listproduct-format-main listproduct-format">
                    <img src={product.image_url} className="listproduct-product-icon" alt="" />
                    <p>${product.old_price}</p>
                    <p>${product.new_price}</p>
                    <p>{product.category_name}</p>
                    <img onClick={() => {removeProduct(product.product_id)}} src={cross_icon} className="listproduct-remove-icon" alt="" />
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
  )
}

export default ListProduct;