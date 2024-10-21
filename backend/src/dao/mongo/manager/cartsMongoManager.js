import CartsModel from "../models/Carts.model.js"

class CartsManager{
  constructor() {
  }

  getCarts = async (limite) => {
    try{
      if (limite)
        return CartsModel.find().limit(limite).populate('products.product').lean()

      return CartsModel.find().populate('products.product').lean()
    } catch (e){
      console.log(e)
      return null
    }
  };

  getCartById = async (id, useLean) => {
    try{
      if (useLean)
        return await CartsModel.findById(id).lean()

      return await CartsModel.findById(id)
      
    } catch (e){
      console.log(e)
      return null
    }
  }

  getCartByIdviews = async (id) => {
    try{
      return await CartsModel.findById(id).populate('products.product').lean()
    } catch (e){
      console.log(e)
      return null
    }
  }

  getCartByUserviews = async (user) => {
    try{
      return await CartsModel.findOne({ user: user }).populate('products.product').lean();
    } catch (e){
      console.log(e)
      return null
    }
  }

  createCart = async (cart) => {      
    try{                                   
      const cartNew = await CartsModel.create(cart)
      return cartNew
    } catch (e){
      console.log(e)
      return null
    }
  }

  updateCart = async (id, cart) => {
    try {
      return await CartsModel.findByIdAndUpdate(id, cart, {
        new: true,
      }).populate('products.product')
    } catch (e){
      console.log(e)
      return null
    }
  };

  deleteCart = async (cid) => {
    try{
      return await CartsModel.findByIdAndDelete(cid)
    } catch (e){
      console.log(e)
      return null
    }
  }

  deleteProductCart = async (cartId, productId) => {
    try{
      const cartFind = await this.getCartById(cartId)
      const productIndex = cartFind.products.findIndex(
        (product) => JSON.stringify(product.product) == JSON.stringify(productId)
      );

      if (productIndex === -1) {
        throw new Error("Product not found in cart")
      }
      cartFind.products.splice(productIndex, 1)
      const cart = await cartFind.save()

      return cart
    } catch (e){
      console.log(e)
      return null
    }
  }

  deleteAllProducts = async (cid) => {
    try{
      const cartFind = await this.getCartById(cid)
      cartFind.products.splice(0, cartFind.products.length)
      return await cartFind.save()
    } catch (e){
      console.log(e)
      return null
    }
  }
}

export default CartsManager;