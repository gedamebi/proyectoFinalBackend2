export default class serviceUsers {
    constructor(dao) {
      this.dao = dao;
    }
  
    getUserByEmail = (email) => {
      return this.dao.getUserByEmail(email);
    };
  
    register = (user) => {
      return this.dao.registerUser(user);
    };

    current = (email) =>{
      return this.dao.current(email);
    }
  }
  