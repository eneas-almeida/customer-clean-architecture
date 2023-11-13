db = db.getSiblingDB('customers');

db.createUser({
    user: 'customer',
    pwd: 'customer',
    roles: [{ role: 'readWrite', db: 'customers' }],
});
