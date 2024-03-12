import React, { useState } from 'react';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Kisiekle from './kisiekle';
import Home from './Home';
import { KullaniciProvider } from './context/KullaniciContext';
import Popup from './context/popup';

const App = () => {
  
  return (
    
       <div className='App' >
              

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/kisiekle' element={<Kisiekle />} ></Route>
      </Routes>
    </div>
    
   
 
  );
};

export default App;
