import './cart.css'
import { ClearCartIcon, CartIcon } from './icons'

export default function Cart() {


    return (
        <>
            <label className='cart-button' htmlFor="carritoDeCompras">
                <CartIcon /> 
            </label>
            <input id="carritoDeCompras" type="checkbox" hidden />
            <aside className='cart'>
                <ul>
                    <li>
                        <img src="https://i.dummyjson.com/data/products/2/thumbnail.jpg" alt="Iphone" />
                        <div>
                            <strong>Iphone</strong> - $1499
                        </div>
                        <footer>
                            <small>Cant. 1</small>
                            <button>+</button>
                        </footer>
                    </li>
                </ul>
                <button> <ClearCartIcon /> </button>
            </aside>
        </>
    )
}