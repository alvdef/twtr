import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import Home from '../components/home/Home';
import Navbar from '../components/navbar/Navbar';

function App() {
  
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Home />
      </main>
    </>
  )
}

export default App;
