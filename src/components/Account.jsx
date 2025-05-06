/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useState, useEffect } from "react"

function Account({token}){
    const [userInfo, setUserInfo] = useState({})
    const [seeReserve, setSeeReserve] = useState([])


    useEffect(()=>{
        const getMe = async () => {
            try {

                const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
                    headers:{"Content-Type": "application/json", Authorization:`Bearer ${token}`}
                })
                const result = await response.json()
                // console.log(result)
                setUserInfo(result)
            } catch (err) {
                console.error(err)
            }
        }
        getMe()
    }, [])


    useEffect(()=>{
        const getReserve = async () => {
            try {
                const response = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
                    headers:{"Content-Type": "application/json",
                    Authorization: `Bearer ${token}`}
                })
                const result = await response.json()
                setSeeReserve(result)
            }  catch (err) {
                console.error(err)
            }
        }
        getReserve()
    }, [])


    const returnBook = async (id) => {
        try { 
            const res = await fetch (`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`}
            })
        } catch (err) {
            console.error(err)
        }
    }
   

    return(
        <>
        <div className="accountContainer">
            <h1 className="header">Account</h1>
        {
            userInfo && (
                <div key={userInfo.id}>
                    <h2>ID:</h2>
                    <h3>{userInfo.id}</h3>
                    <h2>Email:</h2>
                    <h3>{userInfo.email}</h3>
                </div>
            )
        }
        </div>

        <div className="checkedOutContainer">
            <h1 className="header">Checked Out</h1>
        {
            seeReserve && (
                seeReserve.map((book)=>(
                    <div key={book.id}>
                    <h2>{book.title}</h2>
                    <h3>by {book.author}</h3>
                    <img src={book.coverimage} className="bookImg"/>
                    <div>
                    <button onClick={()=>returnBook(book.id)} className="bookDetailButton">Return</button>
                    </div>
                </div>
                ))
            )
        }
        </div>


        {
        //     <div>
        // {
        //     seeReserve ? : <h1>no current books</h1>
        // }
        // </div> 

        // trying to say if no books checked out then show message saying no current books

        }
        </>
    )
}

export default Account