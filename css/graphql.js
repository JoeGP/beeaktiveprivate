const mongoose = require('mongoose')
const { makeExecutableSchema } = require('graphql-tools');

const dbModel = require('./mongodb')

//dbModel.client.find({name:"Ann McGril"}).then(data => console.log(data))

const typeDefs = [`
type Query {
  hello: String
  user(name: String, email: String): User
  client(name: String): Client
  login(email: String!, password:String!): User
  register(name: String, email: String, password: String, wallet: String, phone: String): User
}

type User {
    id: String
    name: String
    email: String
    phone: String
    wallet: String
    password: String
}

type Client {
    name: String
    address: String
    dob: String
    telephone: String
    next_of_king: String
    id: String
}

schema {  
  query: Query
}`];

const resolvers = {
  Query: {
    
    hello(root) {
      root = {__description: 'this is the test hello query'} 
      return 'Robommerce Graphql';
    },
    
    user(root,args){
        //console.log(args)
        return (dbModel.user.find(args)
                       .then(data =>data[0])) //.map((key,i) => key)
    },
    
    client(root,args){
      
        return (dbModel.client.find({name: args.name}))
                              .then(data => data[0])
    },

    register(root, args){
      return (dbModel.user.insertMany(args)).then(data => data[0])
    },
    login(root, args){
        return (dbModel.user.find({email: args.email, password: args.password})).then(data => data[0])
    },
    __description: 'This DB has hello, user and client queries',
  }
  
};

const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports =  schema;