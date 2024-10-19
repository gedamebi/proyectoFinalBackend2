
import { generadorToken, isValidPassword } from "../utils.js";
import { UserServices } from '../repository/index.js';

export default class serviceUsers {

  async login(email, password) {
    const userFound = await UserServices.getUserByEmail(email)

    if (isValidPassword(userFound, password)) {
      const token = generadorToken({ email: userFound.email, nombre: userFound.nombre, rol: userFound.rol })
      return token
    }
    throw new Error('Credenciales inválidas');
  }

  async getUserByEmail(email) {
      const userFound = await UserServices.getUserByEmail(email)
      return userFound
  }

  async createUser (user) {
    const newUser = await UserServices.createUser(user)
    if (newUser) return newUser
    throw new Error('Error al crear el usario');
  }
}
  