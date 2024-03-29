import { useEffect, useState } from 'react';
import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import Moment from 'moment';
import Popup from 'reactjs-popup';
import React from 'react';
import 'reactjs-popup/dist/index.css';

function mysubscription(props) {
    const [data, setdata] = useState([]);
    const [isShow, setIsShow] = useState(false)
    const [popdata, setpopdata] = useState([])

    useEffect(() => {
        setdata(props.sublst.map(d => ({ ...d, status: "Subscribe" })));
    }, [])

    return (
        <div className="main">
            
            {
            isShow &&
                <Popup
                    open={isShow}
                    modal nested>
                    <div className='newpopup'>
                        <span ><b>Product Details</b>
                            <button className="close" onClick={() => setIsShow(false)}>x</button>
                            <br /><br />
                        </span><b>Itemcode - </b> {popdata.itemcode} <br /> <br />
                        <b>Description - </b>{popdata.description.replace(/(<([^>]+)>)/ig, '')}
                    </div>
                </Popup>
            }
            
            <PageHeader title="My Subscriptions" subTitle="Account Information" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Customer</ALink>
                        </li>
                        <li className="breadcrumb-item active">my Subscription</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="ticket">
                    <div className="container">

                        <div>
                            <div className="row">
                                <div className="subscribe-rahimyorder-col-sm-6">
                                    <h3 >My Subscriptions</h3>
                                    <hr className="mt-0"></hr>
                                    <br></br>
                                    <div id="table-wrapper" >
                                        <div className="table-scroll fixTableHead">
                                            <table className="custom_info data" id="myTable">
                                                <thead>
                                                    <tr >
                                                        <th scope="col" className="rahi-col id">Subscription Id</th>
                                                        <th scope="col" className="rahi-col date">Purchase Date</th>
                                                        <th scope="col" className="rahi-col shipping">Next Purchase Date</th>
                                                        <th scope="col" className="rahi-col status">Status</th>
                                                        <th scope="col" className="rahicol actions">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.map((d, index) => (
                                                            <>
                                                                <tr className="parent" key={index}>
                                                                    <td className='rahi-down-caret'>{d['itemcode']}</td>
                                                                    <td className='rahi-down-table'> {Moment(d['Transaction Date']).format('MM/DD/YYYY')}</td>
                                                                    <td className='rahi-down-table'>{props.subdate}</td>
                                                                    <td className='rahi-down-table' >{d.status}</td>
                                                                    <td data-th="Actions" className="rahi-col actions rahi-down-table">
                                                                        {/* <button className="action view" onClick={props.subformshow}><span>View </span>  |</button>  */}
                                                                        <div>
                                                                            <button name={d["itemcode"]} value={d["description"]} onClick={() =>
                                                                                {
                                                                                    setpopdata(data[index])
                                                                                    // console.log(popdata)
                                                                                    setIsShow(true)
                                                                                }}
                                                                            >
                                                                                <span>View</span> 
                                                                            </button>
                                                                        </div>
                                                                        <span>|</span>
                                                                        <button className="action view" onClick={(e) => {
                                                                            var temp = data[index];
                                                                            var newArray = data.map(dt => {
                                                                                if (dt.itemcode === temp.itemcode) {
                                                                                    return {
                                                                                        ...temp,
                                                                                        status: "Unsubscribe",
                                                                                    }
                                                                                } else {
                                                                                    return dt
                                                                                }
                                                                            })
                                                                            setdata(newArray)

                                                                        }}><span> Cancel Subscription</span></button>
                                                                    </td>
                                                                </tr>

                                                            </>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default mysubscription;