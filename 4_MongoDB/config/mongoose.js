const mongoose = require('mongoose');
// const debuglog = require('debug')('development:mongooseconfig');

mongoose.connect("mongodb://127.0.0.1:27017/BackendDomination2");

const db = mongoose.connection;

db.on('error', (err) => {
  debuglog(err);
});

db.on("open",()=>{
    console.log("Mongoose connection opened successfully");
});

module.exports = db;