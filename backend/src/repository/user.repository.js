import  UserDao  from "../dao/mongo/manager/userMongoManager";

class UserRepository {
    async getUserByEmail(username) {
      return UserDao.findByUsername(username);
    }
  
    async createUser(userData) {
      return UserDao.create(userData);
    }

    async current(username) {
        return UserDao.findByUsername(username);
      }
  }
  