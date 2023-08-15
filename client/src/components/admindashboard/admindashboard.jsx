import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import "./admindashboard.css"; 
import {
  getProducts,
  getUser,
  // Importa las acciones necesarias para obtener usuarios y compras si las tienes
} from "../../redux/actions"; // Actualiza la ruta a tus acciones

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const [showProductList, setShowProductList] = useState(false); // Estado para mostrar/ocultar la lista de productos
  const [showUserList, setShowUserList] = useState(false); // Estado para mostrar/ocultar la lista de usuarios

  const allowedEmail = "menseguezmariano@gmail.com" || "cottiersolchu55@gmail.com" || "adlotorrez91@gmail.com";
  const isAdmin = user?.email === allowedEmail;

  useEffect(() => {
    if (isAdmin) {
      dispatch(getProducts()); // Obtén la lista de productos al cargar el componente
      dispatch(getUser(user.email)); // Obtén los datos del usuario
      // Agrega aquí las acciones para obtener usuarios y compras si las tienes
    } else {
      setTimeout(() => {
        alert("No estás autorizado a ingresar.");
        navigate("/products");
      }, 50);
    }
  }, [dispatch, isAdmin, navigate, user.email]);

  const products = useSelector((state) => state.allProducts);
  const salesCount = useSelector((state) => state.salesCount);

  const handleShowProductList = () => {
    setShowProductList((prevShowProductList) => !prevShowProductList); // Alternar el estado actual
    setShowUserList(false); // Ocultar la lista de usuarios al mostrar la lista de productos
  };

  // const handleShowUserList = () => {
  //   setShowUserList((prevShowUserList) => !prevShowUserList); // Alternar el estado actual
  //   setShowProductList(false); // Ocultar la lista de productos al mostrar la lista de usuarios
  // };

  return (
    <div>
      {isAdmin ? (
        <div>
           <h1 className="admin-title">Bienvenido a tu Panel Administrativo!</h1>

          <Link to="/form" className="create-product-button">
            <button className="product-list-button">Crear Producto</button>
          </Link>
          <button onClick={handleShowProductList} className="product-list-button">
            Modifica un producto
          </button>
          <button onClick={handleShowProductList} className="product-list-button">
            Elimina un Producto
          </button>
          <button onClick={handleShowProductList} className="product-list-button">
            Listado de Productos
          </button>

          <button  className="product-list-button">
            Listado de Usuarios
          </button>
          <Link to="/userProfile" className="create-product-button">
            <button className="product-list-button">Modificar Usuario/PERFIL</button>
          </Link>
          <button className="product-list-button">
            Total de Compras: {salesCount}
          </button>
          

          {showProductList && (
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id}>{product.name}</div>
                // Renderiza los detalles del producto como desees
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Acceso no autorizado. Serás redirigido a los productos.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
