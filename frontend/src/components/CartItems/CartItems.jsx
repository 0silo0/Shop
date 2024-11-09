import React, { useContext } from "react";
import './CartItems.css'
import { ShopContext } from "../../context/ShopContenxt";
import cart_cross_icon from '../../assets/Frontend_Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom'

const CartItems = () => {
    
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);

    const handleCheckout = (itemId) => {
        localStorage.setItem("selectedProductId", itemId); // Сохраняем ID товара
    };

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
                <p>Перейти к оплате</p>
            </div>
            <hr />
            {all_product.map((e)=>{
                
                if (cartItems[e.product_id] > 0) {
                    return             <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image_url} alt="" className="cartitems-product-icon" />
                        <p>{e.product_name}</p>
                        <p>${e.new_price}</p>
                        <button className="cartitems-quantity">{cartItems[e.product_id]}</button>
                        <p>${e.new_price * cartItems[e.product_id]}</p>
                        <img className="cartitems-remove-icon" src={cart_cross_icon} alt=""  onClick={()=>{removeFromCart(e.product_id)}}/>
                        <Link to='/pay'>
                            <button onClick={() => handleCheckout(e.product_id)}>Оформить заказ</button>
                        </Link>
                    </div>
                    <hr />
                </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shiping fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>Proceed to checkout</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems