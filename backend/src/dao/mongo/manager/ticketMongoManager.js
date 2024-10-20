import  TicketModel  from "../models/Ticket.model.js"

class TicketManager {
    constructor() {
        
    }

    getAllTickets = async () => {
        try{
            let users = await TicketModel.find()
            return users.map(user=>user.toObject())
        } catch (e){
            console.log(e)
            return null
        }
    }

    createPurchaseTicket = async (data) => {
        try{
            let result = await TicketModel.create(data)
            return result;
        } catch (e){
            console.log(e)
            return null
        }
    }

    findTicketById = async (id)=>{
        try{
            let result = await TicketModel.findById(id)
            return result
        } catch (e){
            console.log(e)
            return null
        }
    }
}

export default TicketManager