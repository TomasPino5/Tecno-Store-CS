import './cart.css'
import { ClearCartIcon, CartIcon } from './icons'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, clearCart, removeFromCart, clearDetail } from '../../redux/actions'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert
import { useAuth0 } from "@auth0/auth0-react"; // Asegúrate de importar useAuth0

export default function Cart() {

    const items = useSelector((state) => state.items)
    const totalPrice = useSelector((state) => state.totalPrice);
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const dispatch = useDispatch()

    const addToCartHandler = (product) => {
        dispatch(addToCart(product))
    }

    const clearCartHandler = () => {
        if(items.length >0){
            Swal.fire({
                title: 'Esta Seguro',
                text: '!se eliminara su producto del carrito¡',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si estoy seguro',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#28a745'
              }).then((result) => {
                if (result.isConfirmed) { 
                    dispatch(clearCart(items))
                }
              });
        }
    }

    const removeFromCartHandler = (product) => {
        dispatch(removeFromCart(product))
    }

    const clearDetailHandler = () => {
        if(isAuthenticated){
            dispatch(clearDetail());
        }
        else{
            Swal.fire({
                title: 'Inicie sesión',
                text: 'Por favor inicia sesión para comprar.',
                icon: 'warning',
                confirmButtonText: 'Iniciar sesión',
                confirmButtonColor: '#28a745',
              }).then((result) => {
                if (result.isConfirmed) {
                  loginWithRedirect();
                }
              });
        }
    }

    function CartItem({ id, imageSrc, imageAlt, price, name, quantity }) {
        return (
            <li>
                <img src={imageSrc} alt={imageAlt} />
                <div className='name'>
                    <strong  >{name}</strong> - ${price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </div>
                <footer>
                    <button className='rest' onClick={() => removeFromCartHandler({ id, imageSrc, imageAlt, price, name, quantity })}>-</button>
                    <small className='small' >Cant. {quantity}</small>
                    <button className='add' onClick={() => addToCartHandler({ id, imageSrc, imageAlt, price, name, quantity })}>+</button>
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
                <div className='TOTAL' >Total: ${totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
                {items.length > 0 ? (
                    isAuthenticated?
                    <NavLink to={`/pay`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button onClick={clearDetailHandler} className='BUY'>
                            Buy
                        </button>
                    </NavLink>:
                    <button onClick={clearDetailHandler} className='BUY'>
                       Buy
                    </button>
                ) : (
                    <button onClick={() => 
                        Swal.fire({
                            title: '¡El carrito esta vacio!',
                            text: 'Por favor agregue un producto al carrito',
                            icon: 'warning',
                            confirmButtonText: 'ok',
                            confirmButtonColor: '#28a745'
                          })
                    } className='BUY'>
                        Buy
                    </button>
                )}
                <button className='CLEAR' onClick={clearCartHandler}> <ClearCartIcon /> </button>
            </aside>
        </>
    )
}