db = db.getSiblingDB('customer');

db.createUser({
    user: 'customer',
    pwd: 'customer',
    roles: [{ role: 'readWrite', db: 'customer' }],
});
