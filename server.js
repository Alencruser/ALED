let express=require('express');
let app=express();
let bodyparser=require('body-parser');
let mysql = require('mysql');
let session = require('express-session');

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(session({secret: 'idontknowwhy',
	resave: true,
	saveUninitialized: true}
	));

app.get('/',(req,res)=>{
	res.render('index')
})

app.listen(8080,()=>{
	console.log('Mort au roi')
})