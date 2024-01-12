import React from 'react'
import {Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Pedidos from '../components/Pedidos';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../components/Login';
import Graficas from '../components/Graficas';
function MyRoutes() {
  return (
   <Routes>
     <Route exact path="/" element={<Login />} />
     <Route element={<PrivateRoute/>}>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/grafic' element={<Graficas/>}></Route>
        <Route path='/pedidos' element={<Pedidos/>}></Route>
     </Route>
   </Routes>
  
    
  )
}

export default MyRoutes