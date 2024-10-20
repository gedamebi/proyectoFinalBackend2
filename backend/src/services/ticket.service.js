
import { TicketServices } from '../repository/index.js'

export default class serviceTicket {

  async getAllTickets() {
    return await TicketServices.getAllTickets();
  };

  async createPurchaseTicket(ticket){
    return await TicketServices.createPurchaseTicket(ticket);
  };

  async findTicketById(id){
    return await TicketServices.findTicketById(id);
  }
  
}
  