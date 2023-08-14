import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  const allowedEmail = "menseguezmariano@gmail.com"||"cottiersolchu55@gmail.com" || "adlotorrez91@gmail.com";
  const isAdmin = user?.email === allowedEmail;

  if (!isAdmin) {
    setTimeout(() => {
      alert("No estás autorizado a ingresar.");
      navigate("/products");
    }, 50);
  }
  
  return (
    <div>
      {isAdmin ? (
        <div>
          <Link to="/form">
            <img
              src="ruta_a_tu_logo.png"
              alt="Logo"
            />
          </Link>
        </div>
      ) : (
        <p>Acceso no autorizado. Serás redirigido a los pro.</p>
      )}
    </div>
  );
};

export default AdminDashboard;