import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

class BookList extends Component {

  render() {
    return (
      <div id="book_list">
        <ul>
          {
            this.props.data.loading ? (
              'Loading...'
            ) : (
              this.props.data.books.map(book => (
                <li key={book.id}>{book.name}</li>
              ))
            )
          }
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
