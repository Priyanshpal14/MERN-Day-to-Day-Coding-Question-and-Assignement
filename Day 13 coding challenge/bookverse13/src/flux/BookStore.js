// src/flux/BookStore.js
import dispatcher from './Dispatcher';
import { ActionTypes } from './BookActions';

class BookStore {
  constructor() {
    this.books = [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99 },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 14.99 },
      { id: 3, title: '1984', author: 'George Orwell', price: 13.99 }
    ];
    this.listeners = [];
    
    // Register with dispatcher
    dispatcher.register(this.handleAction.bind(this));
  }

  handleAction(action) {
    switch (action.type) {
      case ActionTypes.ADD_BOOK:
        this.books = [...this.books, { ...action.payload, id: Date.now() }];
        this.emitChange();
        break;
      case ActionTypes.DELETE_BOOK:
        this.books = this.books.filter(book => book.id !== action.payload);
        this.emitChange();
        break;
      case ActionTypes.INIT_BOOKS:
        this.books = action.payload;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  getBooks() {
    return this.books;
  }

  addChangeListener(listener) {
    this.listeners.push(listener);
  }

  removeChangeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  emitChange() {
    this.listeners.forEach(listener => listener());
  }
}

// Dependency Injection Factory
class StoreFactory {
  static createBookStore() {
    return new BookStore();
  }
}

export default StoreFactory.createBookStore();