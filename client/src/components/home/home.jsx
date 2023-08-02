import Paginado from "../paginado/paginado.jsx";
import Cards from "../cards/cards.jsx";


const Home = ({startIndex, endIndex, products}) => {
  const currentProducts = products.slice(startIndex, endIndex);
  return (
      <div>
        <Cards products={currentProducts}/>
        <Paginado products={products} />
      </div>
  );
};

export default Home;
