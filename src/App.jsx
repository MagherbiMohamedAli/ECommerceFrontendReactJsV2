import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Listarticle from './components/articles/Listarticle';
import Editarticle from './components/articles/Editarticle';
import Insertarticle from './components/articles/Insertarticle';

import Listscategories from './components/scategories/Listscategories';

import Listcategories from './components/categories/Listcategories';
import Menu from './components/Menu';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/articles" exact element={<Listarticle />} />
          <Route path="/articles/add" element={<Insertarticle />} />
          <Route path="/articles/edit/:id" element={<Editarticle />} />
          <Route path="/categories" element={<Listcategories />} />
          <Route path="/scategories" exact element={<Listscategories />} />
          <Route path="/menu" exact element={<Menu />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
