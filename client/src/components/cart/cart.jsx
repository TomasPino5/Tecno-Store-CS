import './cart.css'
import { ClearCartIcon, CartIcon } from './icons'
import { useSelector } from 'react-redux'
import { addToCart } from '../../redux/actions'

function CartItem({ imageSrc, imageAlt, price, name, quantity }) {
    return (
        <li>
            <img src={imageSrc} alt={imageAlt} />
            <div>
                <strong>{name}</strong> - ${price}
            </div>
            <footer>
                <small>Cant. {quantity}</small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}

export default function Cart() {

    const items = useSelector((state) => state.items)

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
                            addToCart={() => addToCart(product)}
                            {...product}
                        />
                    ))}
                </ul>
                <button> <ClearCartIcon /> </button>
            </aside>
        </>
    )
}