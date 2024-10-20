import { model, Schema } from "mongoose"

const ticketsCollection = 'tickets'

const TicketSchema = new Schema({
    "code": { type: String, unique: true },
    "purchase_datetime": { type: String },
    "amount": { type: Number },
    "purchaser": { type: String },
    "productsPurchase": { type: Array }
})

const TicketModel = model(ticketsCollection, TicketSchema)
export default TicketModel