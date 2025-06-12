import React, { useState } from "react";

import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import EventTracker from './pages/eventTracker/EventTracker.jsx';
import Footer from './components/Footer.jsx';
const App = () => {
  const { theme } = useThemeStore();


  return (
    <div data-theme={theme}>
      <Navbar/>
     
     <Routes>
      <Route path="/" element={<EventTracker />} />
     </Routes>
     <Footer />

      {/* <div className="flex items-center justify-center h-screen">
        { <Loader className="size-10 animate-spin" /> }
      </div>  */}

    </div>
  )
};

export default App;

