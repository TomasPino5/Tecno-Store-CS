import { Routes, Route, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js"; // Importa Elements aquí
import { loadStripe } from "@stripe/stripe-js";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Nav from "./components/nav/nav";
import Error from "./components/error/error";
import Form from "./components/form/form";
import Footer from "./components/footer/footer";
import CheckoutForm from "./components/paymentgateway/element";
import "./App.css";
import Carousel from "./components/carousel/Carouseel.jsx";
import UserProfile from "./components/UserProfile/userProfile";

const stripePromise = loadStripe(
  "pk_test_51NcvqGCNUAoI7WlfIAzV9QurX20Giym0Ec5S8e0yDCDiObFk80y5QGvliypiwWjXeLfWR7b5MSw8k3wmZnDuKkTR003LRj39wV"
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
            // <Elements stripe={stripePromise}>
              <Detail />
            // </Elements>
          }
        />
        <Route
          path="/pay"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          }
        />
        <Route path="*" element={<Error />} />
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Carousel />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
