import { UserRepository } from "./user.repository.js";
import { ProductsRepository } from "./products.repository.js";
import { CartsRepository } from "./carts.repository.js";

import { userDao, productDao, cartsDao } from "../dao/factory.js";

export const UserServices = new UserRepository(userDao)
export const ProductsServices = new ProductsRepository(productDao)
export const CartsServices = new CartsRepository(cartsDao)
