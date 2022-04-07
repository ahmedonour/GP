const express = require('express');
const sqlite3 = require('sqlite3');
const bp = require('body-parser');

//Database Connection
const db =  new sqlite3.Database('./public/DB/main.db');

//Express App

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname+ '/public'));

// Express Routes
//Home Route
app.get('/',(req,res) => {
	res.sendFile(__dirname + '/public/index.html')
});
//Login Route
app.get('/login', (req , res) => {
	res.sendFile(__dirname + '/public/html/Login/index.html')
});
//Register Route
app.get('/register', (req , res) => {
	res.sendFile(__dirname + '/public/html/Register/index.html');
});

app.get('/newsletter' , function(req,res){
	res.render('newsletter', { csrf: 'CSRF token goes here'});
});

app.post('/process', function (req , res) {
	//console.log('Form : ' + req.query.form);
	//console.log(req.body._csrf);
	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;
	const phone = req.body.phone;
	const password = req.body.password;

	//Insert into database
	db.serialize(function() {
		const stmt = db.prepare("INSERT INTO Register VALUES(?,?,?,?,?)", [fname,lname,email,phone,password]);
		stmt.run();
		stmt.finalize();
	});
	res.redirect(303 , '/');
	
});



//Server
const port =  process.env.PORT || 5000;

app.listen(port , () => console.log(`Listening to http://localhost:${port}`))
