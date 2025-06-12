import React,{ StrictMode  } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // <-- This line is required!
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <BrowserRouter>
    <App />
    </BrowserRouter>

  </StrictMode>
);