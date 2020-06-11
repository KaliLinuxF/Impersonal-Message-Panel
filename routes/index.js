const express = require('express');
const router = express.Router();

// parser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// start Discord bot
const { emitter, getRoles } = require('../discordBot');

router.route('/')
	.get((req, res) => {
		res.render('index', {roles: getRoles()});
})
	.post(urlencodedParser, (req, res) => {
	
		emitter.emit('newDiscordMsg', req.body.selectRole, req.body.msg);
		res.redirect('/');
})

module.exports = router;