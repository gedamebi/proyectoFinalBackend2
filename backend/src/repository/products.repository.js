export class ProductsRepository {

    constructor(dao){
        this.dao = dao
    }

    async getProductsById(id) {
        return await this.dao.getProductsById(id)
    };
  
    async createProduct(product) {
        return await this.dao.createProducts(product)
    }

    async updateproducts(id, product) {
        return await this.dao.updateProducts(id, product)
    }
    
    async deleteProductById(id) {
        return await this.dao.deleteProducts(id)
    }

    async paginateProducts(filter, options) {
        return await this.dao.paginateProducts(filter, options)
    }
}