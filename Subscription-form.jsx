import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { post } from '~/server/api';
import ALink from '~/components/features/alink';
import Qty from '~/components/features/qty';
import PageHeader from '~/components/features/page-header';
import Select from 'react-select';
import Subscribe from "./Subscribe"

function Subscriptionform(props) {

    const [cartList, setCartList] = useState([]);
    const [popCodes, setPopCodes] = useState([]);
    const [sublst, setSublst] = useState([]);
    const [subscribe, setSubscribe] = useState(false);
    const [subfrequency, setsubfrequency] = useState([]);
    
    const [day1, setday1] = useState();
    const [subdate, setdate1] = useState();
    const [yeardate, setdateyear1] = useState();

    useEffect(() => {
        const url = "method/shopnosco.public.api.shopnosco_api.pop_codes"
        // let data = {}
        post(url, {})
            .then(response => {
                let result = response.message ? response.message : '';
                let newData = [];
                for (let row in result) {
                    newData.push(result[row])
                }
                setPopCodes(newData);
            })
    // }, [])
    // useEffect(() => {
        let sublist = localStorage.getItem('subList')
        let lst = []
        let sublst = []
        for (let temp in props.cartItems) {
            if (sublist.includes("all-select")) {
                lst.push(props.cartItems[temp])
                let dict = { 'itemcode': props.cartItems[temp]['item_code'] }
                sublst.push(dict)
            }
            if (sublist.includes(props.cartItems[temp]['item_code'])) {
                lst.push(props.cartItems[temp])
                let dict = { 'itemcode': props.cartItems[temp]['item_code'] }
                sublst.push(dict)
            }

        }

        setSublst(sublst);
        setCartList(lst);

        {

            var today = new Date();
            var day = today.toLocaleString('en-us', { weekday: 'long' });
            setday1(day)

            var todaydate = (today.getDate())
            var month = today.toLocaleString('default', { month: 'long' });
            var newmonthdate = month + " " + todaydate
            setdateyear1(newmonthdate)
        }

    }, [props.cartItems])

    function changeQty(value, index) {
        setCartList(
            cartList.map((item, ind) => {
                if (ind == index)
                    return {
                        ...item,
                        qty: value,
                    };
                return item;
            })
        )
    }

    function subshow() {
        setSubscribe(true)
    }

    function subformshow() {
        setSubscribe(false)
    }

    function sub_frequency(e) {
        setsubfrequency(e.target.value)
        let value1 = e.target.value
        
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var day = today.toLocaleString('en-us', { weekday: 'long' });
        
        if (value1 == "Daily") {
            var date = (today.getMonth() + 1) + '/' + (today.getDate() + 1) + '/' + today.getFullYear();
            var Daily = date
            setdate1(Daily)
        }
        if (value1 == "Weekly") {
            var date = (today.getMonth() + 1) + '/' + (today.getDate() + 6) + '/' + today.getFullYear();
            var Weekly = date
            setdate1(Weekly)
        }
        if (value1 == "Monthly") {
            var date = (today.getMonth() + 2) + '/' + today.getDate() + '/' + today.getFullYear();
            var Monthly = date
            setdate1(Monthly)
        }
        if (value1 == "Yearly") {
            var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + (today.getFullYear() + 1);
            var Yearly = date
            setdate1(Yearly)
        }
        if (value1 == "Do not repeat") {
            setdate1("Do not repeat")
        }
    }
    return (
        <>
            {subscribe ?
                <Subscribe sublst={sublst} subformshow={subformshow} subfrequency={subfrequency} subdate={subdate} /> :
                <div >
                    <PageHeader title="Subscription Form" subTitle="Shop" />
                    <nav className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <ALink href="/">Home</ALink>
                                </li>
                                <li className="breadcrumb-item">
                                    <ALink href="/shop/sidebar/list">Customer</ALink>
                                </li>
                                <li className="breadcrumb-item active">Subscription Form</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="page-content pb-5">
                        <div className="cart">
                            <div className="container">
                                <h3 >Subscription Form</h3>
                                <hr className="mt-0"></hr>
                                <div>
                                    <div className="table-scroll fixTableHead">
                                        <table className="table table-cart table-mobile  ">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th></th>
                                                    <th>Quantity</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {cartList.length > 0 ?
                                                    cartList.map((item, index) =>
                                                        <tr key={index}>
                                                            <td className="product-col">
                                                                <div className="product">
                                                                    <figure className="product-media">
                                                                        <ALink href={`/product/default/${item.item_code}`} className="product-image">
                                                                            <img src={process.env.NEXT_PUBLIC_ASSET_URI + item.image} alt="product" />
                                                                        </ALink>
                                                                    </figure>

                                                                    <h4 className="product-title">
                                                                        <ALink href={`/product/default/${item.item_code}`}>{item.item_code}  </ALink>

                                                                    </h4>

                                                                </div>
                                                            </td>

                                                            <td className="product-col">
                                                                <h7> <ALink href={`#`}>{item.description ? (item.description).replace(/(<([^>]+)>)/ig, '') : ''}</ALink></h7>
                                                                <h9 className="rahi-cart-product-quantity"><br></br>In Stock ({item.actual_qty}) </h9>
                                                                <h9 className="rahi-cart-product-quantity"><br></br>Previous Subscriprions  (---) </h9>
                                                            </td>

                                                            <td className="quantity-col">
                                                                <Qty value={item.qty} changeQty={current => changeQty(current, index)} adClass="cart-product-quantity"></Qty>
                                                            </td>

                                                            <td className="total-col">
                                                            </td>

                                                            <td className="remove-col">
                                                                <button className="btn-remove" onClick={() => props.removeFromCart(item)}><i className="icon-close"></i></button>
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
                                    <div className="subscription-rahi-column_1">
                                        <label className='subscription-frequency'>Subscription Frequency</label>
                                        <div>
                                            <select onClick={sub_frequency} className="subscription-inner" >
                                                <option value=" ">--Select--</option>
                                                <option value="Daily">Daily</option>
                                                <option value="Do not repeat">Do not repeat</option>
                                                <option value="Weekly">Weekly on {day1}</option>
                                                <option value="Monthly on the fourth Thursday">Monthly on the fourth Thursday</option>
                                                <option value="Monthly on the last Thursday">Monthly on the last Thursday</option>
                                                <option value="Yearly">Annualy on {yeardate}</option>
                                                <option value="Every weekday (Monday to Friday)">Every weekday (Monday to Friday)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="subscription-rahi-column_2">
                                        <label className='subscription-frequency' >Shipping Address</label>
                                        <div>
                                            <Select
                                                options={popCodes}
                                                placeholder=""
                                            />

                                        </div>
                                    </div>
                                    <div className="subscription-rahi-cart-bottom">
                                        <button className="btn btn-outline-primary-2 inner" onClick={props.handleshowback}><span>Back</span><i className="icon-long-arrow-left"></i></button>
                                        <ALink className="btn btn-outline-primary-2 inner" href="/ticket_success" ><span>Submit The Subscription</span></ALink>
                                        <button className="btn btn-outline-primary-2 inner" onClick={subshow}><span>My Subscription</span><i className="icon-long-arrow-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => (
    {
        cartItems: state.cartlist.data,
    }
)

export default connect(mapStateToProps)(Subscriptionform);