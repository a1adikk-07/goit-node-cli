const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = listContacts();
  const result = contacts.find((contact) => contactId === contact.id);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = listContacts();
  const index = contacts.find((contact) => contactId === contact.id);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
