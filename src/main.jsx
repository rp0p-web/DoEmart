import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Navcomp/Navbar.jsx'
import Cards from './Navcomp/cards.jsx'
import Brands from './Navcomp/Brand.jsx'
import Network from './Navcomp/Network.jsx'
import Number from './Navcomp/Number.jsx'
import Footer from './Navcomp/Footer.jsx'
import CustomerLogin from './Navcomp/Customer/CustomerLogin.jsx'
import ShopCategory from './Navcomp/Customer/ShopCategory.jsx'
import ShopKeeperLogin from "./Navcomp/Customer/ShopKeeperLogin.jsx"
import UserLogin from './Navcomp/Customer/CusmainLogin.jsx'
import ShopmainLogin from './Navcomp/Customer/ShopmainLogin.jsx'
import ShopDashboard from './Navcomp/ShopDashboard/ShopDashboard.jsx'
import Shopkeepermanage from './Navcomp/Shopkeepermanage.jsx'
import ShopView from './Navcomp/ShopDashboard/Shopview.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const vahzi = createBrowserRouter([
  {
    path :"/",
    element :
    <>
    <Navbar/>
    <Cards/>
    <Brands/>
    <Number/>
    <Network/>
    <Footer/>

    </>
  },
  {
    path:"/customer",
    element:<CustomerLogin/>
  },
   {
    path:"/category",
    element:<ShopCategory/>
  },
   {
    path:"/shop",
    element:<ShopKeeperLogin/>
  }
  ,
   {
    path:"CusmainLogin",
    element:<UserLogin/>
  }
  ,
   {
    path:"shoplogin",
    element:<ShopmainLogin/>
  }
   ,
   {
    path:"shopdash",
    element:<ShopDashboard/>
  },
  {
     path:"shopm",
    element:<Shopkeepermanage/>
  },
  {
    path:"/shop/:id",
    element:<ShopView />
  }
    
    
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={vahzi}/>
  </StrictMode>,
)
