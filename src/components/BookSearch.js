import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [apiStatus, setApiStatus] = useState("init");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);

    if (q.length > 2) {
      try {
        setApiStatus("pending");
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${q}&limit=10&page=1`
        );
        setResults(response.data.docs);
        setApiStatus("success");
      } catch (error) {
        console.error("Error fetching data:", error);
        setApiStatus("error");
      }
    } else {
      setResults([]);
    }
  };

  const handleAddToBookshelf = (book) => {
    let bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    bookshelf = [...bookshelf, book];
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  };

  if (apiStatus === "error") return <h3>Somthing wrong...</h3>;

  return (
    <div className="root-container">
      <div className="search-bar">
        <h1>Search by book name</h1>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for books..."
        />
        <button onClick={() => navigate("/bookshelf")}>My Bookshelf</button>
      </div>

      {apiStatus === "pending" && <h3>Loading...</h3>}
      {results.length > 0 && (
        <div className="results">
          {results.map((book) => (
            <div key={book.key} className="book-card">
              <p>
                <b>Book Title:</b> {book.title}
              </p>
              <p>
                <b>Author Name:</b> {book.author_name[0]}
              </p>
              <p>
                <b>Edition Count:</b> {book.edition_count}
              </p>
              <button onClick={() => handleAddToBookshelf(book)}>
                Add to Bookshelf
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
