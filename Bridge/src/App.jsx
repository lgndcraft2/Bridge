import {Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Homepage from './assets/components/Homepage'
import Interface from './assets/components/Interface'
function App() {

  return (
    <div>
      
      <Routes>
        <Route path='/' element = {<Homepage />}/>
        <Route path='/interface' element = {<Interface />}/>
      </Routes>
    
    </div>
  );
}

export default App
