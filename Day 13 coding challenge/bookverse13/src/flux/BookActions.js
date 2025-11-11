// src/flux/BookActions.js
import dispatcher from './Dispatcher';

export const ActionTypes = {
  ADD_BOOK: 'ADD_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  INIT_BOOKS: 'INIT_BOOKS'
};

class BookActions {
  static addBook(book) {
    dispatcher.dispatch({
      type: ActionTypes.ADD_BOOK,
      payload: book
    });
  }

  static deleteBook(id) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_BOOK,
      payload: id
    });
  }

  static initBooks(books) {
    dispatcher.dispatch({
      type: ActionTypes.INIT_BOOKS,
      payload: books
    });
  }
}

export default BookActions;