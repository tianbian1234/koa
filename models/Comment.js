const db = require('../db');

module.exports = db.defineModel('comments', {
    _id: {
        type: db.STRING,
        unique: true
    },
    blog_id: {
        type: db.STRING,
        allowNull: false
    },
    content: db.TEXT
})