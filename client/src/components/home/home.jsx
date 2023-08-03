import Cards from "../cards/cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, orderByPrice, filterByBrand } from "../../redux/actions";
// import styles from "./home.module.css"

const Home = () => {
  const products = useSelector((state) => state.allProducts);
    
  const dispatch = useDispatch()

  //paginado
  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
      dispatch(getProducts())
  }, [dispatch])

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
    const HandlerOrderByPrice = (event) => {
        dispatch(orderByPrice(event.target.value))
    }

    const handleBrandFilter = (event) => {
        const selectedBrand = event.target.value;
        dispatch(filterByBrand(selectedBrand));
      };

    return (
        <div>
            
            <div>
                <select onChange={HandlerOrderByPrice}>
                    <option value="">Price</option>
                    <option value="-+">Menor a Mayor</option>
                    <option value="+-">Mayor a Menor</option>
                </select>
                <select onChange={handleBrandFilter}>
          <option value="">Brand</option>
          <option value="Apple">Apple</option>
          <option value="Motorola">Motorola</option>
          <option value="Samsung">Samsung</option>
          <option value="xiaomi">xiaomi</option>
        </select>
            </div>

            <div>
                <Cards products={recipesToDisplay}/>
            </div>

            <div>
                {currentPage > 1 && <button onClick={handlePreviousPage}>Previous</button>}
                {endIndex < products.length && <button onClick={handleNextPage}>Next</button>}
            </div>

        </div>
    )
};

export default Home;
