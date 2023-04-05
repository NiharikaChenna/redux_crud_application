import React from 'react';
import {  Routes ,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Contacts from './Components/Contacts';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      
      <Routes>
         <Route exact path='/' element={<Home/>} />
    
         <Route path='/add' element={<Contacts/>}/>
      
         <Route path='/edit/:id' element={<Contacts/>}/>
       
      </Routes>
    </div>
  );
}

export default App;
