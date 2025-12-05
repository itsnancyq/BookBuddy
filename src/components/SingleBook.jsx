/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function SingleBook(){
    const [loneBook, setLoneBook] = useState([]);

    const { id } = useParams();

    useEffect(()=>{
        const getSingleBook = async() =>{
            try{
            const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
            const data = await res.json();
            setLoneBook(data);

        } catch(err){
            console.error(err);
        }};
        getSingleBook();

    }, [id]);

    

    return(
        <>
        <div>
            <Link to="/" className="backLink">Back</Link>
        </div>

        <div className="singleBookContainer">

            <img
                src={loneBook.coverimage} 
                className="bookImg"
                onError={(e) => {
                    e.target.onError = null;
                    e.target.src = "/emptybooks.png"
                }}
            />
            <div>
                <h1>{loneBook.title}</h1>
                <h2>{loneBook.author}</h2>
                <p className="bookSummary">{loneBook.description}</p>
            </div>
        </div>
        </>
    )
}

export default SingleBook