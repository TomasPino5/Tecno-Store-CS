import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./paginado.module.css";



const Paginado=() =>{
    const products = useSelector((state)=>state.products);
    const productsPorPage = 6
    const [currentPage, setCurrentPage] = useState(1);
    const handlerNextPage = ()=>{
        setCurrentPage((nextPage) => nextPage + 1);
    }
    const handlerPreviousPage = ()=>{
        setCurrentPage((previousPage) => previousPage - 1)
    }
    const startIndex = (currentPage - 1) * productsPorPage;
    const endIndex = startIndex + productsPorPage;


    return(
        <div>
            {currentPage > 1 && <button className={styles.button} onClick={handlerPreviousPage}>Previous</button>}
                {endIndex < products.length && <button className={styles.button} onClick={handlerNextPage}>Next</button>}

        </div>
    )

}

export default Paginado
