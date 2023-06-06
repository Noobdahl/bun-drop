import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import useProductFilter from '../hooks/useProductFilter'

function Menu() {
    const [products, setProducts] = useState([])
    const {filteredProducts, filterProducts} = useProductFilter(products);
    const [popupName, setpopupName] = useState("")

    useEffect(() => {
        fetch('http://localhost:7000/products')
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            filterProducts("All")
        }
    }, [products])

    function handleFiltering(e)
    {
        const all = document.getElementById('filterAll')
        const burgers = document.getElementById('filterBurgers')
        const drinks = document.getElementById('drinks')
        const misc = document.getElementById('misc')
        all.classList.remove('underline')
        burgers.classList.remove('underline')
        drinks.classList.remove('underline')
        misc.classList.remove('underline')
        e.target.classList.add('underline')
        filterProducts(e.target.innerText);
    }

    function showAddPopup(addedItem)
    {
        setpopupName(addedItem)
        const modal = document.querySelector("[data-modal]")
        modal.showModal()
    }
    function closeModal() 
    {
        const modal = document.querySelector("[data-modal]")
        modal.close()
    }

    function handleDynamic(e)
    {
        const all = document.getElementById('filterAll')
        const burgers = document.getElementById('filterBurgers')
        const drinks = document.getElementById('drinks')
        const misc = document.getElementById('misc')
        burgers.classList.remove('underline')
        drinks.classList.remove('underline')
        misc.classList.remove('underline')
        all.classList.add('underline')
        filterProducts(e.target.value)
        
        console.log(e.target.value)
    }

    return ( 
        <div>

            <dialog data-modal>
                <div className="added-modal-container">
                    <h2>{popupName} added to order!</h2>
                    <button className="product-card-order-btn button-lightup" data-close-modal onClick={closeModal}>OK</button>
                </div>
            </dialog>

            <div className="menu-filter-container text-outline">
                <span id="filterAll" className="underline-on-hover underline" onClick={handleFiltering}>All</span>
                <span id="filterBurgers" className="underline-on-hover" onClick={handleFiltering}>Burgers</span>
                <span id="drinks" className="underline-on-hover" onClick={handleFiltering}>Drinks</span>
                <span id="misc" className="underline-on-hover" onClick={handleFiltering}>Misc</span>
            </div>
            <div className="center search">
                <input className="dynamic-search" type="text" placeholder='Search...' onChange={handleDynamic}/>
            </div>
            <div className="product-card-container">
                {filteredProducts.map((p) => (
                    <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image}
                    handleAdd={showAddPopup}
                    />
                ))}
            </div>
            
        </div>
     );
}

export default Menu;