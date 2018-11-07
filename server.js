let express=require('express');
let app=express();
let bodyparser=require('body-parser');
let mysql = require('mysql');
let session = require('express-session');
let ent= require('ent')
let connection=require('./bdd.js')
let bcrypt=require('bcrypt-nodejs')
let flash = require('express-flash')
let cookieParser = require('cookie-parser')
let http = require('http').Server(app)
let io = require('socket.io')(http)
let sess;

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(session({secret: 'idontknowwhy',
	resave: true,
	saveUninitialized: true}
	))
app.use(cookieParser())
app.use(flash())

//Page du chat
app.get('/',(req,res)=>{
	sess=req.session
	if(sess.pseudo)res.render('index',{token:sess.idUser,user:sess.pseudo})
		else res.redirect('/login')
	})
//Page connexion
app.get('/login',(req,res)=>{
	res.render('login')
})
//Reception formulaire connexion
app.post('/connect',(req,res)=>{
	let pseudo=ent.encode(req.body.pseudo);
	let pass=ent.encode(req.body.pass);
	sess=req.session;
	let request=`SELECT * FROM Users WHERE pseudo='${pseudo}'`;
	connection.query(request,(error,results,field)=>{
		if(error){
			req.flash('erreur','Erreur dans l\'Authentification, veuillez reessayer')
			res.redirect('/login')
			console.log(error);
		}
		else if(results.length>0){
			if (bcrypt.compareSync(pass, results[0].pass)) {
				sess.idUser=results[0].idUsers;
				sess.pseudo=pseudo;
				req.flash('succes','Authentification réussie')
				res.redirect('/');
				}else{
					req.flash('erreur','Echec de l\'Authentification')
					res.redirect('/login')
				}
			}else{
				req.flash('erreur','Echec de l\'Authentification')
				res.redirect('/');
			}
		})
})
//Page enregistrement
app.get('/register',(req,res)=>{
	res.render('login',{register:'need to register'})
})

var chat = io
	.of('/')
	.on('connection', function(socket){
		console.log('user is connected !');
		socket.on('disconnect', function(){
			console.log('user is disconnected !')
		})

		socket.on('message', function(data){
			chat.emit('send-message', data)
		})
})
//Reception de formulaire inscription 
app.post('/signup',(req,res)=>{
	function boolit(p){
		if(p=='oui'){
			return 1
		}else{
			return 0
		}
	}
	let pseudo=ent.encode(req.body.pseudo);
	let pass=ent.encode(req.body.pass);
	let firstName=ent.encode(req.body.firstName);
	let lastName=ent.encode(req.body.lastName);
	let email=ent.encode(req.body.email);
	let birthDate=ent.encode(req.body.birthDate);
	let promo=ent.encode(req.body.promo);
	let link=ent.encode(req.body.curri);
	let simplon=boolit(ent.encode(req.body.simplon))
	let working=boolit(ent.encode(req.body.working));
	bcrypt.hash(pass, null, null, function(err, hash) {
		request=`INSERT INTO Users (pseudo,pass,firstNAME,lastName,email,birthDate,promo,curriculum,simplon,working) VALUES ('${pseudo}','${hash}','${firstName}','${lastName}','${email}','${birthDate}','${promo}','${link}','${simplon}','${working}')`;
		connection.query(request,(error,results,field)=>{
			if (error) {
				req.flash('erreur','Echec de l\'inscription, veuillez vérifier tout les champs')
				res.redirect('/register')
				console.log(error)
			}
				else{
				req.flash('succes','Inscription réussie')
				res.redirect('/login')
			}
		})
	})
})
//Deconnexion
app.get('/logout',(req,res)=>{
	req.session.destroy((err)=> {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	})
})
//Redirection des utilisateurs si ils accèdent à des pages qui n'existent pas
app.all('*', function(req, res) {
  res.redirect("/");
});
//Ouverture du serveur
http.listen(process.env.PORT||8080,()=>{
	console.log('La plupart des gens disent qu\'on a besoin d\'amour pour vivre. En fait, on a surtout besoin d\'oxygène !')
})