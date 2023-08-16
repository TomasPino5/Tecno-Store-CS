import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions";

const Listusers = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.getallusers);


  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  console.log(allusers);
  return <div></div>;
};

export default Listusers;
