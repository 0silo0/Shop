import React from "react";
import './Popular.css'
import data_product from "../../assets/Frontend_Assets/data";
import Item from "../Item/Item";

const Popular = () => {
    return (
        <div className="popular">
            <h1>Popular In Women</h1>
            <hr />
            <div className='popular-item'>
                {data_product.map((item, i) => {
                    return <Item key={i} product_id={item.id} 
                    product_name={item.name} image_url={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular