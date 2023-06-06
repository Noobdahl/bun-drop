import React, { useState, useEffect } from 'react';
import logo from '../images/Dronelogo.png'
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit';
// import OrderService from '../services/OrderService';


function Navbar() {
    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        setIsSignedIn(isAuthenticated());
    }, [])

    function handleLink(e) {
        if(isAuthenticated()){
            if (e.target.innerText === "MENU") {
                navigate("/menu")
            }
            else if (e.target.innerText === "ORDER") {
                navigate("/order")
            }
            else if (e.target.innerText === "BUN DROP") {
                navigate("/landing")
            }
        }
        else {
            alert("You need to log in to see dem burgers...")
            navigate("/")
        }
    }
    // function resetOrder()
    // {
    //     OrderService.resetOrderCookie();
    // }

    function handleLogout() {
        signOut();
        setIsSignedIn(false);
        navigate("/");
    }
    return ( 
        <div className="navbar text-outline">
                <div className="navbar-menu">
                    <img className="drone-logo" src={logo} alt=""/> 
                    <span className="no-decoration add-pointer" onClick={handleLink}>BUN DROP</span>
                </div>
            <div className="navbar-menu">
                <span className="underline-on-hover add-pointer" onClick={handleLink}>MENU</span>
                <span className="underline-on-hover add-pointer" onClick={handleLink}>ORDER</span>
            </div>

            <div>
                <button id="logout-btn" className={isSignedIn ? 'visible' : 'hidden'} onClick={handleLogout}>Logout</button>
            </div>
            
            {/* <div>
                <button onClick={resetOrder}>Reset Order</button>
            </div> */}
        </div>
     );
}

export default Navbar;