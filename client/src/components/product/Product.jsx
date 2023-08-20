import "./product.css";
import image from "../../imag/Cards/lapiz.png";
import { useSelector } from "react-redux";
import SearchBar from "../searchbar/searchbar";

const Product = ({ handleModify, products }) => {
  products.sort((a, b) => a.id - b.id);
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkmode : style.lightMode}
  return (
    <div className={darkMode ? "products-containerdark" : "products-container"}>
      <div className="serch">
        <SearchBar />
      </div>
      <div className={darkMode ? "product-namedark" : "product-name"}>
        <p>ID ↑↓</p>
        <p>NAME ↑↓</p>
        <p>STOCK ↑↓</p>
        <p>CATEGORY ↑↓</p>
        <p>ACTIVE ↑↓</p>
      </div>
      {products.map((product, key) => {
        return (
          <div className={darkMode ? "productdark" : "product"} key={key}>
            <p>{product.id}</p>
            <p>{product.name}</p>
            <p>{product.stock}</p>
            <p>{product.category}</p>
            <p>{product.isActive === true ? "true" : "false"}</p>
            <button
              className="modify"
              onClick={() => {
                handleModify(product.id);
              }}
            >
              <img src={image} alt="lapiz" className="modificar" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
