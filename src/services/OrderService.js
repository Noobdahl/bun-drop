class OrderService {
    static resetOrderCookie()
    {
        let order = []
        localStorage.setItem("bundropOrder", JSON.stringify(order))
    }

    static getOrder() {
        let order = localStorage.getItem("bundropOrder")
        if (!order) {
            return order = []
        }
        order = JSON.parse(order)
        return order;
    }

    static async addToOrder(id) {
        let order = this.getOrder()

        await fetch(`http://localhost:7000/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            if (!this.isProductInOrderIncrementIt(data.id, order)) {
                data.quantity = 1;
                order.push(data);
            }
        })
        
        localStorage.setItem("bundropOrder", JSON.stringify(order))
    }

    static async removeFromOrder(idToRemove) {
        let order = this.getOrder()
        
        for (let i = 0; i < order.length; i++) {
            if (order[i].id === idToRemove) {
                if (order[i].quantity > 1) {
                    order[i].quantity--;
                }
                else
                {
                    order.splice(i, 1)
                }
                await localStorage.setItem("bundropOrder", JSON.stringify(order))
                return
            }
        }
    }

    static isProductInOrderIncrementIt(productId, order)
    {
        for (let i = 0; i < order.length; i++) {
            if (order[i].id === productId){
                order[i].quantity++;
                return true
            }
        }
        return false
    }

    static GetTotalCost()
    {
        let order = this.getOrder()
        let totalCost = 0;
        for (let i = 0; i < order.length; i++) {
            for (let j = 0; j < order[i].quantity; j++) {
                totalCost += order[i].price;
            }
        }
        return totalCost.toFixed(2);
    }

    static getRandomTime()
    {
        let start = Math.floor(Math.random() * 6) + 10
        let end = start + 2
        return start + " - " + end
    }

    static saveOrderToDb(confirmedOrder)
    {
        fetch('http://localhost:7000/orders', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(confirmedOrder)
        })
    }


    // Favorite section

    static async addToFav(id) {
        let order = this.getOrder()

        await fetch(`http://localhost:7000/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            this.addFav(data)
        })
    }

    static getFavs() {
        let favorites = localStorage.getItem("favorites")
        if (!favorites) {
            return favorites = []
        }
        favorites = JSON.parse(favorites)
        return favorites;
    }

    static addFav(favToAdd)
    {
        let favorites = this.getFavs();
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].name === favToAdd.name) {
                alert(favToAdd.name + " is already a favorite!")
                return
            }
        }
        favorites.push(favToAdd)
        localStorage.setItem("favorites", JSON.stringify(favorites))
        alert("Added " + favToAdd.name + " to your favorites!")
    }

    static async removeFromFav(idToRemove)
    {
        let favorites = this.getFavs();

        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === parseInt(idToRemove, 10)) {
                favorites.splice(i, 1)
                await localStorage.setItem("favorites", JSON.stringify(favorites))
                return
            }
        }
    }

}

export default OrderService