import ProductModel from "../models/Product.model.js";

class ProductsManager {
  constructor() {     
  }
  
  getProductsById = async (id) => {
    return await ProductModel.findById(id);
  };

  getProductsByCode = async (code) => {
      return await ProductModel.find({code});
    };

  createProducts = async (product) => {
    return await ProductModel.create(product);
  };

  updateProducts = async (id, product) => {
    return await ProductModel.findByIdAndUpdate(id, product);
  };

  deleteProducts = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
  };
  
  paginateProducts = async (filter, options) => {
    return await ProductModel.paginate(filter, options);
  };
}

  export default ProductsManager;