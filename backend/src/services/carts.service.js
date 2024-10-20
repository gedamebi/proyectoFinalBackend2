import { CartsServices } from '../repository/index.js'

export default class serviceCarts {

  async getCartbyId(id, useLean = false) {
    return await CartsServices.getCartById(id, useLean)
  };

  async getCartbyIdviews(id) {
    return await CartsServices.getCartByIdviews(id)
  }

  async createcart(products){
    return await CartsServices.createCart(products)
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
