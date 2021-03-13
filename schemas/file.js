const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    filedir: String,
    image: Image
})
module.exports = mongoose.model('files',fileSchema);