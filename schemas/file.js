const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    filedir: String
})
module.exports = mongoose.model('files',fileSchema);