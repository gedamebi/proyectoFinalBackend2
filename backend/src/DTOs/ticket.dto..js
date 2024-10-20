import { v4 as uuidv4 } from 'uuid';

export class TicketDTO{
    constructor(total, user, products){
        this.code= uuidv4()
        this.purchase_datetime = new Date();
        this.amount= total
        this.purchaser = user
        this.productsPurchase = products
    }
}
