import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./scss/App.scss";

//categories
import Home from "./components/home/Home";
import HeadPhones from "./components/categories/Headphones/Headphones";
import Speakers from "./components/categories/Speakers/Speakers";
import Earphones from "./components/categories/Earphones/Earphones";
//products
import Xx99_mark_i from "./components/products/Headphones/XX99_Mark_I";
import Xx99_mark_ii from "./components/products/Headphones/XX99_Mark_II";
import Xx59 from "./components/products/Headphones/XX59";
import Zx9 from "./components/products/Speakers/ZX9";
import Zx7 from "./components/products/Speakers/ZX7";
import Yx1 from "./components/products/Earphones/YX1";
//Checkout
import Checkout from "./components/carts/Checkout";
import Register from "./components/Registration/Register";
import "react-toastify/dist/ReactToastify.css";
import Histories from "./components/history/Histories";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/categories/headphones" element={<HeadPhones />} />
        <Route path="/categories/speakers" element={<Speakers />} />
        <Route path="/categories/earphones" element={<Earphones />} />
        <Route
          path="/products/headphones/xx99-mark-i"
          element={<Xx99_mark_i />}
        />
        <Route
          path="/products/headphones/xx99-mark-ii"
          element={<Xx99_mark_ii />}
        />
        <Route path="/products/headphones/xx59" element={<Xx59 />} />
        <Route path="/products/speakers/zx9" element={<Zx9 />} />
        <Route path="/products/speakers/zx7" element={<Zx7 />} />
        <Route path="/products/earphones/yx1" element={<Yx1 />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<Histories />} />
        <Route path="*" element={<div>Page not found</div >} />
      </Routes>
    </div>
  );
}

export default App;
