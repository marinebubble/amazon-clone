import React, { useEffect, useState } from 'react'
import axios from './axios';
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { db } from './firebase';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const stringClientSecret = clientSecret.toString();

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', stringClientSecret)
    console.log('👱', user)

    const handleSubmitForm = async(e) => {
        // handle the stripe stuff
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(stringClientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders');
        })
    }

    const handleChangeCardElement = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

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
                    <form onSubmit={handleSubmitForm}>
                        <CardElement onChange={handleChangeCardElement} />

                        <div className="payment-price-container">
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)} // Part of homework
                                displayType={"text"} 
                                thousandSeparator={true}
                                prefix={"¥"} 
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>

                        {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment