import { Router } from "express";
import { ROUTE_PATH } from "../constants/routesPath.js";
//import ViewRouters from './views.route.js'; 
import ProductsRouter from './products.router.js'
import CartsRouter from './carts.router.js'
import UserRouter from './sessions.route.js'

const app = Router()

//app.use("/", ViewRouters)

const productsRouter = new ProductsRouter;
const cartsRouter = new CartsRouter;
const userRouter = new UserRouter;

app.use(ROUTE_PATH.api_productos, productsRouter.getRouter())
app.use(ROUTE_PATH.api_carts, cartsRouter.getRouter())
app.use(ROUTE_PATH.api_sessions, userRouter.getRouter())

export default app
