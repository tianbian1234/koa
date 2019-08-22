const db = require('../db');

module.exports = db.defineModel('blogs', {
    _id: {
        type: db.STRING,
        unique: true
    },
    type: db.STRING,
    title: db.STRING,
    content: db.STRING,
    img: db.STRING,
    readcount: db.BIGINT,
    readlike: db.BIGINT,
    author: db.STRING
})