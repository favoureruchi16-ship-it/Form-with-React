import { useState } from "react";

import Login from "./Pages/Login"
import './App.css'
import Register from "./Pages/Register"
import ForgetPassword from "./Pages/ForgetPassword"
import RestPassword from "./Pages/RestPassword"
import OTP from "./Pages/OTP"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";



const App = ()=>{
  return (

<div>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/reset-password" element={<RestPassword />} />
    <Route path="/otp" element={<OTP />} />
  </Routes>

  <ToastContainer autoClose={5000} />
</div>


  )

}

export default App