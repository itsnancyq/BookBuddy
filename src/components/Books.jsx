/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Books(){
    const [allBooks, setAllBooks] = useState([])

    const navigate = useNavigate()
    const handleClick = (book) => {
        navigate(`/single/${book.id}`)
    }

    useEffect(()=>{
        const getAllBooks = async() =>{
            const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
            const data = await res.json()
            setAllBooks(data)
            console.log(data)
        }
        getAllBooks();
    }, [])
    

    return(
        <div>
        {
            allBooks && (
                allBooks.map((book)=>(
                    <div key={book.id}>
                        <h2>{book.title}</h2>
                        <img src={book.coverimage} style={{height:'400px'}}/>
                        <button onClick={()=>handleClick(book)}>Details</button>
                    </div>
                ))
            )
        }
        </div>
    )
}

export default Books