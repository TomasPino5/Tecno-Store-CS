import Cards from "../cards/cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, orderByPrice, filterByBrand, filterByCategory, clearFilter } from "../../redux/actions";
// import styles from "./home.module.css"

const Home = () => {

  const products = useSelector((state) => state.allProducts);
  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
    
  console.log(products)

  const dispatch = useDispatch()


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
            
            <div>
                <select id="orderByPrice" onChange={handleOrderByPrice}>
                    <option value="">Price</option>
                    <option value="-+">Menor a Mayor</option>
                    <option value="+-">Mayor a Menor</option>
                </select>
                <select id="brandFilter" onChange={handleBrandFilter}>
                <option value="">Brands</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
                <select  id="categoryFilter" onChange={handleCategoryFilter}>
                <option value="">Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <button onClick={handleClearFilters}>Limpiar</button>
            </div>

            <div>
                <Cards products={recipesToDisplay}/>
            </div>
  
      <div>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Previous</button>
        )}
        {endIndex < products.length && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Home;
