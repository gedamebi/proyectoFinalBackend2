
import { UserService } from '../services/index.js';
import { createHash, generadorToken, isValidPassword } from "../utils.js";

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const userFound = await UserService.getUserByEmail(email)

    if (isValidPassword(userFound, password)) {
      const token = generadorToken({ email: userFound.email, nombre: userFound.nombre, rol: userFound.rol })
      return res.status(200).cookie('currentUser', token, { maxAge: 60000, signed: true, httpOnly: true }).json({ message: 'login OK', token })
    }

    return res.status(200).json({ message: 'error login' })
  } catch (e) {
    return res.json({ message: e })
  }
}

export const register = async (req, res) => {
  try {
    const { nombre, apellido, email, edad, password, rol } = req.body;
    const userFound = await UserService.getUserByEmail(email);

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
    console.log(e);
    return res.status(500).json({ message: e })
  }
}

export const current = async (req, res) => {
  console.log("Usuario logueado: ", req.user)
  res.send('Bienvenido ' + req.user.nombre + ' ' + req.user.apellido)
}
