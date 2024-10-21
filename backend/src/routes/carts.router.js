import CustomRouter from "./customRouter.js"
import * as ControllerCarts from "../controllers/carts.controller.js"

export default class CartsRouter extends CustomRouter {
    init(){
        this.get('/:cid', ['USER'], ControllerCarts.getCart)

        this.get('/user/:user',  ['USER'], ControllerCarts.getCartByUser)

        this.post('/', ['USER'], ControllerCarts.createCart)

        this.put('/:cid', ['USER'], ControllerCarts.updateCart)
        
        this.put('/:cid/product/:pid', ['USER'], ControllerCarts.addProductToCart)

        this.delete('/:cid', ['USER'], ControllerCarts.deleteCart)

        this.delete('/:cid/product/:pid', ['USER'], ControllerCarts.deleteProductoFromCart)

        this.post('/:cid/purchase', ['USER'], ControllerCarts.purchase)
    }
}