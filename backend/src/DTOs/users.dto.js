
export class UserDTO{
    constructor(user){
        this.nombre= user.nombre
        this.apellido= user.apellido
        this.email= user.email
        this.edad = user.edad
        this.rol = user.rol
    }
}
