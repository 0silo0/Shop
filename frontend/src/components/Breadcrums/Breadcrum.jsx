import React from "react";
import './Breadcrum.css';
import arrow_icon from '../../assets/Frontend_Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;
    return (
        <div className="breadcrum">
            Home <img src={arrow_icon} alt="" /> Shop <img src={arrow_icon} alt="" /> {product.category_name} <img src={arrow_icon} alt="" /> {product.product_name}
        </div>
    )
}

export default Breadcrum