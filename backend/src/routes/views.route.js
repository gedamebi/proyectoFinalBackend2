import CustomRouter from "./customRouter.js"
import { __dirname } from '../utils.js'
import { ProductService, CartsService } from "../services/index.js"

export default class ViewRouter extends CustomRouter {
    init(){
        this.get('/', ['PUBLIC'], async (req, res) => {
            res.render('index', { titulo : "Login" })
        });
        
        this.get('/register', ['PUBLIC'], async (req, res) => {
            res.render('register', { titulo : "Registrar usuario" })
        });

        this.get('/userDashboard', ['USER'], async (req, res) => {
            const page = parseInt(req.query.page, 10) || 1
        
            const sort = req.query.sort
            const sortManager = {
                'asc': 1,
                'dsc': -1
            };
        
            try {
                const options = {
                    page: page,
                    limit: 6,
                    ...(sort && { sort: { price: sortManager[sort]} }),
                    customLabels: { docs: 'payload' }
                };
                const products = await ProductService.paginateProduct({}, options);
                res.render('userDashboard', { products, titulo : "Home" })
            } catch (error) {
                res.status(500).send({error: error.message, status: 'error'})
            }
        });
        
        this.get('/carts/:cid', ['USER'], async (req, res) => {
            const { cid } = req.params;
            const carts = await CartsService.getCartbyIdviews(cid)
            res.render('carts', { carts, titulo : "Carts" })
        });
    }
}