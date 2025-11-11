// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Home } from 'lucide-react';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import bookStore from './flux/BookStore';
import BookActions from './flux/BookActions';

function App() {
  const [books, setBooks] = useState([]);
  const [currentView, setCurrentView] = useState('home');

  // Component Lifecycle: Mount
  useEffect(() => {
    console.log('Component Mounted - Subscribing to store');
    
    // Subscribe to store changes
    const updateBooks = () => {
      console.log('Store changed - Updating component');
      setBooks([...bookStore.getBooks()]);
    };

    // Initial load
    updateBooks();

    // Add listener
    bookStore.addChangeListener(updateBooks);

    // Component Lifecycle: Unmount
    return () => {
      console.log('Component Unmounted - Cleaning up');
      bookStore.removeChangeListener(updateBooks);
    };
  }, []);

  const handleDeleteBook = (id) => {
    console.log('Deleting book with id:', id);
    BookActions.deleteBook(id);
  };

  const handleBookAdded = () => {
    alert('✓ Book added successfully!');
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-xl border-b-4 border-pink-400">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                <BookOpen className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  BookVerse
                </h1>
                <p className="text-xs text-gray-500">Your Digital Library</p>
              </div>
            </div>
            <nav className="flex gap-3">
              <button
                onClick={() => setCurrentView('home')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  currentView === 'home'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              <button
                onClick={() => setCurrentView('add')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  currentView === 'add'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <Plus size={18} />
                <span>Add Book</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* SPA Navigation - No page reloads */}
        {currentView === 'home' && (
          <BookList books={books} onDelete={handleDeleteBook} />
        )}
        
        {currentView === 'add' && (
          <AddBookForm onSuccess={handleBookAdded} />
        )}

        {/* Flux Architecture Info */}
        <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-white/50">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            Architecture Overview
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
              <strong className="text-purple-700">Flux Pattern:</strong> Unidirectional data flow - Actions → Dispatcher → Store → View
            </p>
            <p className="bg-pink-50 p-3 rounded-lg border-l-4 border-pink-600">
              <strong className="text-pink-700">Dependency Injection:</strong> StoreFactory creates modular store instances
            </p>
            <p className="bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
              <strong className="text-red-700">Form Handling:</strong> Formik manages form state, Yup validates inputs
            </p>
            <p className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-600">
              <strong className="text-orange-700">SPA Behavior:</strong> Smooth navigation without page reloads using state-based routing
            </p>
            <p className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-600">
              <strong className="text-indigo-700">Lifecycle:</strong> Components subscribe to store on mount, unsubscribe on unmount
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;