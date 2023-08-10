import './cart.css'
import { ClearCartIcon, CartIcon } from './icons'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, clearCart, removeFromCart } from '../../redux/actions'
import { NavLink } from 'react-router-dom'

export default function Cart() {

    const items = useSelector((state) => state.items)
    const totalPrice = useSelector((state) => state.totalPrice);

    const dispatch = useDispatch()

    const addToCartHandler = (product) => {
        dispatch(addToCart(product))
    }

    const clearCartHandler = () => {
        dispatch(clearCart(items))
    }

    const removeFromCartHandler = (product) => {
        dispatch(removeFromCart(product))
    }

    function CartItem({ id, imageSrc, imageAlt, price, name, quantity }) {
        return (
            <li>
                <img src={imageSrc} alt={imageAlt} />
                <div>
                    <strong>{name}</strong> - ${price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </div>
                <footer>
                    <button onClick={() => removeFromCartHandler({ id, imageSrc, imageAlt, price, name, quantity })}>-</button>
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
                <div>Total: ${totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
                <NavLink
                    to={`/pay`}
                    style={{ textDecoration: "none", color: "inherit" }}> 
                    <button>Buy</button>
                </NavLink>
                <button onClick={clearCartHandler}> <ClearCartIcon /> </button>
            </aside>
        </>
    )
}