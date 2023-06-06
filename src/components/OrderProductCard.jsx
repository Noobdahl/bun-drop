import React, { useState } from 'react';

function OrderProductCard(props) {
    const [quantity, setQuantity] = useState(props.quantity)

    function handleClick(e) {
        if (e.target.innerHTML === "+") {
            setQuantity(quantity+1)
        }
        else {
            setQuantity(quantity-1)
        }
        props.handleClick(e.target.innerHTML, props)
    }
    if (quantity < 1)
    {
        return (<div></div>)
    }
    return ( 
        <div className="order-card">
            <img src={require(`../images/${props.image}`)} alt="" />
            <div className="order-card-info">
                <h1>{props.name}</h1>
                <div className="order-card-price-btns">
                    <h2>{props.price}</h2>
                    <button className="order-card-btn glow-on-hover" onClick={handleClick}>-</button>
                    <h1>{quantity}</h1>
                    <button className="order-card-btn glow-on-hover" onClick={handleClick}>+</button>
                </div>
            </div>
        </div>
     );
}

export default OrderProductCard;