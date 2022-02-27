import React, { useState } from 'react'
import "./Login.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            navigate('/')
        })
        .catch(error => alert(error.message))

        // firebase login
    }

    
    const register = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            // it successfully created a new use with email and password
            console.log(auth);
            if (auth) {
                navigate('/')
            }
        })
        .catch(error => alert(error.message))
        // firebase register
    }

  return (
    <div className="login">
        <Link to='/'>
            <img className="login-logo"
            src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'/>
        </Link>

        <div className="login-container">
            <h1>Sign In</h1>
            <form>
                <h5>E-mail</h5>
                <input type="text" value={email} 
                    onChange={e => setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" value={password} 
                    onChange={e => setPassword(e.target.value)} />
                <button className="login-signIn-button" onClick={signIn}>Sign In</button>

                <p>
                By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>

                <button className="login-register-button" onClick={register}>Create your Amazon Account</button>
            </form>

        </div>
    </div>
  )
}

export default Login;