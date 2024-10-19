import CustomRouter from "./customRouter.js"
import * as ControllerProducts from "../controllers/products.controller.js";

export default class ProductsRouter extends CustomRouter {
    init(){
        this.post('/', ['PUBLIC'], ControllerProducts.createProduct)

        this.put('/:pid', ['PUBLIC'], ControllerProducts.updateProduct)

        this.delete('/:pid', ['PUBLIC'], ControllerProducts.deleteProduct)

        this.get('/', ['PUBLIC'], ControllerProducts.getProducts)

        this.get('/:pid', ['PUBLIC'], ControllerProducts.getProduct)
    }
}
