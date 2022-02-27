import React from 'react'
import "./Checkout.css"
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
        <div className="checkout-left">
            <img className="checkout-ad"
            src="https://images-fe.ssl-images-amazon.com/images/G/09/hpny22MDE02/Day_Of/ja_JP_DO_PTR_CP_DT_2.jpg"
            alt="" />

            <div>
                <h3>Hello, {user.email}</h3>
                <h2 className="checkout-title">
                    Your shopping basket
                </h2>

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

        <div className="checkout-right">
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout