 export class TicketRepository {

    constructor(dao){
        this.dao = dao
    }

    async getAllTickets() {
        return await this.dao.getAllTickets()
    }

    async createPurchaseTicket(ticket) {
        return await this.dao.createPurchaseTicket(ticket)
    }

    async findTicketById(id) {
        return await this.dao.findTicketById(id)
    }
}
  