// stuff
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// express
const express = require('express');
const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');

// socket.io
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

// start Discord bot
const { emitter, getRoles } = require('./discordBot');

// start server 
const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> {
	console.log(`server started on PORT - ${PORT}`);
});

// route
app.get('/', (req, res) => {
	res.status(200);
	res.render('index', {roles: getRoles()});
});


app.post('/sendmsg', urlencodedParser, (req, res) => {
	
	emitter.emit('newDiscordMsg', req.body.selectRole, req.body.msg);

	res.redirect('/');
})
