import CustomRouter from "./customRouter.js"
import * as ControllerCarts from "../controllers/carts.controller.js";

export default class CartsRouter extends CustomRouter {
    init(){
        this.get('/:cid',  ['PUBLIC'], ControllerCarts.getCart);

        this.post('/', ['PUBLIC'], ControllerCarts.createCart);

        this.put('/:cid', ['PUBLIC'], ControllerCarts.updateCart);
        
        this.put('/:cid/product/:pid', ['PUBLIC'], ControllerCarts.addProductToCart);

        this.delete('/:cid', ['PUBLIC'], ControllerCarts.deleteCart);

        this.delete('/:cid/product/:pid', ['PUBLIC'], ControllerCarts.deleteProductoFromCart);
    }
}