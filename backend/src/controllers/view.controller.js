
import { ProductService, CartsService } from "../services/index.js"

export const login = async (req, res) => {
  res.render('index', { titulo : "Login" })
}


export const register = async (req, res) => {
  res.render('register', { titulo : "Registrar usuario" })
}

export const userDashboard = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1

  const sort = req.query.sort
  const sortManager = {
      'asc': 1,
      'dsc': -1
  }

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
}

export const carts = async (req, res) => {
  const { cid } = req.params;
  const carts = await CartsService.getCartbyIdviews(cid)
  res.render('carts', { carts, titulo : "Carts" })
}