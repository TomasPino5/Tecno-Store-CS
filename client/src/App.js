import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Nav from "./components/nav/nav";
import Error from "./components/error/error";
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" ? <Nav /> : null}
      <h1>Hello world</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/Error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
