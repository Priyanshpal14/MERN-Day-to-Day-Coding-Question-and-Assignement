// src/App.js

import React, { Component, createRef } from 'react';
import BookList from './BookList';
import AuthorInfo from './AuthorInfo';
import booksData from './booksData';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: booksData,
      filteredBooks: booksData,
      searchTerm: '',
      selectedGenre: 'All',
      selectedBook: null
    };
    
    // Create ref for search input (Uncontrolled Component)
    this.searchInputRef = createRef();
  }

  componentDidMount() {
    console.log('App mounted - BookVerse initialized');
  }

  handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    this.setState({ searchTerm }, this.filterBooks);
  };

  handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    this.setState({ selectedGenre }, this.filterBooks);
  };

  filterBooks = () => {
    const { books, searchTerm, selectedGenre } = this.state;
    
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                           book.author.toLowerCase().includes(searchTerm);
      const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    this.setState({ filteredBooks: filtered });
  };

  handleBookClick = (book) => {
    this.setState({ selectedBook: book });
  };

  handleCloseAuthorInfo = () => {
    this.setState({ selectedBook: null });
  };

  // Focus search input using ref (Demonstrates Refs)
  focusSearchInput = () => {
    if (this.searchInputRef.current) {
      this.searchInputRef.current.focus();
      this.searchInputRef.current.select();
    }
  };

  clearSearch = () => {
    this.setState({ searchTerm: '', selectedGenre: 'All' }, () => {
      this.filterBooks();
      this.focusSearchInput();
    });
  };

  render() {
    const { filteredBooks, searchTerm, selectedGenre, selectedBook } = this.state;
    const genres = ['All', ...new Set(booksData.map(book => book.genre))];

    return (
      <div className="app-container">
        {/* Bootstrap CSS CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />

        {/* Header Section */}
        <div className="header">
          <h1>📚 BookVerse</h1>
          <p>Discover amazing books and their authors</p>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label fw-bold">Search Books</label>
              <input
                ref={this.searchInputRef}
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={this.handleSearch}
              />
            </div>
            
            <div className="col-md-4">
              <label className="form-label fw-bold">Filter by Genre</label>
              <select
                className="form-select form-select-lg"
                value={selectedGenre}
                onChange={this.handleGenreChange}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3">
              <button
                className="btn btn-primary btn-lg w-100 me-2 mb-2"
                onClick={this.focusSearchInput}
              >
                🔍 Focus Search
              </button>
              <button
                className="btn btn-secondary btn-lg w-100"
                onClick={this.clearSearch}
              >
                🔄 Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          📖 Showing {filteredBooks.length} of {booksData.length} books
        </div>

        {/* Book List Component */}
        <BookList books={filteredBooks} onBookClick={this.handleBookClick} />

        {/* Author Info Modal (Conditional Rendering) */}
        {selectedBook && (
          <>
            <div className="overlay" onClick={this.handleCloseAuthorInfo}></div>
            <AuthorInfo
              author={selectedBook.author}
              bio={selectedBook.authorBio}
              books={selectedBook.authorBooks}
              onClose={this.handleCloseAuthorInfo}
            />
          </>
        )}

        {/* No Results Message */}
        {filteredBooks.length === 0 && (
          <div className="text-center mt-5">
            <div className="alert alert-info d-inline-block">
              <h4>📭 No books found</h4>
              <p className="mb-0">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;