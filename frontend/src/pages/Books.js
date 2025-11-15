import React, { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getBooks();
      setBooks(response.data);
    } catch (error) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-book-open me-2"></i>
          Book Collection
        </h2>
        <span className="badge bg-primary fs-6">
          {books.length} {books.length === 1 ? 'Book' : 'Books'}
        </span>
      </div>

      {books.length === 0 ? (
        <div className="text-center mt-5">
          <i className="fas fa-book fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No books available</h4>
          <p className="text-muted">Books will appear here once they are added by an admin.</p>
        </div>
      ) : (
        <div className="row">
          {books.map(book => (
            <div key={book._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    by {book.author}
                  </h6>
                  <p className="card-text">{book.description}</p>
                  
                  <div className="book-details small text-muted">
                    <div className="mb-1">
                      <i className="fas fa-barcode me-2"></i>
                      <strong>ISBN:</strong> {book.isbn}
                    </div>
                    <div className="mb-1">
                      <i className="fas fa-calendar me-2"></i>
                      <strong>Published:</strong> {book.publishedYear}
                    </div>
                    <div className="mb-1">
                      <i className="fas fa-tag me-2"></i>
                      <strong>Genre:</strong> {book.genre}
                    </div>
                    <div>
                      <i className="fas fa-user me-2"></i>
                      <strong>Added by:</strong> {book.addedBy?.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;