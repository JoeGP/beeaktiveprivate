const express = require('express')
const fs = require('fs')

const app = express()
const index = fs.readFileSync(__dirname+'/app/index.html')

const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./graphql')
const graphql = require('graphql').graphql;

let connection = [];
    
app.use(express.static(__dirname+'/app'))
app.use('/api', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/api'}));

//app.get('/store',(req,res) =>res.send('store'))
//app.get('/simulation',(req,res) =>res.send('simulation'))
//app.get('/blockchain',(req,res) =>res.send('blockchain'))
//app.get('/faqs',(req,res) =>res.send(index))
app.get('*',(req,res)=> res.send(index))

const port = 5000;
const server = app.listen(process.env.PORT||port,()=> console.log('Server is online at port ',port))
const io = require('socket.io').listen(server)


io.sockets.on('connection',function(socket){
	connection.push(socket); 
	socket.emit('connect',socket.id)
	//socket.emit('online', socks)
	
	console.log('Socket : '+socket.id+' connected');
	console.log('Total sockets connected : ',connection.length);


	socket.once('disconnect',function(){
		connection.splice(connection.indexOf(socket),1);

		socket.disconnect();

		console.log('Socket : '+socket.id+' disconnected');
		console.log('Sockets remaining: ',connection.length);
	})

	socket.on('login',function(login){
		//console.log(login)
		const loginQuery= `
			{
				login(email: "${login.email}", password: "${login.password}"){
					email
					id
					name
				} 								
			}
			`;
		graphql(schema, loginQuery).then( 
			(result) => {console.log(result.data.login);
				if(result.data.login != null){
					socket.emit('auth',true)
				}else{
					socket.emit('auth',false)
				}
			}
		).catch((err)=>{
			console.log('failed login: ', err)
		})
	})
	
	socket.on('register', reg =>{
		//console.log(reg)
		
		const helloQuery=`{ hello}`
		const registerQuery= `
			{	register(name: "${reg.name}",email: "${reg.email}",phone: "${reg.phone}",
						wallet: "${reg.wallet}",password: "${reg.password}"){
							name
							email
							id
							wallet
						}
			}
		`;
		graphql(
			schema,
			registerQuery
		).then(result => console.log(result));
	})
})
