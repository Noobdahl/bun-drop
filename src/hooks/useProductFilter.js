import { useState } from 'react'

function useProductFilter(products) {
    const [filteredProducts, setFilteredProducts] = useState([])

    function filterProducts(filter)
    {
        let tempArray = []
        if (filter === "All"){
            tempArray = products;
        }
        else if (filter === "Burgers" || filter === "Drinks" || filter === "Misc")
        {
            tempArray = products.filter((p) => {return p.category === filter})
        }
        else
        {
            tempArray = products.filter((p) => {return p.name.toLowerCase().includes(filter.toLowerCase())})
        }
        setFilteredProducts(tempArray);
    }

    return { filteredProducts, filterProducts};
}

export default useProductFilter;