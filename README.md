# Bun Drop - a React project by M. Nordahl

Bun Drop is a React-based web application that simulates a futuristic burger ordering experience. With Bun Drop, users can browse a menu of delicious burgers and place orders that are delivered by flying drones. The app also provides features like adding favorites and a seamless checkout process for a convenient and enjoyable ordering experience.

## Install and startup

1. Install the dependencies: **npm install**
2. Launch the json-server: **npm run json**
3. Launch the app: **npm start**

## Features

- **Burger Menu**: Browse a wide range of delicious burgers, each with detailed descriptions and prices.
- **Add to Favorites**: Mark your favorite burgers for quick access and future orders.
- **Flying Drones**: Experience the thrill of drone delivery as your ordered burgers are brought to your location.
- **Seamless Checkout**: Easily review your order, select payment options, and complete the purchase process.


## My learning process

- When working on how to keep track of the order i first started working on saving all order objects in an array with useState. But after a short while I realized that the order would disappear when re-joining the app or interacting between pages, so i decided to use localStorage.

- When saving order in localStorage i also decided to add the quantity-property to the objects right when i put them inside the localStorage. In that way i could do a simple check when incrementing/decrementing duplicate items in the order, and just add to quantity if it already existed. I am very pleased with the result.

- I had some issues in the last phase of the project, when adding users and authorizing on pages. For some reason the useEffect/useStates got infinitely looped when using <Link>s to orient between pages. When i changed to the similar useNavigate all issues went away.

- I chose early on to use css and classes to style the app. Mainly because i find it easier to try different looks, since the syntax changed when using reacts styling-syntax.

- Initially I was focused on separating my logic to the OrderService, but unfortunately I got into my bad habit of just mashing code for longer periods of time and create a mess in the components instead. There is alot of cleaning up and optimizing to do.