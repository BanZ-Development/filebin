// File upload
const express = require('express');
const mongo = require('./mongo');
const fileSchema = require('./schemas/file');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/public'));

const conn = mongoose.createConnection(require('./config.json').uri);
let gfs;
conn.once('open',()=>{
    gfs = Grid(conn.db,mongo);
    gfs.collection('files');
})

const storage = new GridFsStorage({
    url: require('./config.json').uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
            if (err) { return reject(err); }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'files'
            }; 
            resolve(fileInfo);
            });
        });
    }
});        
const upload = multer({ storage });  


app.post('/upload',upload.single('file'),(req,res)=>{
    res.json({file:req.file});
    res.redirect('/');
});

// Delete Files every 30 minutes
var findRemoveSync = require('find-remove');
const file = require('./schemas/file');
findRemoveSync(__dirname + '/uploads', {age: {seconds: 3600}});

//File Download

const port = 5000;
app.listen(port, ()=>console.log(`Server started on port ${port}`));