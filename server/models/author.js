const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  }
})


const Author = mongoose.model('Author',  AuthorSchema)

module.exports = Author;
