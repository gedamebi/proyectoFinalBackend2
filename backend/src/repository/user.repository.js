
 //import { userDao } from "../dao/factory.js";

 export class UserRepository {

    constructor(dao){
        this.dao = dao
    }

    async getUserByEmail(email) {
        return await this.dao.getUserByEmail(email);
    }

    async createUser(user) {
        return await this.dao.createUser(user);
    }

    async current(email) {
        return await this.dao.current(email);
    }
}

//export default new UserRepository();
  