export default class serviceCarts {
  constructor(dao) {
    this.dao = dao;
  }

/*   getAllCarts = (limit) => {
    return this.dao.getCarts(limit);
  }; */

  getCartbyId = (id) => {////////////////////{
    return this.dao.getCartById(id);
  };

  getCartbyIdviews = (id) =>{////////////////
    return this.dao.getCartByIdviews(id);
  }

  createcart = (products) =>{//////////////////////
    return this.dao.createCart(products);
  }

  /* addProductinCart = (idCart,idProduct) =>{
      return this.dao.addProductInCart(idCart,idProduct);
  } */
  
  updatecart = (id, newCart) =>{/////////////////////////
      return this.dao.updateCart(id, newCart);
  }

/*   updateProductinCart = (idCart,idProduct,quantity) =>{
      return this.dao.updateProductInCart(idCart,idProduct,quantity);
  }

  deletecart = (cid) =>{
      return this.dao.deleteCart(cid);
  }

  deleteproductCart = (cartId,productId) =>{
      return this.dao.deleteProductCart(cartId,productId);
  }

  deleteAllproducts = (cid) =>{
      return this.dao.deleteAllProducts(cid);
  }
 */
}
