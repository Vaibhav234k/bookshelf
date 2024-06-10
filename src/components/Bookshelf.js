import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import './Bookshelf.css';

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="bookshelf-page">
      <div className="bookshelf">
        {bookshelf.length > 0 ? (
          bookshelf.map((book, index) => (
            <BookItem
              key={index}
              title={book.title}
              editionCount={book.edition_count || book.edition_count}
              onAdd={() => {}}
              added={true}
            />
          ))
        ) : (
          <p>No books in your bookshelf.</p>
        )}
      </div>
    </div>
  );
};

export default Bookshelf;
