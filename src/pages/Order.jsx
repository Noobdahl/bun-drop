import React, { useEffect, useState } from 'react';
import OrderService from '../services/OrderService';
import OrderProductCard from '../components/OrderProductCard';
import { Link, useNavigate } from 'react-router-dom'

function Order() {
    const [order, setOrder] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setOrder(OrderService.getOrder());
    }, [])

    async function changeQuantity(event, target) {
        if (event === "+") {
            await OrderService.addToOrder(target.id);
            setOrder(OrderService.getOrder());
        }
        else
        {
            await OrderService.removeFromOrder(target.id);
            setOrder(OrderService.getOrder());
        }
    }

    function handleCheckout() {
        if (order.length > 0) {
            navigate("/checkout");
        }
        else {
            alert("You have no order!")
        }
    }

    return ( 
        <div className="order-site-container">
            <div className="order-card-container">
                {
                    order.map((i) => (
                        <OrderProductCard
                        key={i.id}
                        id={i.id}
                        name={i.name}
                        price={i.price}
                        quantity={i.quantity}
                        image={i.image}
                        handleClick={changeQuantity}/>
                    ))
                }
            </div>
            <div className="order-summary-container">
                <div className="order-summary-topbox">
                    {
                        order.map((i) => (
                            <div key={i.id} className="summary-order-item">
                                <span>{i.quantity}x {i.name}</span>
                                <span className="justify-end">{(i.price*i.quantity).toFixed(2)}$</span>
                            </div>
                        ))
                    }
                    <hr></hr>
                    <div className="summary-order-item">
                        <span>Total</span>
                        <span className="justify-end">{OrderService.GetTotalCost()}$</span>
                    </div>
                </div>
                <button className="product-card-order-btn glow-on-hover" onClick={handleCheckout}>CHECKOUT</button>
            </div>
        </div>
     );
}

export default Order;