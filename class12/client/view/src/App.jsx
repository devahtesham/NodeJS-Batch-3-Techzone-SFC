import React from 'react'
import Router from './router/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "./components/Taostify/Toastify"

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App