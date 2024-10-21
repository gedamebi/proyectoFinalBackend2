import { CartsService, ProductService, TicketService } from '../services/index.js'
import { __dirname } from '../utils.js'
import { ObjectId } from 'mongodb'
import { TicketDTO } from "../DTOs/ticket.dto..js"
import { sendEmailTiket } from '../helpers/helpersNodemailer.js'


export const getCart = async (req, res) => {
    const { cid } = req.params;
    const cartFinded = await CartsService.getCartbyIdviews(cid)

    if (cartFinded == false){
        res.status(404).json({ message: 'Carrito no encontrado' })
    } else {
        res.status(200).json({ products: cartFinded?.products })
    }
}

export const getCartByUser = async (req, res) => {
    const { user } = req.params;
    const cartFinded = await CartsService.getCartByUserviews(user)
    if (cartFinded == false){
        res.status(404).json({ message: 'Carrito no encontrado' })
    } else {
        res.status(200).json({ cartFinded })
    }
}

export const createCart = async (req, res) => {
    try {
        const { user } = req.body;
        const newCart = await CartsService.createcart({
            products: [],
            user : user
        })
        res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { ...products } = req.body;
    const cartFinded = await CartsService.getCartbyId(cid, true);
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
    
        if (cartFinded == false){
            res.status(404).json({ message: 'Carrito no encontrado' });
            return
        }
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
        const cartFinded = await CartsService.getCartbyId(cid, true)

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
        const cartFinded = await CartsService.getCartbyId(cid, true);

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

export const purchase = async (req, res) => {
    const { cid } = req.params;
    try {
        let productsOutOfStock = []
        let productsPurchased = []
        let total = 0;
        let updateProd

        const cart = await CartsService.getCartbyId(cid)

        if (cart.products.length == 0) {
            return res.status(200).json({
                status: "ok",
                error: "No tiene productos en el carrito"
            });
        }

        let mensajeSMTPproductsPurchased = '<h3>Detalle compra:</h3><table><tr><th>Cantidad</th><th>Producto</th></tr>'
        let mensajeSMTPproductsOutOfStock = '<h3>Productos sin stock:</h3><table><tr><th>Cantidad</th><th>Producto</th></tr>'

        for (const product of cart.products) {
            const prod = await ProductService.getProductsbyId(product.product)
            if (product.quantity <= prod.stock && prod) {
                prod.stock = prod.stock - product.quantity
                total += prod.price * product.quantity
                updateProd = await ProductService.updateproducts(product.product, prod)
                const deleteCart = await CartsService.deleteproductCart(cid, product.product)
                productsPurchased.push(product)
                mensajeSMTPproductsPurchased += `<tr><td>${product.quantity}</td><td>${prod.title}</td></tr>`
            } else {
                productsOutOfStock.push(product)
                mensajeSMTPproductsOutOfStock += `<tr><td>${product.quantity}</td><td>${prod.title}</td></tr>`
            }
        }

        mensajeSMTPproductsPurchased += '</table>'
        mensajeSMTPproductsOutOfStock += '</table>'

        if (productsOutOfStock.length == 0) {
            mensajeSMTPproductsOutOfStock = ''
        }
        
        if (productsPurchased.length != 0) {
            const ticketNew = new TicketDTO(total, req.user.email, productsPurchased)
            const ticket = await TicketService.createPurchaseTicket(ticketNew)


            sendEmailTiket(ticketNew, mensajeSMTPproductsPurchased, mensajeSMTPproductsOutOfStock)
        }

        

        return res.status(200).json({
            status: "success",
            productsOutOfStock,
            productsPurchased,
            total
        });


    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: "Error en Base de datos!", error: error })
    }
}