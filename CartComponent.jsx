import React, { useState, useEffect } from 'react';
import Cart from "../shop/cart"
import { connect } from 'react-redux';
import {actions as cartAction } from '~/store/cart';
import Subscriptionform from "./Subscription-form";

const CartComponent = (props) => {
    const [subList, setSubList] = useState([]);
    const [showCart, setShowCart] = useState(true);
    const [showSubscriptionform, setSubscriptionform] = useState(false);
    
    const handleSubscribe =( prlist) =>{
        console.log(prlist.process, prlist.item_code)
        if (prlist.process == "add"){
            setSubList(preval => {
                return [...preval,prlist.item_code]
            })
        }
        else{
            let lst = subList
            var index = lst.indexOf(prlist.item_code); 
            delete lst[index];
            setSubList(lst)
        }
    }
    const handleshowSubscriptionform = () =>{
        setShowCart(false)
        setSubscriptionform(true)
    }
    console.log("subList",subList);
    localStorage.setItem("subList",subList);
    
    return(
        <div>
        { showCart && <Cart handleSubscribe={handleSubscribe} handleshowSubscriptionform = {handleshowSubscriptionform}/>
          
        }{
            showSubscriptionform && <Subscriptionform  subList={subList}/>
           
        }
        </div>
    )
}
const mapStateToProps = ( state ) => (
    {
        cartItems: state.cartlist.data
    }
)

export default connect( mapStateToProps, { ...cartAction } )( CartComponent );