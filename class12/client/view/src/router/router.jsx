import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, SignUp } from '../components'

const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
    </Routes>
    
    </>
  )
}

export default Router