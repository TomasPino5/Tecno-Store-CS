import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [emailsSentCount, setEmailsSentCount] = useState(0);

  useEffect(() => {
    fetchUserCount();
    fetchEmailsSentCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      const response = await axios.get("/api/getUserCount");
      setUserCount(response.data.userCount);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const fetchEmailsSentCount = async () => {
    try {
      const response = await axios.get("/api/getEmailsSentCount");
      setEmailsSentCount(response.data.emailsSentCount);
    } catch (error) {
      console.error("Error fetching emails sent count:", error);
    }
  };

  return (
    <div>
      <div>
        <Link to="/form">
          <img
            src="ruta_a_tu_logo.png"
            alt="Logo"
          />
        </Link>
      </div>
      <div>
        <h2>Cantidad de Usuarios: {userCount}</h2>
        <h2>Cantidad de Correos Enviados de Compra: {emailsSentCount}</h2>
      </div>
    </div>
  );
}

export default AdminDashboard;