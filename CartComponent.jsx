import React, { useState, useEffect } from 'react';
import Cart from "../shop/cart"            //cart.jsx
import Subscriptionform from "./Subscription-form";

const CartComponent = (props) => {
    const [subList, setSubList] = useState([]);
    const [showCart, setShowCart] = useState(true);
    const [showSubscriptionform, setSubscriptionform] = useState(false);

    const handleSubscribe = (prlist) => {
        if (prlist.process == "add") {
            setSubList(preval => {
                return [...preval, prlist.item_code]
            })
        }
        else {
            let lst = subList
            var index = lst.indexOf(prlist.item_code);
            delete lst[index];
            setSubList(lst)
        }
    }
  
    const handleshowSubscriptionform = () => {
        setShowCart(false)
        setSubscriptionform(true)
    }

    const handleshowback = () => {
        setShowCart(true)
        setSubscriptionform(false)
        setSubList("")
    }
    console.log("subList", subList);
    localStorage.setItem("subList", subList);


    return (
        <div>
            {showCart && <Cart handleSubscribe={handleSubscribe} handleshowSubscriptionform={handleshowSubscriptionform} />

            }{
                showSubscriptionform && <Subscriptionform subList={subList} handleshowback={handleshowback} />

            }
        </div>
    )
}

export default CartComponent;