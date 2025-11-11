import React, { useState, useEffect } from 'react';
import { Search, Book, BookOpen } from 'lucide-react';
import { Link } from '../utils/Router';
import UserStatus from '../components/RenderProps/UserStatus';
import LoadingStatus from '../components/RenderProps/LoadingStatus';

const API_BASE_URL = 'http://localhost:3001';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/books`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <UserStatus>
        {({ renderGreeting }) => (
          <header className="bg-white shadow-md sticky top-0 z-10 page-fade-in">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Book className="w-8 h-8 text-purple-600" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    BookVerse
                  </h1>
                </div>
                {renderGreeting()}
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </header>
        )}
      </UserStatus>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Explore Our Collection</h2>
          <span className="text-sm text-gray-500">{books.length} books available</span>
        </div>
        
        <LoadingStatus>
          {({ renderLoader, renderError }) => {
            if (loading) return renderLoader("Fetching books from json-server...");
            if (error) return renderError(error);
            
            if (filteredBooks.length === 0) {
              return (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No books found.</p>
                </div>
              );
            }
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/book/${book.id}`}
                    params={{ id: book.id }}
                    className="block"
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden">
                      <div className="h-64 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                        <div className="text-white text-6xl font-bold opacity-20">
                          {book.title.charAt(0)}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 mb-2">by {book.author}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-purple-600 font-semibold px-2 py-1 bg-purple-100 rounded">
                            {book.genre}
                          </span>
                          <span className="text-sm text-gray-500">{book.year}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-gray-700 font-semibold">{book.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          }}
        </LoadingStatus>
      </div>
    </div>
  );
};

export default HomePage;