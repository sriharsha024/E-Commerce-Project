import './App.css'
import React from 'react';
import Home from './components/home/Home';
import Products from './components/products/Products';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/shared/NavBar';
import About from './components/About';
import Contact from './components/Contact';
import { Toaster } from 'react-hot-toast';
import Cart from './components/cart/Cart';
import LogIn from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/auth/Register';
import Checkout from './components/checkout/Checkout';


function App() {

  return (
    <React.Fragment>
    <Router><NavBar/>
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/products' element={<Products /> } />
        <Route path='/about' element={<About /> } />
        <Route path='/contact' element={<Contact/> } />
        <Route path='/cart' element={<Cart/> } />
        
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/checkout' element={<Checkout/> } />
        </Route>

        <Route path='/' element={<PrivateRoute publicPage/>}>
          <Route path='/login' element={<LogIn/> } />
          <Route path='/register' element={<Register/> } />
        </Route>
      </Routes>
    </Router>
    <Toaster position='top-center'/>
    </React.Fragment>
  )
}

export default App
