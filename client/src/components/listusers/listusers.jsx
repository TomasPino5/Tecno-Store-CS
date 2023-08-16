import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, userActive } from "../../redux/actions";
import './listUsers.css';

const Listusers = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.getallusers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, getAllUsers]);

  const handleModidyUser = (id)=>{
    dispatch(userActive(id));
    window.location.reload(); 
  }

  return(
    <div className="container-users">
      {
        allusers.map((user, key)=>{
          return(
            <div className="users" key={key}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.isActive === true? 'true':'false'}</p>
              <p>{user.picture}</p>
              <button className="modify" onClick={()=>{handleModidyUser(user.id)}}>{user.isActive === true? 'Desactivar':'Activar'}</button>
            </div>
          )
        })
      }
    </div>
  )
};

export default Listusers;
