import Cards from "../cards/cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
// import styles from "./home.module.css"

const Home = () => {
  const products = useSelector((state) => state.allProducts);
    
  const dispatch = useDispatch()

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

    return (
        <div>
            <Cards products={recipesToDisplay}/>
            <div>
                {currentPage > 1 && <button onClick={handlePreviousPage}>Previous</button>}
                {endIndex < products.length && <button onClick={handleNextPage}>Next</button>}
            </div>
        </div>
    )
};

export default Home;
