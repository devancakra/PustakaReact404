import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Beranda from "./menu/Beranda";
import ManajemenBuku from './menu/ManajemenBuku';
import Footer from "./layout/Footer";

function App() {
  const baseURL = "http://localhost:4000";
  const [books, setBooks] = useState([]);

  useEffect(() => {
      retrieveData();
  }, []);

  function retrieveData() {
    axios
        .get(`${baseURL}/book`)
        .then((response) => { setBooks(response.data); })
        .catch(function (error) { console.log(error.response.data); });
  }
  
  function storeData(inputBook) {
    axios
        .post(`${baseURL}/book/add`, inputBook)
        .then(() => {
            setBooks((prevBooks) => [...prevBooks, inputBook]);
            alert("Data berhasil ditambahkan!");
        })
        .catch((error) => { console.log(error.response.data); })
  }

  function updateData(inputBook){
    axios
        .put(`${baseURL}/book/update/` + inputBook._id, inputBook)
        .then(() => {
            retrieveData();
            alert("Data berhasil diperbarui!");
        })
        .catch((error) => { console.log(error.response.data); })
  }
  
  function deleteData(book) {
    axios
        .delete(`${baseURL}/book/delete/` + book._id)
        .then(() => {
            retrieveData();
            alert("Data berhasil dihapus!");
        })
        .catch((error) => { console.log(error.response.data); })
  }

  function searchData(searchBook) {
    axios
        .post(`${baseURL}/book/search/` + searchBook.judul, searchBook)
        .then((response) => { 
            setBooks(response.data);
            alert("Data berhasil ditemukan!");
        })
        .catch((error) => { console.log(error.response.data); })
  }

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={ <Beranda /> } />
        <Route path="/manajemenbuku" exact element={ <ManajemenBuku bookList={books} store={storeData} update={updateData} remove={deleteData} search={searchData} /> } />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
