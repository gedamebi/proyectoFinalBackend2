export class CartsRepository {

    constructor(dao){
        this.dao = dao
    }

    async getCarts(limite) {
        if (limite)
          return this.dao.getCarts(limite)
        return this.dao.getCarts()
    }
    
    async getCartById(id) {
        return await this.dao.getCartById(id)
    }
    
    async getCartByIdviews(id) {
        return await this.dao.getCartByIdviews(id)
    }
    
    async createCart(cart) {                                                                
        const cartNew = await this.dao.createCart(cart)
        return cartNew
    }
    
    async addProductInCart(idCart, idProduct) {
        const cartFind = await this.dao.addProductInCart(idCart, idProduct)
        return cartFind
    }
    
    async updateCart(id, cart) {
        return await this.dao.updateCart(id, cart)
    }
    
    async updateProductInCart(idCart, idProduct, quantity) {
        return await this.dao.updateProductInCart(idCart, idProduct, quantity)
    }
    
    async deleteCart(cid) {
        return await this.dao.deleteCart(cid)
    }
    
    async deleteProductCart(cartId, productId) {
        return await this.dao.deleteProductCart(cartId, productId)
    }
    
    async deleteAllProducts(cid) {
        return await this.dao.deleteAllProducts(cid)
    }
}