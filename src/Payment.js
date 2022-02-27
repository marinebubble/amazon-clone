import React from 'react'
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
  return (
    <div className="payment">
        <div className="payment-container">
            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                )
            </h1>
            <div className="payment-section">
                <div className="payment-title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment-address">
                    <p>{user?.email}</p>
                    <p>Higashi Rokugo 3-21-13</p>
                    <p>Ota-ku, Tokyo, Japan</p>
                </div>
            </div>
            <div className="payment-section">
                <div className="payment-title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment-items">
                    {/* Products we're gonna show */}
                    {basket.map(item => (
                        <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        rating={item.rating}
                    />
                ))}
                </div>
            </div>
            <div className="payment-section">
                <div className="payment-title">
                    <h3>Payment method</h3>
                </div>
                <div className="payment-details">
                    {/*  */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment