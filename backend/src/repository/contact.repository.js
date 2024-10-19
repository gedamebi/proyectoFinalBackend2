export class ContactRepository {
    constructor(dao){
        this.dao = dao
    }

    get(){
        return this.dao.get()
    }

}
