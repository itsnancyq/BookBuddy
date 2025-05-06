/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function Books({token}){
    const [allBooks, setAllBooks] = useState([])
    const [searchBook, setSearchBook] = useState("")

    const navigate = useNavigate()
    const handleClick = (book) => {
        navigate(`/single/${book.id}`)
    }

    useEffect(()=>{
        const getAllBooks = async() =>{
            try{
                const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
                const data = await res.json()
                setAllBooks(data)
            } catch (err) {
                console.error(err)
            }
        }
        getAllBooks();
    }, []);
    
    const filteredBooks = allBooks.filter((book) =>
        book.title.toLowerCase().includes(searchBook.toLowerCase())
    );

    const reserveBook = async(bookId) => {
        try{
            const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
                method: "POST",
                headers: {"Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`},
                body: JSON.stringify({bookId:bookId})
                })
                const data = await res.json()

        } catch (err) {
                console.error(err)
        }
    };


    return(
        <>
        <div className="searchBar">
            <input 
            type="text"
            placeholder="Search book..."
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            className="bookSearch"
            />
        </div>

        <div>
        {
            filteredBooks && (
                filteredBooks.map((book)=>(
                    <div key={book.id} className="bookContainer">
                        <img 
                            src={book.coverimage} 
                            className="bookImg"
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = "/public/emptybooks.png";
                            }}
                        />
                        <div className="bookAbout">
                            <h2>{book.title}</h2>
                            <h3>by {book.author}</h3>
                            <button onClick={()=>handleClick(book)} className="bookDetailButton">Details</button>
                            {token ? 
                                <button onClick={() => reserveBook(book.id)} className="bookDetailButton">Reserve</button>
                                : null
                            } 
                        </div>

                    </div>
                ))
            )
        }

        </div>
        </>
    )
}

export default Books