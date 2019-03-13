const model = require('./model.js');
model.sync();

setTimeout(function(){
    process.exit(0);
}, 5000);
console.log('init db ok.');
