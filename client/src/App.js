import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Nav from "./components/nav/nav";
import Error from "./components/error/error";
import Form from "./components/form/form";
import Login from "./components/loginForm/loginForm";
import Footer from "./components/footer/footer";
import "./App.css";
import Carousel from "./components/carousel/Carouseel.jsx";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname !== "*" && <Nav />}

      <Routes>
        <Route path="/products" element={<Home />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Carousel />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
