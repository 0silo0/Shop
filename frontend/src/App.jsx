import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './templates/shop/shop'
import ShopCategory from './templates/shop-category/shop-category'
import Cart from './templates/cart/cart'
import Product from './templates/product/product'
import LoginSignUp from './templates/login-signup/login-signup'
import About from './components/About/About'


function App() {
  return (
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCategory category='men'/>}/>
          <Route path='/womens' element={<ShopCategory category='women'/>}/>
            <Route path='product' element={<Product/>}>
              <Route path=':productId' element={<Product/>}/>
            </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignUp/>}/>
          <Route path='/about' element={<About />}/>
        </Routes>
        </BrowserRouter>
  )
}

export default App
