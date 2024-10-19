import { CartsService } from '../services/index.js'
import { __dirname } from '../utils.js'
import { ObjectId } from 'mongodb'


export const getCart = async (req, res) => {
    const { cid } = req.params;
    const cartFinded = await CartsService.getCartbyIdviews(cid)

    if (cartFinded == false){
        res.status(404).json({ message: 'Carrito no encontrado' })
    } else {
        res.status(200).json({ products: cartFinded?.products })
    }
}

export const createCart = async (req, res) => {
    try {
        const newCart = await CartsService.createcart({
            products: []
        })
        res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { ...products } = req.body;
    const cartFinded = await CartsService.getCartbyId(cid);
    if(cartFinded == false) {
        res.status(404).json({ message: 'Carrito no encontrado' });
        return
    }

    const newCart = {
        ...cartFinded,
        products
    }
    const cartUpdated = await CartsService.updatecart(cid,newCart);
    if (cartUpdated) {
        res.status(201).json({ message: 'Carrito actualizado', cart: cartUpdated})
    } else {
        res.status(500).json({ message: 'Error al actualizar carrito' })
    }
    
}
 
export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cartFinded = await CartsService.getCartbyId(cid); 
    
        const indexProd = cartFinded.products.findIndex(prod => prod.product.toString() === pid);
        if(indexProd === -1){
            cartFinded.products.push({ product: pid, quantity: 1 })
        } else {
            cartFinded.products[indexProd] = { product: cartFinded.products[indexProd].product, quantity: cartFinded.products[indexProd].quantity + 1 }
        }
        const cartUpdated = await CartsService.updatecart(cid,cartFinded)
    
        res.status(201).json({ message: 'Producto agregado al carrito', cart: cartUpdated})
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params

    try {
        const cartFinded = await CartsService.getCartbyId(cid)

        const newCart = {
            ...cartFinded,
            products: []
        }

        const cartUpdated = await CartsService.updatecart(cid,newCart)

        res.status(201).json({ message: 'Carrito vaciado correctamente', cart: cartUpdated})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteProductoFromCart = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cartFinded = await CartsService.getCartbyId(cid);

        const idToFind = new ObjectId(pid)
        const exists = cartFinded.products.some(item => item.product.equals(idToFind))
        if(exists == false){
            res.status(404).json({ message: 'Producto no existe en el carrito solicitado' })
        } else {
            const cartFiltered = {
                ...cartFinded,
                products:  cartFinded.products.filter(prod => prod.product.toString() !== pid)
            }
            
            const cartUpdated = await CartsService.updatecart(cid,cartFiltered)
    
            res.status(201).json({ message: 'Producto eliminado del carrito correctamente', cart: cartUpdated})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}