import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DB_NAME })
    console.log('BBDD conectada')
  } catch (e) {
    console.log('Error al conectarse a la bbdd')
  }
}
