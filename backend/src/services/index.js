import userService from "./user.service.js"
import productService from "./products.service.js"
import cartsService from "./carts.service.js"

import { userDao, productDao, cartsDao } from '../dao/factory.js'

export const UserService = new userService(userDao)
export const ProductService = new productService(productDao)
export const CartsService = new cartsService(cartsDao)