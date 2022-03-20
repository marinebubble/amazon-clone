import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  "pk_test_51KYAILFF7Q2fbfRNmG7SJN6Dm5fNfEz8P3BQiJ8NhvJ6GhEBaQSFzE59SC0xR5tS5EvZJbI1VqHwdoAcV8sffpn200RfH3Nx7U"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>> ', authUser)

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, []);

  return (
    <Router>
    <div className="App">
        <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<><Header /> <Checkout /></>} />
            <Route path="/payment" element={
            <>
              <Header/>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
              </>}/>
            <Route path="/" element={<><Header /> <Home /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
