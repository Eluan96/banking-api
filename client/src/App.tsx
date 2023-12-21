import React, { useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import CreateAccount from './components/CreateAccount';


function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CreateAccount />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
