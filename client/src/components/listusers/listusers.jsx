import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, userActive, userAdmin } from "../../redux/actions";
import "./listUsers.css";
import swal from "sweetalert";

const ListUsers = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.getallusers);
  allusers.sort((a, b) => a.id - b.id);
  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleModifyUser = (id) => {
    swal({
      title: "Confirmar",
      text: "¿Estás seguro de que quieres cambiar el estado del usuario?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        dispatch(userActive(id));
      }
    });
  };

  const handleToggleAdmin = (id, isAdmin) => {
    swal({
      title: "Confirmar",
      text: `¿Estás seguro de que quieres ${
        isAdmin ? "quitar el rol de administrador" : "hacer administrador"
      } al usuario?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        dispatch(userAdmin(id));
      }
    });
  };

  return (
    <div className="container-users">
      {allusers.map((user, key) => (
        <div className={darkMode ? "usersdark" : "users"} key={key}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.isActive === true ? "true" : "false"}</p>
          <p>{user.admin === true ? "true" : "false"}</p>
          <p>
            <button
              className="modify"
              onClick={() => {
                handleModifyUser(user.id);
              }}
            >
              {user.isActive === true ? "Desactivar" : "Activar"}
            </button>
          </p>
          <p>
            <button
              className="modify"
              onClick={() => {
                handleToggleAdmin(user.id, user.admin);
              }}
            >
              {user.admin ? "Quitar Admin" : "Hacer Admin"}
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListUsers;

