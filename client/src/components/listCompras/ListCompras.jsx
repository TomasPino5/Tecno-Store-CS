import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompras } from "../../redux/actions";
import listCompras from "./listCompras.css";

const ListCompras = () => {
  const dispatch = useDispatch();
  const compras = useSelector((state) => state.getCompras);
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkmode : style.lightMode}

  useEffect(() => {
    dispatch(getCompras());
  }, []);
  return (
    <div className={darkMode ? "compras-containerdark " : "container-compras"}>
      <div className={darkMode ? "compras-namedark" : "compras-name"}>
        <p>USER ↑↓</p>
        <p>DIRECTION ↑↓</p>
        <p>PHONE ↑↓</p>
        <p>PRODUCT NAME ↑↓</p>
      </div>
      {compras.map((prop, key) => {
        return (
          <div key={key} className={darkMode ? "comprasdark" : "compras"}>
            <p>{prop.user.email}</p>
            <p>{prop.user.direction?prop.user.direction:'sin datos'}</p>
            <p>{prop.user.telefone?prop.user.telefone:'sin datos'}</p>
            <p>{prop.products[0].name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ListCompras;
