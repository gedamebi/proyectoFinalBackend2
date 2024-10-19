import mongoose, { model, Schema } from "mongoose"

const userCollection = 'users'

const userSchema = new Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true,
  },
  edad: Number,
  password: {
    type: String,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart'
  },
  rol: {
    type: String,
    default: 'user'
  }
})

const UserModel = model(userCollection, userSchema)
export default UserModel
