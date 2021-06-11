const express = require('express');
const path = require('path');
const logger = require('./logger');

const app = express();


//init Mindelware
// app.use(logger);

//Body parse middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routea/api/users'));

//Set static folder
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('sever is running on port 5000' ));