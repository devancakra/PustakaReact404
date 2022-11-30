import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Beranda from "./menu/Beranda";
import Katalog from "./menu/Katalog";
import Footer from "./layout/Footer";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={ <Beranda /> } />
        <Route path="/katalog" exact element={ <Katalog /> } />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
