import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Chatpage from './pages/Chatpage'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import { useAuthStore } from './store/useAuthStore'
import LoadingElement from './components/LoadingElement'
import  { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({ authUser });
  
  if (isCheckingAuth) return <LoadingElement />

  return (
    
    <div className='min-h-screen bg-slate-900 text-slate-200 relative flex items-center justify-center   p-5 overflow-hidden'>
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route path="/" element={ authUser ? <Chatpage/> : <Navigate to={"/login"}/>} />
        <Route path="/login" element={!authUser ? <LogIn/> : <Navigate to={"/"}/>} />
        <Route path="/signup" element={!authUser ? <SignUp/> : <Navigate to={"/"}/>} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
