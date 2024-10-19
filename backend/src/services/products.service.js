import { ProductsServices } from '../repository/index.js'

export default class serviceProducts {

    async getProductsbyId(id) {
      return await ProductsServices.getProductsById(id)
    };

    async createProduct(product) {
      return await ProductsServices.createProducts(product)
    }

    async updateproducts(id, product) {
        return await ProductsServices.updateProducts(id, product)
    }
    
    async deleteProductbyId(id) {
        return await ProductsServices.deleteProducts(id)
    }

    async paginateProduct(filter,options) {
        return await ProductsServices.paginateProducts(filter, options)
    }
}
  