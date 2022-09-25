import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {
  const [open, setOpen] = useState(false)
  return (
    <div className="App">
      <Header />
      <Navbar open={open} setOpen={setOpen}/>
      <Homepage open={open} setOpen={setOpen}/>
      <Footer />
      <Contact open={open} setOpen={setOpen} />
    </div>
  );
}

export default App;
