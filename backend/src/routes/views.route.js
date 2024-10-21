import CustomRouter from "./customRouter.js"

import { login, register, userDashboard, carts } from "../controllers/view.controller.js"

export default class ViewRouter extends CustomRouter {
    init(){
        this.get('/', ['PUBLIC'], login)
        
        this.get('/register', ['PUBLIC'], register);

        this.get('/userDashboard', ['USER'], userDashboard);
        
        this.get('/carts/:cid', ['USER'], carts);
    }
}