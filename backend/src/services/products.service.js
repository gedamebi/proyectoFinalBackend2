import { ProductsServices } from '../repository/index.js'

export default class serviceProducts {

    async getProductsbyId(id) {
      return await ProductsServices.getProductsById(id)
    }

    async createProduct(product) {
      return await ProductsServices.createProduct(product)
    }

    async updateproducts(id, product) {
        return await ProductsServices.updateproducts(id, product)
    }
    
    async deleteProductbyId(id) {
        return await ProductsServices.deleteProductById(id)
    }

    async paginateProduct(filter,options) {
        return await ProductsServices.paginateProducts(filter, options)
    }
}
  