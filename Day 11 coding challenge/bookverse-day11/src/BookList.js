// src/BookList.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        cover: PropTypes.string.isRequired
      })
    ).isRequired,
    onBookClick: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log('BookList mounted - Loaded', this.props.books.length, 'books');
  }

  render() {
    const { books, onBookClick } = this.props;

    return (
      <div className="row g-4">
        {books.map(book => (
          <div key={book.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <BookCard book={book} onBookClick={onBookClick} />
          </div>
        ))}
      </div>
    );
  }
}

export default BookList;