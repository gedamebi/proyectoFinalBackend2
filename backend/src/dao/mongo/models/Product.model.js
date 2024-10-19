import mongoose, { model, Schema } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const ProductSchema = new Schema({
    "title": { type: String },
    "description": { type: String },
    "code": { type: String },
    "price": { type: Number },
    "stock": { type: Number },
    "category": { type: String },
    "thumbnails": { type: [String] }
})

ProductSchema.plugin(mongoosePaginate)

const ProductModel = model(productCollection, ProductSchema)
export default ProductModel