import { CartsServices } from '../repository/index.js';

export default class serviceCarts {

  async getCartbyId(id) {
    return await CartsServices.getCartById(id);
  };

  async getCartbyIdviews(id) {
    return await CartsServices.getCartByIdviews(id);
  }

  async createcart(products){
    return await CartsServices.createCart(products);
  }
  
  async updatecart(id, newCart) {
      return await CartsServices.updateCart(id, newCart);
  }
}
