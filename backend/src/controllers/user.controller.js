
import { UserService } from '../services/index.js'
import { UserDTO } from "../DTOs/users.dto.js"
import { createHash } from "../utils.js"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const token = await UserService.login(email, password)
    return res.status(200).cookie('currentUser', token, { maxAge: 60000, signed: true, httpOnly: true }).json({ message: 'login OK', token })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const { nombre, apellido, email, edad, password, rol } = req.body
    const userFound = await UserService.getUserByEmail(email)

    if (userFound) {
      return res.status(400).json({ message: 'usuario ya existe' })
    }
    
    const newUser = {
      nombre,
      apellido,
      email,
      edad,
      password: createHash(password),
      rol,
    }

    const user = await UserService.createUser(newUser);
    return res.status(201).json({ message: `Usuario creado -> ${user.nombre}` })
  } catch (e) {
    return res.status(500).json({ message: "Error al crear el usuario" })
  }
}

export const current = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.user.email)
    const sendUser = new UserDTO(user)
    console.log("Usuario logueado: ", sendUser)
    res.send('Bienvenido ' + sendUser.nombre + ' ' + sendUser.apellido)
  } catch (e){
    console.log(e)
  }
  
}
