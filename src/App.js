// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookItem from './components/BookItem';
import Bookshelf from './components/Bookshelf';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const fetchBooks = async (searchQuery) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`);
      setBooks(response.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const debouncedFetchBooks = useCallback(debounce((searchQuery) => {
    fetchBooks(searchQuery);
  }, 1000), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchBooks(value);
  };

  const addToBookshelf = (book) => {
      const updatedBookshelf = [...bookshelf, book];
      setBookshelf(updatedBookshelf);
      localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  useEffect(() => {
    return () => {
      debouncedFetchBooks.cancel();
    };
  }, [debouncedFetchBooks]);

  return (
    <Router>
      <div className="app">
        <button className='my-bookshelf'>
          <Link to="/bookshelf">My Bookshelf</Link>
        </button>
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <h1>Search by book name:</h1>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  value={query}
                  onChange={handleInputChange}
                />
                <div className="bookshelf">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    books.map((book, index) => (
                      <BookItem
                        key={index}
                        title={book.title}
                        editionCount={book.edition_count || book.edition_count}
                        onAdd={() => addToBookshelf(book)}
                        added={bookshelf.some(b => b.key === book.key)}
                      />
                    ))
                  )}
                </div>
              </div>
            } 
          />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
