import React, { useState } from 'react';

// Sample book data
const booksData = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "$12.99" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: "$14.99" },
  { id: 3, title: "1984", author: "George Orwell", price: "$13.99" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: "$11.99" },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: "$12.49" },
  { id: 6, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: "$15.99" }
];

// BookCard Component
function BookCard({ book, viewMode }) {
  return (
    <div style={{
      border: '1px solid lightgray',
      padding: '15px',
      backgroundColor: 'white',
      display: viewMode === 'grid' ? 'block' : 'flex',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3>{book.title}</h3>
        <p>by {book.author}</p>
      </div>
      <p style={{ fontWeight: 'bold', color: 'green' }}>{book.price}</p>
    </div>
  );
}

// BookList Component
function BookList({ books, viewMode }) {
  const isGridView = viewMode === 'grid';
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isGridView ? 'repeat(auto-fill, minmax(250px, 1fr))' : '1fr',
      gap: '16px',
      padding: '0'
    }}>
      {books.map(book => (
        <BookCard key={book.id} book={book} viewMode={viewMode} />
      ))}
    </div>
  );
}

// Main App Component
export default function App() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books based on search query
  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f6fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '32px',
          fontWeight: '700'
        }}>
          📚 BookVerse
        </h1>
        <p style={{ 
          margin: '0', 
          fontSize: '16px',
          opacity: '0.9'
        }}>
          Discover Your Next Great Read
        </p>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        {/* Controls Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Search Input */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#2c3e50'
            }}>
              Search Books
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title or author..."
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '6px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* View Toggle Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <span style={{
              fontWeight: '600',
              color: '#2c3e50'
            }}>
              View Mode:
            </span>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: viewMode === 'grid' ? '#3498db' : '#ecf0f1',
                color: viewMode === 'grid' ? 'white' : '#2c3e50',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'grid') {
                  e.target.style.backgroundColor = '#d5dbdb';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'grid') {
                  e.target.style.backgroundColor = '#ecf0f1';
                }
              }}>
              🔲 Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: viewMode === 'list' ? '#3498db' : '#ecf0f1',
                color: viewMode === 'list' ? 'white' : '#2c3e50',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'list') {
                  e.target.style.backgroundColor = '#d5dbdb';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'list') {
                  e.target.style.backgroundColor = '#ecf0f1';
                }
              }}>
              ☰ List View
            </button>
          </div>
        </div>

        {/* Featured Books Section */}
        <section>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '20px',
            color: '#2c3e50',
            fontWeight: '700'
          }}>
            Featured Books {filteredBooks.length > 0 && `(${filteredBooks.length})`}
          </h2>
          
          {filteredBooks.length > 0 ? (
            <BookList books={filteredBooks} viewMode={viewMode} />
          ) : (
            <div style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#7f8c8d'
            }}>
              <p style={{ fontSize: '18px', margin: '0' }}>
                No books found matching "{searchQuery}"
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '16px',
        marginTop: '40px'
      }}>
        <p style={{ margin: '0', opacity: '0.8' }}>
          © 2025 BookVerse. Happy Reading! 📖
        </p>
      </footer>
    </div>
  );
}