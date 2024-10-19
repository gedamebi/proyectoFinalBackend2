import  UserModel  from "../models/User.model.js"

class UserManager {
    constructor() {
        
    }
    getUserByEmail = async (email) => {
        try{
            const userFound = await UserModel.findOne({ email }).lean()
            return userFound
        } catch (e){
            console.log(e)
            return null
        }
    }

    createUser = async (user) => {
        try{
            let result = await UserModel.create(user)
            return result
        } catch (e){
            console.log(e)
            return null
        }
    }

    current = async (email) =>{
        try{
            let result = await  UserModel.findOne({ email }).populate('cart').lean()
            return result
        } catch (e){
            console.log(e)
            return null
        }
    }
}

export default UserManager