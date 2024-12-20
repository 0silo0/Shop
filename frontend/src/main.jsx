import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { RouterProvider } from 'react-router-dom'
import ShopContextProvider from './context/ShopContenxt.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopContextProvider>
      <App/>
    </ShopContextProvider>
  </StrictMode>,
)
