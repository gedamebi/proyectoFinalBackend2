import { UserRepository } from "./user.repository.js";

import { userDao } from "../dao/factory.js";

export const UserServices = new UserRepository(userDao)
