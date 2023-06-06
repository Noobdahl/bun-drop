import React, { useState } from 'react';
import OrderService from '../services/OrderService';
import { useNavigate } from 'react-router-dom'

function Checkout() {
    const navigate = useNavigate();

    const [order, setOrder] = useState(OrderService.getOrder())
    const [swish, setSwish] = useState(false)
    const [mastercard, setMastercard] = useState(false)
    const [adress, setAdress] = useState("")
    const [city, setCity] = useState("")
    const [phonenumber, setPhonenumber] = useState(0)
    const [accnumber, setAccnumber] = useState(0)
    const [errMsg, setErrMsg] = useState("")

    const handleCheckboxChange = (e) => {
        if (e.target.id === "swish") {
            setSwish(e.target.checked)
            if (e.target.checked) {
                setMastercard(false)
            }
        }
        else {
            setMastercard(e.target.checked)
            if (e.target.checked) {
                setSwish(false)
            }
        }
    }

    function handleChange(e)
    {
        if(e.target.id === "adressInput") {
            setAdress(e.target.value)
        }
        else if(e.target.id === "cityInput") {
            setCity(e.target.value)
        }
        else if(e.target.id === "phonenumber") {
            setPhonenumber(e.target.value)
        }
        else if(e.target.id === "accnumber") {
            setAccnumber(e.target.value)
        }
    }

    function handleConfirm() 
    {
        if (!swish && !mastercard) {
            showRequirements("Please choose payment method.")
            return
        }
        if (adress.length < 1) {
            showRequirements("Please enter your adress")
            return
        }
        if (city.length < 1) {
            showRequirements("Please enter your city")
            return
        }
        if ((swish && phonenumber.length < 10) ||(swish && phonenumber.length === undefined)) {
            showRequirements("Please enter a valid phonenumber, ex: 0701234567")
            return
        }
        if ((mastercard && accnumber.length < 16) ||(mastercard && accnumber.length === undefined)) {
            showRequirements("Please enter a valid account number, expecting 16 digits.")
            return    
        }

        openModal()
        // Saving order to DB
        if (order !== undefined)
        {
            let orderModel = {
                order: order,
                user: {id: 1, name: "micke"}
            }
            OrderService.saveOrderToDb(orderModel)
        }
    }

    
    function openModal()
    {
        // Logik här för requirements
        const modal = document.querySelector("[data-modal]")
        modal.showModal()
    }
    function closeModal() 
    {
        OrderService.resetOrderCookie();
        const modal = document.querySelector("[data-modal]")
        modal.close()
        navigate("/landing");
    }


    function showRequirements(msg)
    {
        setErrMsg(msg)
        const modal = document.querySelector("[data-modal-req]")
        modal.showModal()
    }
    function closeReqModal() 
    {
        const modal = document.querySelector("[data-modal-req]")
        modal.close()
    }
    
    return ( 
        <div className="checkout-container">

            <dialog data-modal-req>
            <div className="confirmation-modal-container">

                <h2>Something went wrong!</h2>
                <div className="confirm-info">
                    <em>{errMsg}</em>
                </div>
                <button className="product-card-order-btn glow-on-hover button-lightup" data-close-modal onClick={closeReqModal}>Close</button>
                </div>
            </dialog>

            <dialog data-modal>
                <div className="confirmation-modal-container">

                    <h2>Thank you for your order!</h2>
                    <h5>Your order is being taken care of and will soon be airborne.</h5>
                    <div className="confirm-info">
                        <em>City: {city}</em>
                        <em>Adress: {adress}</em>
                    </div>
                    <h4>ETA: {OrderService.getRandomTime()} minutes</h4>
                    <div className="order-summarize-container">
                        Your order:
                        <hr></hr>
                        {
                            order.map((i) => (
                                <div key={i.id}>{i.quantity}x - {i.name}</div>
                            ))
                        }
                    </div>
                    <button className="product-card-order-btn glow-on-hover button-lightup" data-close-modal onClick={closeModal}>Close</button>
                </div>
            </dialog>
            
            <div className="checkout-top-part">

                <div>
                    <h1>Delivery Information:</h1>
                    <input id="adressInput" className="checkout-input" type="text" placeholder="Adress..." onChange={handleChange}/>
                    <input id="cityInput" className="checkout-input" type="text" placeholder="City..." onChange={handleChange}/>
                </div>

                <div>
                    <h1>Choose payment method:</h1>
                    <div className="fake-input">
                        <input id="swish" className="checkout-checkbox" checked={swish} type="checkbox" onChange={handleCheckboxChange}/>
                        <img src={require(`../images/Swishlogo.png`)} alt="" />
                    </div>
                    <div className="fake-input mastercard">
                        <input id="mastercard" className="checkout-checkbox" checked={mastercard} type="checkbox" onChange={handleCheckboxChange}/>
                        <img src={require(`../images/Mastercardlogo.png`)} alt="" />
                        <h2>mastercard</h2>
                    </div>

                    <input id="phonenumber" className={`${swish ? '' : 'hidden'} checkout-input`} type="number" placeholder="Phonenumber..." onChange={handleChange}/>
                    <input id="accnumber" className={`${mastercard ? '' : 'hidden'} checkout-input`} type="number" placeholder="Account number..." onChange={handleChange}/>
                </div>


                <div>
                    
                </div>
            </div>
            <div>
                <button className="product-card-order-btn glow-on-hover button-lightup big-btn" onClick={handleConfirm}>Confirm order</button>
            </div>
        </div>
     );
}

export default Checkout;