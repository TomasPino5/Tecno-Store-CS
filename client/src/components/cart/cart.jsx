import './cart.css'
import { ClearCartIcon, CartIcon } from './icons'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, clearCart } from '../../redux/actions'

export default function Cart() {

    const items = useSelector((state) => state.items)

    const dispatch = useDispatch()

    const addToCartHandler = (product) => {
        dispatch(addToCart(product))
        localStorage.setItem('cartItems', JSON.stringify([...items, product]));
    }

    const clearCartHandler = () => {
        dispatch(clearCart(items))
    }

    function CartItem({ id, imageSrc, imageAlt, price, name, quantity }) {
        return (
            <li>
                <img src={imageSrc} alt={imageAlt} />
                <div>
                    <strong>{name}</strong> - ${price}
                </div>
                <footer>
                    <small>Cant. {quantity}</small>
                    <button onClick={() => addToCartHandler({ id, imageSrc, imageAlt, price, name, quantity })}>+</button>
                </footer>
            </li>
        )
    }

    return (
        <>
            <label className='cart-button' htmlFor="carritoDeCompras">
                <CartIcon /> 
            </label>
            <input id="carritoDeCompras" type="checkbox" hidden />
            <aside className='cart'>
                <ul>
                    {items.map(product => (
                        <CartItem 
                            key={product.id}
                            value={() => addToCart(product)}
                            {...product}
                        />
                    ))}
                </ul>
                <button onClick={clearCartHandler}> <ClearCartIcon /> </button>
            </aside>
        </>
    )
}