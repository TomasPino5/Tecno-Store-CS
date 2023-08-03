import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Nav from "./components/nav/nav";
import Error from "./components/error/error";
import Form from "./components/form/form";
import Login from "./components/loginForm/loginForm";
import "./App.css";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {/* {location.pathname !== "/" ? <Nav /> : null} */}
      {pathname === "/" && <Nav />}
      {pathname === "/:id" && <Nav />}
      {pathname === "/:Error" && <Nav />}
      <h1>Hello world</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/Error" element={<Error />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
