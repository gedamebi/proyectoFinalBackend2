import ProductModel from "../models/Product.model.js";

class ProductsManager {
  constructor() {     
  }
    getProducts = async (limite) => {
        if(limite)
            return await ProductModel.find().limit(limite).lean();
        return await ProductModel.find().lean();
    };
  
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
    
    paginateData = async (filter, data) => {
      return await ProductModel.paginate(filter, data);
    };
  }

  export default ProductsManager;