const Product = ({handleModify, products})=>{
    products.sort((a, b) => a.id - b.id);

    return(
        <div className="products-container">
            <div className="product-name">
                <p>id</p>
                <p>name</p>
                <p>stock</p>
                <p>category</p>
                <p>Active</p>
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
                    <button className="modify" onClick={()=>{handleModify(product.id)}}>Modifyd</button>
                  </div>
                )
              })
            }
          </div>
    )
}

export default Product;