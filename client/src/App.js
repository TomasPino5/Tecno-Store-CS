import { Routes, Route, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js"; // Importa Elements aquí
import { loadStripe } from "@stripe/stripe-js";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Nav from "./components/nav/nav";
import Error from "./components/error/error";
import Form from "./components/form/form";
import Footer from "./components/footer/footer";
import Cart from "./components/cart/cart";
import "./App.css";
import Carousel from "./components/carousel/Carouseel.jsx";

const stripePromise = loadStripe(
  "sk_test_51NcvqGCNUAoI7WlfYdjceaTV47v9U1dGeTSVFPqhmgJ1fJF6vWO84ER7VQater3g88Xx4Gs4TayyCGDff2Au0h7T00nAgIEDyr"
);

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname !== "*" && <Nav />}

      <Routes>
        <Route path="/products" element={<Home />} />
        <Route
          path="/product/:id"
          element={
            <Elements stripe={stripePromise}>
              <Detail />
            </Elements>
          }
        />
        <Route path="*" element={<Error />} />
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Carousel />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
