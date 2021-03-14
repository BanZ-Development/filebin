// File upload
const express = require('express');
const mongo = require('./mongo');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs');
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
                id: file.id,
                bucketName: 'files'
            }; 
            resolve(fileInfo);
            });
        });
    }
});        
const upload = multer({ storage });  

app.post('/upload',upload.single('file'),(req,res)=>{
    const id = req.file.id;
    res.send(id);
});

app.get('/:id',(req,res)=>{
    let fileID = filename.split('.');
    conn.db.collection.find({filename: fileID[0]})
})

const port = 5000;
app.listen(port, ()=>console.log(`Server started on port ${port}`));