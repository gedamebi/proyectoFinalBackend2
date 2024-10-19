import { Router } from 'express';
import { __dirname } from '../utils.js';
import { ProductModel } from "../models/Product.model.js";
import { CartsModel } from "../models/Carts.model.js";


const router = Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;

    const sort = req.query.sort;
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
        const products = await ProductModel.paginate({}, options);
        res.render('index', { products, titulo : "Home" });
    } catch (error) {
        res.status(500).send({error: error.message, status: 'error'});
    }
});

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const carts = await CartsModel.findById(cid).populate('products.product');
    res.render('carts', { carts, titulo : "Carts" });
});

export default router;