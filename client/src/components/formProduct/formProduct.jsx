import { useDispatch } from "react-redux";
import { modifyProduct } from "../../redux/actions";
import { useState } from "react";

const FormProduct = ({idProduct, setMod})=>{

    const dispatch = useDispatch();

    const onChangeInput = (event)=>{
        setProduct({...product, [event.target.name]:event.target.value});
    }

    const handleInfo = (event)=>{
        event.preventDefault();
        dispatch(modifyProduct(idProduct, product));
        setMod(false)
    }

    const [product, setProduct] = useState({
        name: "",
        href: "",
        imageSrc: "",
        imageAlt: "",
        price: 0,
        brand: "",
        stock: 0,
        category: "",
        description: "",
        isActive: true
      })

    return(
        <form action="" className="formulario" onSubmit={handleInfo}>
                <label htmlFor="">Name</label>
                <input type="text" placeholder="nombre del producto" name="name" value={product.name} onChange={onChangeInput}/>
                <label htmlFor="">Href</label>
                <input type="text" placeholder="#" name="href" value={product.href} onChange={onChangeInput}/>
                <label htmlFor="">imageSrc</label>
                <input type="text" placeholder="imagen del producto..." name="imageSrc" value={product.imageSrc} onChange={onChangeInput}/>
                <label htmlFor="">imageAlt</label>
                <input type="text" placeholder="imagen alternativo" name="imageAlt" value={product.imageAlt} onChange={onChangeInput}/>
                <label htmlFor="">Price</label>
                <input type="number" placeholder="precio del producto" name="price" value={product.price} onChange={onChangeInput}/>
                <label htmlFor="">Stock</label>
                <input type="number" placeholder="stock" name="stock" value={product.stock} onChange={onChangeInput}/>
                <label htmlFor="">Brand</label>
                <input type="text" name="brand" value={product.brand} onChange={onChangeInput}/>
                <label htmlFor="">Category</label>
                <input type="text" placeholder="categoria" name="category" value={product.category} onChange={onChangeInput}/>
                <label htmlFor="">Description</label>
                <input type="text" placeholder="descripcion del producto" name="description" value={product.description} onChange={onChangeInput}/>
                <label htmlFor="">isActive</label>
                <input type="text" name="isActive" value={product.isActive} onChange={onChangeInput}/>
                <button type="submit">Enviar</button>
                <button onClick={()=>{setMod(false)}}>Cancelar</button>
              </form>
    )
}

export default FormProduct;