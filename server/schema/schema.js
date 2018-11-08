const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')
const _ = require('lodash')


//Schema definitions
const {
  GraphQLObjectType: gObj,
  GraphQLString: gString,
  GraphQLInt: gInt,
  GraphQLSchema: gSchema,
  GraphQLID: gId,
  GraphQLList: gList,
  GraphQLNonNull: gNonNull
} = graphql;




const BookType = new gObj({
  name:'Book',
  fields: () => ({
    id: {type: gId},
    name: {type: gString},
    genre: {type: gString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return Author.findById(parent.authorid)
      }
    }
  })
})


const AuthorType = new gObj({
  name:'Author',
  fields: () => ({
    id: {type: gId},
    name: {type: gString},
    age: {type: gInt},
    books:{
      type: new gList(BookType),
      resolve(parent, args){
        return Book.find({authorid:parent.id})
      }
    }
  })
})


const RootQuery = new gObj({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: gId}},
      resolve(parent, args) {
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: gId}},
      resolve(parent, args) {
        return Author.findById(args.id)
      }
    },
    books: {
      type: new gList(BookType),
      resolve(parent, args){
        return Book.find({})
      }
    },
    authors: {
      type: new gList(AuthorType),
      resolve(parent, args){
        return Author.find({})
      }
    }
  }
})


const Mutation = new gObj({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: gNonNull(gString)},
        age: {type: gNonNull(gString)}
      },
      resolve(parent, args) {

        let author = new Author({
          name: args.name,
          age: args.age
        })

        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: gNonNull(gString)},
        genre: {type: gNonNull(gString)},
        authorid: {type: gNonNull(gId)},
      },
      resolve(parent, args) {

        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorid: args.authorid
        })

        return book.save()
      }
    }
  }
})



module.exports = new gSchema({
  query: RootQuery,
  mutation: Mutation
})
