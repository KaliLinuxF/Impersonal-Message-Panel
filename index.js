// stuff
const fs = require('fs');
const path = require('path');

// ENV
require('dotenv').config();

// express
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// start server 
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
	console.log(`server started on PORT - ${PORT}`);
});

// route
const main = require('./routes/index');

app.use('/', main);