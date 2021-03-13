const mongoose = require('mongoose');
const pass = require('./config.json');
const mongoPass = pass.uri;

module.exports = async() => {
    await mongoose.connect(mongoPass, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) 
    return mongoose;
}