import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, userActive, userAdmin } from "../../redux/actions";
import './listUsers.css';
import swal from 'sweetalert';


const Listusers = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.getallusers);
  allusers.sort((a, b) => a.id - b.id);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleModidyUser = (id) => {
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
  const handleUserAdmin = (id) => {
    swal({
      title: "Confirmar",
      text: "¿Estás seguro de que quieres cambiar el rol del usuario a admin?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        dispatch(userAdmin(id));
      }
    });
  };

  return(
    <div className="container-users">
      {
        allusers.map((user, key)=>{
          return(
            <div className="users" key={key}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.isActive === true? 'true':'false'}</p>
              <p>{user.admin === true? 'true':'false'}</p>
              <p>
              <button className="modify" onClick={()=>{handleModidyUser(user.id)}}>{user.isActive === true? 'Desactivar':'Activar'}</button>
              </p>
              <p>
              <button className="modify" onClick={()=>{handleUserAdmin(user.id)}}>admin</button>
              </p>
            </div>
          )
        })
      }
    </div>
  )
};

export default Listusers;
