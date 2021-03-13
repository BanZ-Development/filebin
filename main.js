// File upload
const express = require('express');
const upload = require('express-fileupload');
const mongo = require('./mongo');
const fileSchema = require('./schemas/file');

const app = express();

app.use(upload());

app.use(express.static(__dirname + '/public'));




app.post('/', (req, res) => {
    if (req.files) {
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)
        file.mv('./upload/'+filename, function (err) {
            if (err) {
                res.send(err)
            } else {    
                res.send(`File '${filename}' was uploaded`);
                const connectToMongoose = async() => {
                    await mongo().then(async(mongoose) => {
                        try {
                            console.log('Connected to MongoDB!');
                            const file = {
                                filedir: filename
                            }
                            await new fileSchema(file).save();    
                        } finally {
                            mongoose.connection.close();
                        }
                    })
                }
                connectToMongoose();
            }
        })
    }
});

// Delete Files every 30 minutes
var findRemoveSync = require('find-remove');
findRemoveSync(__dirname + '/uploads', {age: {seconds: 3600}});

//File Download

app.listen(5000)