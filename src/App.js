import BookSearch from "./components/BookSearch";
import "./App.css";
import Bookshelf from "./components/Bookshelf";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
