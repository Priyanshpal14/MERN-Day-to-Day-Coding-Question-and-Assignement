import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <h2>Book not found</h2>;
  }

  return (
    <div className="book-details">
      <img src={book.image} alt={book.title} style={{ width: '200px', borderRadius: '8px' }} />
      <h2>{book.title}</h2>
      <h4>by {book.author}</h4>
      <p>Price: ${book.price}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default BookDetails;
