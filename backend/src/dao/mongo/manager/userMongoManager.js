import  UserModel  from "../models/User.model.js"

class UserManager {
    constructor() {
        
    }
    getUserByEmail = async (email) => {
        const userFound = await UserModel.findOne({ email }).lean()
        return userFound
    }

    createUser = async (user) => {
        let result = await UserModel.create(user);
        return result;
    }

    current = async (email) =>{
        //let result = await userModel.findOne(campo)
        let result = await  UserModel.findOne({ email }).populate('cart').lean()
        return result;
    }
}

export default UserManager;