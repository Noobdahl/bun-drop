import OrderService from "../services/OrderService";

function ProductCard(props) {

    function handleAddToOrder()
    {
        OrderService.addToOrder(props.id)
        props.handleAdd(props.name);
    }
    function handleAddToFav()
    {
        OrderService.addToFav(props.id)
    }

    return ( 
        <div className="product-card">
            <img src={require(`../images/${props.image}`)} alt="" />
            <h1 className="text-outline">{props.name}</h1>
            <h3 className="text-outline">{props.price} $</h3>
            <button onClick={handleAddToOrder} className="product-card-order-btn glow-on-hover button-lightup">ADD</button>
            <button className="product-card-order-btn glow-on-hover button-lightup" id="fav-btn" onClick={handleAddToFav}>Favorite</button>
        </div>
     );
}

export default ProductCard;