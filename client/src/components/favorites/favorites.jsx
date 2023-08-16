import { useSelector } from "react-redux"

const Favorites = () => {

    const favorites = useSelector((state) => state.favorites)

    return (
        <div>
            <h2>Favorites</h2>
            <div>
                {favorites.map((product) => (
                    <div key={product.id}>
                        <img src={product.imageSrc} alt={product.imageAlt} />
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <p>Brand: {product.brand}</p>
                        <p>Category: {product.category}</p>
                        {/* You can add more information or customize the rendering here */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Favorites