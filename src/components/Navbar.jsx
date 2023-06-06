import React from 'react';
import logo from '../images/Dronelogo.png'
import { Link } from 'react-router-dom'
import OrderService from '../services/OrderService';

function Navbar() {

    function resetOrder()
    {
        OrderService.resetOrderCookie();
    }
    return ( 
        <div className="navbar text-outline">
            <Link to="/landing">
                <div className="navbar-menu">
                    <img className="drone-logo" src={logo} alt=""/> 
                    <span className="no-decoration">BUN DROP</span>
                </div>
            </Link>
            <div className="navbar-menu">
                <Link to="/menu">
                    <span className="underline-on-hover">MENU</span>
                </Link>
                <Link to="/order">
                    <span className="underline-on-hover">ORDER</span>
                </Link>
            </div>
            
            {/* <div>
                <button onClick={resetOrder}>Reset Order</button>
            </div> */}
        </div>
     );
}

export default Navbar;