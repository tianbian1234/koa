const db = require('../db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING,
        unique: true
    },
    passwd: db.STRING,
    name: db.STRING,
    auth: db.STRING,
    gender: db.BOOLEAN,
});