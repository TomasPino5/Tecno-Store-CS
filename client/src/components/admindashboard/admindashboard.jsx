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
import Product from "../product/Product";
import FormProduct from "../formProduct/formProduct";
import Listusers from "../listusers/listusers";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const [showProductList, setShowProductList] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [component, setComponent] = useState('');

  const allowedEmails = [
    "menseguezmariano@gmail.com",
    "cottiersolchu55@gmail.com",
    "adlotorrez91@gmail.com",
    "sebastianhnry@gmail.com",
    "tomaspino.velez@gmail.com",
    "tomasbaldi@gmail.com",
    "kayita_y@hotmail.com",
  ];

  const isAdmin = allowedEmails.includes(user?.email);

  useEffect(() => {
    if (isAdmin) {
      dispatch(getProducts());
      dispatch(getUser(user.email));
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
    setShowProductList((prevShowProductList) => !prevShowProductList);
    setSelectedProduct(null); // Limpiar el producto seleccionado al mostrar la lista de productos
  };
  const handleComponent = (value) => {
   setComponent(value)
  };

  const handleModifyProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSubmitChanges = (e) => {
    e.preventDefault();
    // Aquí implementa la lógica para enviar los cambios al backend y actualizar el estado en Redux
    console.log("Cambios guardados:", selectedProduct);
  };

  const [mod, setMod] = useState(false);
  const [idProduct, setIdProduct] = useState(null);

  const handleModify = (id) => {
    setMod(true);
    setIdProduct(id);
  };

  return (
    <div>
      {isAdmin ? (
        <div>
          <h1 className="admin-title">Bienvenido a tu Panel Administrativo!</h1>

          <Link to="/form" className="create-product-button">
            <button className="product-list-button">Crear Producto</button>
          </Link>
          <button
            onClick={() => handleComponent('product')}
            className="product-list-button"
          >
            Modifica un producto
          </button>

          <button onClick={()=>{handleComponent("users")}} className="product-list-button">
            Listado de Usuarios
          </button>
          <Link to="/userProfile" className="create-product-button">
            <button className="product-list-button">
              Modificar Usuario/PERFIL
            </button>
          </Link>
          <button className="product-list-button">
            Total de Compras: {salesCount}
          </button>
          { component === 'product'?(
            <div className="font-container">
            {mod === true ? (<FormProduct idProduct={idProduct} setMod={setMod} />)
            :(<Product handleModify={handleModify} products={products} />)}
            </div>
          ):null
          }
          {
            component === 'users'?(<Listusers />):null
          }

          {showProductList && (
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id}>{product.name}</div>
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
