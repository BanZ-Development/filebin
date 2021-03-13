const mongoose = require('mongoose');
const { mongoPass } = require('./config.js');
const mongoPass = `mongodb://admin:<${mongoPass}>@fileswap-shard-00-00.ikulf.mongodb.net:27017,fileswap-shard-00-01.ikulf.mongodb.net:27017,fileswap-shard-00-02.ikulf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-hj8gh6-shard-0&authSource=admin&retryWrites=true&w=majority`

module.exports = async() => {
    await mongoose.connect(mongoPass, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) 
    return mongoose;
}