const express = require('express');

const port = 8007;

const app = express();

const path = require('path');

const db = require('./config/mongoose');

const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    console.log("server is running on port",port);
})
