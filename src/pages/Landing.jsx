import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import OrderService from '../services/OrderService';

function Landing() {

    const [order, setOrder] = useState([])

    useEffect(() => {
        setOrder(OrderService.getFavs());
    }, [])

    function showAddPopup()
    {
        alert("Added to order!")
    }

    async function handleRemove(e) {
        await OrderService.removeFromFav(e.target.id)
        setOrder(OrderService.getFavs())
    }

    return ( 
        <div className="landing-container">
            <h1>Welcome 'username'!</h1>
            <h3>Here are your favorites:</h3>
            <div className="favorite-container">
                {
                    order.map((p) => (
                        <div key={p.id}>
                            <ProductCard
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            image={p.image}
                            handleAdd={showAddPopup}
                            />
                            <span id={p.id} onClick={handleRemove}>Remove</span>
                        </div>
                    ))
                }
            </div>
        </div>
     );
}

export default Landing;