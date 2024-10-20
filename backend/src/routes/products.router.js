import CustomRouter from "./customRouter.js"
import * as ControllerProducts from "../controllers/products.controller.js"

export default class ProductsRouter extends CustomRouter {
    init(){
        this.post('/', ['ADMIN'], ControllerProducts.createProduct)

        this.put('/:pid', ['ADMIN'], ControllerProducts.updateProduct)

        this.delete('/:pid', ['ADMIN'], ControllerProducts.deleteProduct)

        this.get('/', ['PUBLIC'], ControllerProducts.getProducts)

        this.get('/:pid', ['PUBLIC'], ControllerProducts.getProduct)
    }
}
