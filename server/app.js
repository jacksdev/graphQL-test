const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')



const app = express();


mongoose.connect('mongodb://jack-testing:testing1234@ds253713.mlab.com:53713/graphql-react-test', { useNewUrlParser: true })

mongoose.connection.once('open', () => {
  console.log('db connection established');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


app.listen(4000, () => {
  console.log('now listening on port 4000');
})
