import './App.css';
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Menu from './pages/Menu'
import Order from './pages/Order'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'
import { RequireAuth } from 'react-auth-kit';

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
        element={
        <RequireAuth loginPath="/">
          <Landing/>
        </RequireAuth>}/>

        <Route
        path="/menu"
        element={
          <RequireAuth loginPath="/">
            <Menu/>
          </RequireAuth>
        }/>

        <Route
        path="/order"
        element={
          <RequireAuth loginPath="/">
            <Order/>
          </RequireAuth>}/>

        <Route
        path="/checkout"
        element={
          <RequireAuth loginPath="/">
            <Checkout/>
          </RequireAuth>
        }/>

        <Route
        path="*"
        element={<NotFound/>}/>

      </Routes>
    </div>
  );
}

export default App;
