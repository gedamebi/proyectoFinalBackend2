import { UserRepository } from "./user.repository.js"
import { ProductsRepository } from "./products.repository.js"
import { CartsRepository } from "./carts.repository.js"
import { TicketRepository } from "./ticket.repository.js"

import { userDao, productDao, cartsDao, ticketDao } from "../dao/factory.js"

export const UserServices = new UserRepository(userDao)
export const ProductsServices = new ProductsRepository(productDao)
export const CartsServices = new CartsRepository(cartsDao)
export const TicketServices = new TicketRepository(ticketDao)
