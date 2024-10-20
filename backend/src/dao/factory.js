import { connectionDB } from "./mongo/connection.js"

let userDao = null
let productDao = null
let cartsDao = null
let ticketDao = null

const persistence = process.argv[2]
switch(persistence){
    case '--mongo':
        await connectionDB()

        const { default: UserManager } = await import("../dao/mongo/manager/userMongoManager.js")
        userDao = new UserManager()

        const { default: ProductsManager } = await import("../dao/mongo/manager/productMongoManager.js")
        productDao = new ProductsManager()

        const { default: CartsManager } = await import("../dao/mongo/manager/cartsMongoManager.js")
        cartsDao = new CartsManager()

        const { default: TicketManager } = await import("../dao/mongo/manager/ticketMongoManager.js")
        ticketDao = new TicketManager()

        break;
    case '--memory':
        
        break;
   
    default: 
        
        break;
}

export { userDao, productDao, cartsDao, ticketDao }
