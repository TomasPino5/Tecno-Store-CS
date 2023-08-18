import './product.css';
import image from '../../imag/Cards/lapiz.png';

const Product = ({handleModify, products})=>{
    products.sort((a, b) => a.id - b.id);

    return(
        <div className="products-container">
            <div className="product-name">
                <p>ID ↑↓</p>
                <p>NAME ↑↓</p>
                <p>STOCK ↑↓</p>
                <p>CATEGORY ↑↓</p>
                <p>ACTIVE ↑↓</p>
            </div>
            {
              products.map((product, key)=>{
                return(
                  <div className="product" key={key}>
                    <p>{product.id}</p>
                    <p>{product.name}</p>
                    <p>{product.stock}</p>
                    <p>{product.category}</p>
                    <p>{product.isActive=== true? 'true':'false'}</p>
                    <button className="modify" onClick={()=>{handleModify(product.id)}}>
                    <img src={image} alt="lapiz" className='modificar'/>
                    </button>
                  </div>
                )
              })
            }
          </div>
    )
}

export default Product;