/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useState, useEffect } from "react"

function Account({token}){
    const [userInfo, setUserInfo] = useState({})

    useEffect(()=>{
        const getMe = async () => {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
                headers:{"Content-Type": "application/json", Authorization:`Bearer ${token}`}
            })
            const result = await response.json()
            // console.log(result)
            setUserInfo(result)
        }
        getMe()
    }, [])



    return(
        <>
        {
            userInfo && (
                <div key={userInfo.id}>
                    <h2>{userInfo.firstname}</h2>
                    <h2>{userInfo.lastname}</h2>
                    <h2>{userInfo.id}</h2>
                    <h2>{userInfo.email}</h2>
                    <h2>{userInfo.reservations}</h2>
                </div>
            )
        }
        </>
    )
}

export default Account