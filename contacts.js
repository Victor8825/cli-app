const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const contactsRaw = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsRaw);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const db = await listContacts();
    const contact = db.find(({ id }) => id === contactId);
    console.table(contact);
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const id = nanoid();
    const contact = { id, name, email, phone };
    const db = await listContacts();
    db.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(db));

    return db;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const db = await listContacts();
    const contact = db.find(({ id }) => id === contactId);
    if (!contact) {
      return null;
    }
    const contacts = db.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
