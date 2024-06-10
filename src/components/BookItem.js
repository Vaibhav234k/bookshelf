// src/BookItem.js
import React from 'react';
import './BookItem.css';

const BookItem = ({ title, editionCount, onAdd, added }) => {
  return (
    <div className="book-item">
      <h2>Book Title: {title}</h2>
      <p>Edition Count: {editionCount}</p>
      {!added && <button className="add-button" onClick={onAdd}>Add to Bookshelf</button>}
      {added && <p>Already in Bookshelf</p>}
    </div>
  );
};

export default BookItem;
