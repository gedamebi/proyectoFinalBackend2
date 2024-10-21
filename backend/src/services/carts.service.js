import { CartsServices } from '../repository/index.js'

export default class serviceCarts {

  async getCartbyId(id, useLean = false) {
    return await CartsServices.getCartById(id, useLean)
  };

  async getCartbyIdviews(id) {
    return await CartsServices.getCartByIdviews(id)
  }

  async getCartByUserviews(user) {
    return await CartsServices.getCartByUserviews(user)
  }

  async createcart(cart){
    return await CartsServices.createCart(cart)
  }
  
  async updatecart(id, newCart) {
      return await CartsServices.updateCart(id, newCart)
  }

  async addProductinCart(idCart,idProduct) {
    return await CartsServices.addProductInCart(idCart,idProduct);
  }

  async deleteproductCart(cid, pid) {
    return await CartsServices.deleteProductCart(cid, pid);
}
}
