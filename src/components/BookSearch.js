import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BookCard from "./BookCard";
import "./BookSearch.css";

const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [bookshelf, setBookshelf] = useState(
        JSON.parse(localStorage.getItem("bookshelf")) || []
    );

    useEffect(() => {
        if (query) {
            const fetchBooks = async () => {
                try {
                    const result = await axios(
                        `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
                    );
                    setBooks(result.data.docs);
                } catch (error) {
                    console.error("Error fetching books:", error);
                    toast.error(
                        "An error occurred while fetching books. Please try again later."
                    );
                    setBooks([]);
                }
            };
            fetchBooks();
        } else {
            setBooks([]);
        }
    }, [query]);

    const addToBookshelf = (book) => {
        const updatedBookshelf = [...bookshelf, book];
        setBookshelf(updatedBookshelf);
        localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
        toast.success("Book added to bookshelf!");
    };

    return (
        <div className="book-search-container">
            <h2>Search For The Book :</h2>
            <input
                type="text"
                placeholder="Search for a book..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="book-search-input"
            />
            <div className="book-list">
                {books.map((book) => (
                    <BookCard
                        key={book.key}
                        book={book}
                        addToBookshelf={addToBookshelf}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookSearch;
