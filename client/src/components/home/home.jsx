import Cards from "../cards/cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProducts,
  orderByPrice,
  filterByBrand,
  filterByCategory,
  clearFilter,
} from "../../redux/actions";
import style from "./home.module.css";

const Home = () => {
  const products = useSelector((state) => state.allProducts);
  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);

  console.log(products);

  const dispatch = useDispatch();

  //paginado
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleNextPage = () => {
    setCurrentPage((nextPage) => nextPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((previousPage) => previousPage - 1);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const recipesToDisplay = products.slice(startIndex, endIndex);

  //filtros
  const handleOrderByPrice = (event) => {
    dispatch(orderByPrice(event.target.value));
  };

  const handleBrandFilter = (event) => {
    dispatch(filterByBrand(event.target.value));
    document.getElementById("categoryFilter").value = "";
  };

  const handleCategoryFilter = (event) => {
    dispatch(filterByCategory(event.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilter());

    // Devuelve el valor de los select al origen

    document.getElementById("orderByPrice").value = "";
    document.getElementById("brandFilter").value = "";
    document.getElementById("categoryFilter").value = "";
  };

  return (
    <div>


      <div className={style.filtros}>

        <div className={style.content}>
          <select id="orderByPrice" onChange={handleOrderByPrice}>
            <option  value="">Price</option>
            <option value="-+">Menor a Mayor</option>
            <option value="+-">Mayor a Menor</option>
          </select>


          <select id="brandFilter" onChange={handleBrandFilter}>
            <option value="">Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select id="categoryFilter" onChange={handleCategoryFilter}>
            <option value="">Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button className={style.limpiarF} onClick={handleClearFilters}>Limpiar Filtros</button>
      </div>

      <div>
        <Cards products={recipesToDisplay} />
      </div>

      <div>

        <button disabled={currentPage === 1} className={style.btnNextPrev} onClick={handlePreviousPage}>Prev</button>
        <button disabled={endIndex > products.length} className={style.btnNextPrev} onClick={handleNextPage}>Next</button>
        {/* {currentPage > 1 && (
          <button className={style.btnPrevious} onClick={handlePreviousPage}>Prev</button>
        )}
        {endIndex < products.length && (
          <button className={style.btnNext} onClick={handleNextPage}>Next</button>
        )} */}

      </div>
    </div>
  );
};
//disabled={currentPage > 1}
//disabled={endIndex < products.length}
export default Home;
