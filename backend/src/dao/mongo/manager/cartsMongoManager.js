import CartsModel from "../models/Carts.model.js";
import ProductModel from '../models/Product.model.js'

class CartsManager{
  constructor() {
  }

  getCarts = async (limite) => {
    if (limite)
      return CartsModel.find().limit(limite).populate('products.product').lean();

    return CartsModel.find().populate('products.product').lean();
  };

  getCartById = async (id) => {
    try {
      return await CartsModel.findById(id).lean();
    } catch (e){
      
    }
    return false;
  };

  getCartByIdviews = async (id) => {
    return await CartsModel.findById(id).populate('products.product').lean();
  };

  createCart = async (cart) => {                                                                
    const cartNew = await CartsModel.create(cart)
    return cartNew
  };

  addProductInCart = async (idCart, idProduct) => {
    let bandera = false
    const cartFind = await this.getCartById(idCart)

    cartFind.products.forEach((e) => {
      if (e.idproduct == idProduct) {
        e.quantity = e.quantity + 1
        bandera = true
      }
    })
    if (bandera) return cartFind.save()

    cartFind.products.push({ idproduct: idProduct, quantity: 1 })

    return cartFind.save()
  }

  updateCart = async (id, cart) => {
    try {
      return await CartsModel.findByIdAndUpdate(id, cart, {
        new: true,
      }).populate('products.product')
    } catch (e){
      console.log("error")
    }
    return null;
  };

  updateProductInCart = async (idCart, idProduct, quantity) => {

    const cartFind = await this.getCartById(idCart)
    const productFind = await ProductModel.findById(idProduct)

    if (productFind.stock >= quantity) {
      cartFind.products.forEach((e) => {
        if (e.idproduct == idProduct) {
          e.quantity = quantity
        }
      })

      await cartFind.save()
      return true
    }
    return false
  }

  deleteCart = async (cid) => {
    return await CartsModel.findByIdAndDelete(cid);
  };

  deleteProductCart = async (cartId, productId) => {

    const cartFind = await this.getCartById(cartId)
    const productIndex = cartFind.products.findIndex(
      (product) => JSON.stringify(product.idproduct) == JSON.stringify(productId)
    );

    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }
    cartFind.products.splice(productIndex, 1);
    const cart = await cartFind.save();

    return cart
  }

  deleteAllProducts = async (cid) => {

    const cartFind = await this.getCartById(cid)
    cartFind.products.splice(0, cartFind.products.length)
    return await cartFind.save()
  };
}

export default CartsManager;