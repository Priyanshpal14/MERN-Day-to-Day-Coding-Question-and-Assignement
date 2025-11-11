// src/components/BookList.jsx
import React from 'react';
import { BookOpen, User, DollarSign } from 'lucide-react';

function BookList({ books, onDelete }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-white/50">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
          <BookOpen className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex-1">
          Book Collection
        </h2>
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {books.length} {books.length === 1 ? 'Book' : 'Books'}
        </span>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <BookOpen size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-xl font-semibold">No books in collection</p>
          <p className="text-sm mt-2">Add your first book to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {books.map((book, index) => (
            <div
              key={book.id}
              className={`border-2 rounded-xl p-5 hover:shadow-xl transition-all transform hover:scale-102 ${
                index % 4 === 0 ? 'border-purple-300 bg-purple-50/50' :
                index % 4 === 1 ? 'border-pink-300 bg-pink-50/50' :
                index % 4 === 2 ? 'border-red-300 bg-red-50/50' :
                'border-orange-300 bg-orange-50/50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <User size={16} />
                    <span className="font-medium">{book.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                    <DollarSign size={20} />
                    <span>{book.price.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(book.id)}
                  className="text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all transform hover:scale-110 border-2 border-red-300"
                  aria-label="Delete book"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;