// src/AuthorInfo.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthorInfo extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log('AuthorInfo mounted - Data loaded for:', this.props.author);
  }

  componentWillUnmount() {
    console.log('AuthorInfo unmounted');
  }

  render() {
    const { author, bio, books, onClose } = this.props;
    const topBooks = books.slice(0, 3);

    return (
      <div className="author-info">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">About {author}</h4>
          <button className="btn btn-sm btn-light" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="card-body">
          <h5 className="mb-3">Biography</h5>
          <p className="text-muted">{bio}</p>
          
          <h5 className="mt-4 mb-3">Top Books</h5>
          <ol className="list-group list-group-numbered">
            {topBooks.map((book, index) => (
              <li key={index} className="list-group-item">
                {book}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default AuthorInfo;