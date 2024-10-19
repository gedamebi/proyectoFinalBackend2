import ProductModel from "../models/Product.model.js"

class ProductsManager {
  constructor() {     
  }
  
  getProductsById = async (id) => {
    try {
      return await ProductModel.findById(id)
    } catch (e){
      console.log(e)
      return null
    }
    
  }

  getProductsByCode = async (code) => {
    try {
      return await ProductModel.find({code})
    } catch (e){
      console.log(e)
      return null
    }
  }

  createProducts = async (product) => {
    try {
      return await ProductModel.create(product)
    } catch (e){
      console.log(e)
      return null
    }
  }

  updateProducts = async (id, product) => {
    try {
      return await ProductModel.findByIdAndUpdate(id, {
        ...product
      }, { new: true });
    } catch (e){
      console.log(e)
      return null
    }
  }

  deleteProducts = async (id) => {
    try {
      return await ProductModel.findByIdAndDelete(id)
    } catch (e){
      console.log(e)
      return null
    }
  }
  
  paginateProducts = async (filter, options) => {
    try {
      return await ProductModel.paginate(filter, options)
    } catch (e){
      console.log(e)
      return null
    }
  }
}

export default ProductsManager