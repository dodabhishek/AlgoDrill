import React from 'react'
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';
import { Loader } from "lucide-react";a
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './pages/mainComponent/Navbar.jsx';

{/* <div className="flex items-center justify-center h-screen">
         {/* <Loader className="size-10 animate-spin" /> */}
         
      // </div> */}

 const App = () => {
    const { theme } = useThemeStore();
  return (
     <div data-theme={theme}>
        
     <Navbar />

     <Routes>
      {/* <Route path='/' element= {}/> */}
     </Routes>
      
       
  
    </div>
  )
};

export default App;

