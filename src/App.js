import './App.css';
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Menu from './pages/Menu'
import Order from './pages/Order'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="main">
      <div className="bg"></div>
      <Navbar/>
      <Routes>

        <Route 
        path="/"
        element={<Login/>}/>

        <Route
        path="/landing"
        element={<Landing/>}/>

        <Route
        path="/menu"
        element={<Menu/>}/>

        <Route
        path="/order"
        element={<Order/>}/>

        <Route
        path="/checkout"
        element={<Checkout/>}/>

        <Route
        path="*"
        element={<NotFound/>}/>

      </Routes>
    </div>
  );
}

export default App;
