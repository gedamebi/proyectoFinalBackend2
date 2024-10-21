import CustomRouter from "./customRouter.js"
import { login, logout, register, current } from "../controllers/user.controller.js"
import { invokePassport } from "../middlewares/handlerError.js"

export default class UserRouter extends CustomRouter {
    init(){
        this.post('/login', ['PUBLIC'], login)
        this.delete('/logout', ['USER', 'ADMIN'], logout)
        this.post('/register', ['PUBLIC'], register)

        this.get('/current', ['PUBLIC'], invokePassport('jwt'), current)
    }
}
