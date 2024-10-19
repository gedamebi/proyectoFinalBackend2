import { ContactRepository } from "./contact.repository.js";
import ContactFactory from '../persistence/factory.js'

const { ContactDao } = ContactFactory; // DAO

export const ContactServices = new ContactRepository(ContactDao)
