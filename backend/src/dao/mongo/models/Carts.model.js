import mongoose, { model, Schema } from "mongoose"
const cartsCollection = 'carts'

const CartsSchema = new Schema({
    products: {
        type: [{
            quantity: {
                type: Number,
                default: 0
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            }
        }],
        default: []
    },
    user : {
        type: String,
        default : ''
    }
})

const CartsModel = model(cartsCollection, CartsSchema)
export default CartsModel