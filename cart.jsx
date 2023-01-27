import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';
import PageHeader from '~/components/features/page-header';
import { actions as cartAction } from '~/store/cart';

function Cart ( props ) {
    const [ cartList, setCartList ] = useState( [] );
    useEffect( () => {
        setCartList( props.cartItems );
    }, [ props.cartItems] )

    const handleChange = (e) => {
        const { value, checked, name } = e.target;          
        console.log(`${value} is ${checked} ${name}`);
        if (checked) {
            if(name == "all-select"){
                props.handleSubscribe({"item_code":name,'process':'add'})
            }else{    
                props.handleSubscribe({"item_code":name,'process':'add'})
            }
            }
        else {
            console.log("unchecked");
            props.handleSubscribe({"item_code":name,'process':'remove'})
        }
    }

    function changeQty ( value, index ) {
        setCartList(
            cartList.map( ( item, ind ) => {

                if ( ind == index )
                    return {
                        ...item,
                        qty: value,
                    };

                return item;
            } )
        )
    }

    return (
        <div className="main">
            <PageHeader title="Shopping Cart" subTitle="Shop" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">Shopping Cart</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-5">
                <div className="cart">
                    <div className="container">
                        {
                            cartList.length > 0 ?
                                <div className="row">
                                    <div className='col-lg-9 '>
                                        <div className="table-scroll fixTableHead">
                                            <table className="table table-cart table-mobile">
                                                <thead>
                                                    <tr>
                                                        <input className='rahi-checkbox' type="checkbox"  id="all-select"  name="all-select"  onChange={handleChange}  />
                                                        <label className='rahi-checkboxlabel'  >Subscribe all</label>
                                                    </tr>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th></th>
                                                        <th>Quantity</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { cartList.length > 0 ?
                                                        cartList.map( ( item, index ) =>
                                                            <tr key={ index }>
                                                                <td className="product-col">
                                                                    <input className='rahi-checkbox' type="checkbox" id="check2" value="1" name={item.item_code}  onChange={handleChange} ></input>
                                                                    <div className="product">
                                                                        <figure className="product-media">
                                                                            <ALink href={ `/product/default/${item.item_code}` } className="product-image">
                                                                                <img src={ process.env.NEXT_PUBLIC_ASSET_URI + item.image } alt="product" />
                                                                            </ALink>
                                                                        </figure>
                                                                        <h4 className="product-title">
                                                                            <ALink href={ `/product/default/${item.item_code}` }>{ item.item_code }  </ALink>
                                                                        </h4>

                                                                    </div>
                                                                </td>
                                                                <td className="product-col">
                                                                    <h7> <ALink href={ `#` }>{ item.description ? (item.description).replace(/(<([^>]+)>)/ig, '') : '' }</ALink></h7>
                                                                    <h9 className="rahi-cart-product-quantity"><br></br>In Stock ({ item.actual_qty }) </h9>
                                                                </td>
                                                                <td className="quantity-col">
                                                                    <Qty value={ item.qty } changeQty={ current => changeQty( current, index ) } adClass="cart-product-quantity"></Qty>
                                                                </td>
                                                                <td className="total-col">
                                                                </td>
                                                                <td className="remove-col">
                                                                    <button className="btn-remove" onClick={ () => props.removeFromCart( item ) }><i className="icon-close"></i></button>
                                                                </td>
                                                            </tr>
                                                        ) :
                                                        <tr>
                                                            <td>
                                                                <p className="pl-2 pt-1 pb-1"> No Products in Cart </p>
                                                            </td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div><br></br>
                                        <div className="rahi-cart-bottom">
                                                <button className="btn btn-outline-primary-2 btn-order btn-block" href="/customer/Subscription-form" onClick={props.handleshowSubscriptionform}><span>Proceed To Subscription</span><i className="icon-long-arrow-right"></i></button>
                                        </div>
                                    </div>
                                    <aside className="col-lg-3">
                                        <div className="summary summary-cart">
                                            <button
                                                className="btn btn-outline-primary-2 btn-order btn-block"
                                            //    onClick={props.handleshowSubscriptionform}
                                            >
                                                PROCEED TO CHECKOUT
                                            </button>
                                        </div>

                                        <ALink href="/shop/sidebar/list" className="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i className="icon-refresh"></i></ALink>
                                    </aside>
                                </div>
                                :
                                <div className="row">
                                    <div className="col-12">
                                        <div className="cart-empty-page text-center">
                                            <i className="cart-empty icon-shopping-cart" style={ { lineHeight: 1, fontSize: '15rem' } }></i>
                                            <p className="px-3 py-2 cart-empty mb-3">No products added to the cart</p>
                                            <p className="return-to-shop mb-0">
                                                <ALink
                                                    href="/shop/sidebar/list"
                                                    className="btn btn-primary"
                                                >RETURN TO SHOP</ALink>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ( state ) => (
    {

        cartItems: state.cartlist.data
    }
)

export default connect( mapStateToProps, { ...cartAction } )( Cart );