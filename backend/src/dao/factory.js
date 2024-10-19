// factory.js

import { connectionDB } from "./mongo/connection.js";

let userDao = null;
let productDao = null;
let cartsDao = null;

const persistence = process.argv[2];
switch(persistence){
    case '--mongo':
        await connectionDB(); // Asegúrate de que connectionDB sea una función asíncrona si es necesario.

        const { default: MongoUsersDAO } = await import("../dao/mongo/manager/userMongoManager.js");
        userDao = new MongoUsersDAO();

        const { default: MongoProductDAO } = await import("../dao/mongo/manager/productMongoManager.js");
        productDao = new MongoProductDAO();

        const { default: MongoCartsDAO } = await import("../dao/mongo/manager/cartsMongoManager.js");
        cartsDao = new MongoCartsDAO();

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
