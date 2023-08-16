import Cards from "../cards/cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";

import {
  getProducts,
  orderByPrice,
  filterByBrand,
  filterByCategory,
  clearFilter,
  clearDetail,
} from "../../redux/actions";
import { toggleDarkMode } from "../../redux/actions";
import style from "./home.module.css";
import Nav from "../nav/nav";

const Home = () => {
  const products = useSelector((state) => state.allProducts);
  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkMode : style.lightMode}

  const dispatch = useDispatch();
  useEffect(() => {
    // Obtener el valor actual del modo oscuro desde localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      dispatch(toggleDarkMode());
      console.log(darkMode);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(clearDetail());
  }, [dispatch]);

  //paginado
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((nextPage) => nextPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((previousPage) => previousPage - 1);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const productsToDisplay = products.slice(startIndex, endIndex);

  const totalPags = products.length / productsPerPage;

  //filtros
  const handleOrderByPrice = (event) => {
    dispatch(orderByPrice(event.target.value));
  };

  const handleBrandFilter = (event) => {
    dispatch(filterByBrand(event.target.value));
    document.getElementById("categoryFilter").value = "";
    document.getElementById("orderByPrice").value = "";
  };

  const handleCategoryFilter = (event) => {
    dispatch(filterByCategory(event.target.value));
    document.getElementById("orderByPrice").value = "";
  };

  const handleClearFilters = () => {
    dispatch(clearFilter());

    // Devuelve el valor de los select al origen

    document.getElementById("orderByPrice").value = "";
    document.getElementById("brandFilter").value = "";
    document.getElementById("categoryFilter").value = "";
  };

  return (
    <div className={style.homepG}>
      <div className={style.filtros}>
        <Nav handleClearFilters={handleClearFilters} />

        <div className={darkMode ? style.contentdarkMode : style.content}>
          <select id="brandFilter" onChange={handleBrandFilter}>
            <option value="">Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select id="categoryFilter" onChange={handleCategoryFilter}>
            <option value="">Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select id="orderByPrice" onChange={handleOrderByPrice}>
            <option value="">Price</option>
            <option value="-+">Menor a Mayor</option>
            <option value="+-">Mayor a Menor</option>
          </select>
          {/* <NavLink to="/filter/brandfilter/Motorola" className={style.filterLink}>Filter by Motorola</NavLink> */}
          {/* <NavLink to="/filter/brandfilter/Samsung" className={style.filterLink}>Filter by Samsung</NavLink>
            <NavLink to="/filter/brandfilter/Apple" className={style.filterLink}>Filter by Apple</NavLink>
            <NavLink to="/filter/brandfilter/Xiaomi" className={style.filterLink}>Filter by Xiaomi</NavLink> */}
        </div>

        <button
          className={darkMode ? style.limpiarFdarkMode : style.limpiarF}
          onClick={handleClearFilters}
        >
          Limpiar Filtros
        </button>
      </div>

      <div>
        <Cards products={productsToDisplay} />
      </div>

      <div className={style.conteinerNextPrev}>
        <button
          disabled={currentPage === 1}
          className={style.btnNextPrev}
          onClick={handlePreviousPage}
        >
          Prev
        </button>

        <h3 className={style.inputPag}>
          - {currentPage} of {Math.ceil(totalPags)} -
        </h3>

        <button
          disabled={endIndex > products.length}
          className={style.btnNextPrev}
          onClick={handleNextPage}
        >
          Next
        </button>
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
