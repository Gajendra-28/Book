import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Bookshelf.css";

const Bookshelf = () => {
    const [bookshelf, setBookshelf] = useState(
        JSON.parse(localStorage.getItem("bookshelf")) || []
    );

    const removeFromBookshelf = (bookKey) => {
        const updatedBookshelf = bookshelf.filter((book) => book.key !== bookKey);
        setBookshelf(updatedBookshelf);
        localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
        toast.info("Book removed from bookshelf.");
    };

    return (
        <div>
            <h2>My Bookshelf</h2>
            <div className="book-list">
                {bookshelf.map((book) => (
                    <div key={book.key} className="book-card">
                        <h3>{book.title}</h3>
                        <p>{book.author_name?.join(", ")}</p>
                        <button onClick={() => removeFromBookshelf(book.key)}>
                            Remove from Bookshelf
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookshelf;
