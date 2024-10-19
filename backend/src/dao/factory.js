// factory.js

import { connectionDB } from "./mongo/connection.js";

let userDao = null;
let productDao = null;
let cartsDao = null;

const persistence = process.argv[2];
switch(persistence){
    case '--mongo':
        await connectionDB();

        const { default: UserManager } = await import("../dao/mongo/manager/userMongoManager.js");
        userDao = new UserManager();

        const { default: ProductsManager } = await import("../dao/mongo/manager/productMongoManager.js");
        productDao = new ProductsManager();

        const { default: CartsManager } = await import("../dao/mongo/manager/cartsMongoManager.js");
        cartsDao = new CartsManager();

        break;
    case '--memory':
        // userDao = new ContactMemory();
        break;
    // case '--fs':
    //     userDao = new ContactFS();
    //     break;
    default: 
        // userDao = new ContactMemory();
        break;
}

export { userDao, productDao, cartsDao };
