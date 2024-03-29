const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
	const data = await fs.readFile(contactsPath);

	return JSON.parse(data);
}

async function getContactById(contactId) {
	const data = await listContacts();

	const result = data.find((item) => item.id === contactId);
	console.log(result);
	return result || null;
}

async function removeContact(contactId) {
	const data = await listContacts();
	const index = data.findIndex((item) => item.id === contactId);

	if (index === -1) {
		return null;
	}

	const deletedContact = data.splice(index, 1);

	await fs.writeFile(contactsPath, JSON.stringify(data));
	return deletedContact;
}

async function saveContacts(data) {
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
}

async function addContact(name, email, phone) {
	const data = await listContacts();

	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};

	data.push(newContact);
	await saveContacts(data);
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
