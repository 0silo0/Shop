import React from "react";
import './Item.css'
import { Link } from "react-router-dom";

const Item = (props) => {
    return (
        <div className="item">
            <Link to={`/product/getproduct/${props.product_id}`}><img onClick={window.scrollTo(0, 0)} src={props.image_url} alt="" /></Link>
            <p>{props.product_name}</p>
            <div className="item-price">
                <div className="new-price">$ {props.new_price}</div>
                <div className="old-price">$ {props.old_price}</div>
            </div>
        </div>
    )
}

export default Item