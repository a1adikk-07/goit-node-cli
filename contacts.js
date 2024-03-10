import fs from "fs/promises";
import { nanoid } from "nanoid";

import { contactsPath } from "./db/contacts.js";

export async function listContacts() {
  const data = contactsPath;
  return data;
}

export async function getContactById(contactId) {
  const contacts = listContacts();
  const result = contacts.find((contact) => contactId === contact.id);
  return result || null;
}

export async function removeContact(contactId) {
  const contacts = listContacts();
  const index = contacts.find((contact) => contactId === contact.id);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

export async function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
