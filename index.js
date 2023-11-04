const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const listContacts = await contacts.listContacts();
            return console.table(listContacts);
        case 'get':
            const getContact = await contacts.getContactById(id);
            return console.table(getContact);
        case 'add':
            const newContact = await contacts.addContact(name, email, phone);
            return console.table(newContact);
        case 'remove':
            const delContact = await contacts.removeContact(id);
            return console.table(delContact);
        default:
            return console.table('Invalid action');
    }
}

invokeAction(argv);