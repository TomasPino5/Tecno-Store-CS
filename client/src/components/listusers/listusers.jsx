import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, userActive, userAdmin } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
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

  const { user } = useAuth0();
  const usuario = user.email;

  const allowedEmails = [
    "tomaspino.velez@gmail.com",
    "adlotorrez91@gmail.com",
    "sebastianhnry@gmail.com",
  ];

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
console.log(allusers)
  return (
    <div className={darkMode ? "users-containerdark" : "container-users"}>
      <div className={darkMode ? "user-namedark" : "user-name"}>
        <p>USER ↑↓</p>
        <p>EMAIL ↑↓</p>
        <p>DIRECTION ↑↓</p>
        <p>ADMIN ↑↓</p>
      </div>
      {allusers.map((user, key) => (
        <div className={darkMode ? "usersdark" : "users"} key={key}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.direction?user.direction:'sin datos'}</p>
          <p>{user.admin === true ? "true" : "false"}</p>
          <p>
            {
              allowedEmails.includes(usuario)?
              <button
              className="modify"
              onClick={() => {
                handleToggleAdmin(user.id, user.admin);
              }}
            >
              {user.admin ? "Quitar Admin" : "Hacer Admin"}
            </button>:null
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListUsers;

