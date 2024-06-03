import React, { useState, useEffect } from "react";

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div>
      <div className="top-bar">
        {bookshelf.length > 0 ? (
          <h1>My Bookself</h1>
        ) : (
          <h1>No Book Added...</h1>
        )}
      </div>

      {bookshelf.length > 0 && (
        <div className="results">
          {bookshelf.map((book, index) => (
            <div key={index} className="book-card">
              <p>
                <b>Book Title:</b> {book.title}
              </p>
              <p>
                <b>Author Name:</b> {book.author_name[0]}
              </p>
              <p>
                <b>Edition Count:</b> {book.edition_count}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
