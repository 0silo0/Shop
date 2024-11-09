import { React, useState, useContext } from "react";
import './NewCollection.css'
import Item from "../Item/Item";
import { ShopContext } from "../../context/ShopContenxt";

const NewCollection = () => {

    const {all_product} = useContext(ShopContext);
    const [newColl_category, setNewColl_category] = useState("");

    const isWithinLastTwoDays = (dateString) => {
        const now = new Date();
        const productDate = new Date(dateString);
        const differenceInTime = now - productDate;
        const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
        return differenceInDays <= 2;
    };

    return (
        <div className="new-collections">
            <h1>NEW COLLECTION</h1>
            <hr />
            <p className="new-collections-category">
                <span onClick={() => setNewColl_category("men")}>Мужское</span>
                <span onClick={() => setNewColl_category("women")}>Женское</span>
            </p>
            <div className="collections">

                {all_product.map((item,i)=>{
                    if (item.category_name===newColl_category && isWithinLastTwoDays(item.createdAt)) {
                    return <Item key={i} product_id={item.product_id} product_name={item.product_name} image_url={item.image_url} new_price={item.new_price} old_price={item.old_price}/>
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    )
}

export default NewCollection