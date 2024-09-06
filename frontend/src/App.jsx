import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Data from './Data'; 
import AboutStrategy from './pages/AboutStrategy';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rules from './pages/Rules';

const App = () => (
  <Router>
    <Navbar/>
    <main className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about-strategy" element={<AboutStrategy/>} />
      </Routes>
    </main>
    <Footer/>
  </Router>
);

export default App;
