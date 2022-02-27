import React from 'react'
import './Header.css'

import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{basket, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

  return (
        <div className="header">
            <Link to="/">
                <img 
                    className="header-logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>

        <div className="header-search">
            <input className="header-search-input"></input>
            <SearchIcon className="header-search-icon" />
        </div>

        <div className="header-nav">
            <Link to={!user && '/login'}>
                <div className="header-option">
                    <span className="header-optionLineOne"
                    onClick={handleAuthentication}>Hello {!user ? 'Guest' : user.email}</span>
                    <span className="header-optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
            </Link>
            <div className="header-option">
                <span className="header-optionLineOne">Returns</span>
                <span className="header-optionLineTwo">& Orders</span>
            </div>
            <div className="header-option">
                <span className="header-optionLineOne">Your</span>
                <span className="header-optionLineTwo">Prime</span>
            </div>
        </div>

        <Link to="/checkout"> 
            <div className="header-option-basket">
                <ShoppingBasketIcon />
                <span className="header-optionLineTwo header-basket-count">
                    {basket?.length}
                </span>
            </div>
        </Link>
    </div>
  )
}

export default Header