// src/BookCard.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookCard extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };

  render() {
    const { book, onBookClick } = this.props;
    
    return (
      <div className="card h-100 shadow-sm book-card" onClick={() => onBookClick(book)}>
        <img src={book.cover} className="card-img-top book-cover" alt={book.title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{book.title}</h5>
          <p className="card-text text-muted mb-1">
            <small>by {book.author}</small>
          </p>
          <div className="mt-auto">
            <span className="badge bg-primary me-2">{book.genre}</span>
            <span className="badge bg-warning text-dark">
              ⭐ {book.rating}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;