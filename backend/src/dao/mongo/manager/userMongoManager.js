import  UserModel  from "../models/User.model.js"

export default class Users {
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

    /* findId = async (id)=>{
        let result = await userModel.findById(id)
        return result
    }

    updateIdUser = async (filter, campo) => {
         let result = await userModel.updateOne(filter, campo);
         return result
      }; */
}